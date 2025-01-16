import { Arg, Authorized, Ctx, ID, Mutation, Query } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { In, Like } from "typeorm";
import { validate } from "class-validator";
import { Tag } from "../entities/Tag";
import { AuthContextType } from "../auth";

export class AdsResolver {
  @Query(() => [Ad])
  async readAds(
    @Arg("category", { nullable: true }) category?: string
  ): Promise<Ad[]> {
    if (category) {
      const ads = await Ad.find({
        where: { category: { title: Like(`%${category}%`) } },
        relations: { category: true },
      });
      return ads;
    } else {
      const ads = await Ad.find();
      return ads;
    }
  }

  @Query(() => Ad, { nullable: true })
  async readAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: AuthContextType,
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const ad = new Ad();
    Object.assign(ad, data, {
      createdAt: new Date(),
      createdBy: context.user,
    });

    const error = await validate(ad);
    if (error.length) {
      throw new Error(`Validation Error: ${JSON.stringify(error)}`);
    } else {
      await ad.save();
      return ad;
    }
  }
  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Ctx() context: AuthContextType,
    @Arg("id", () => ID) id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id, createdBy: { id: context.user.id } },
      relations: { tags: true, createdBy: true },
    });
    if (ad !== null) {
      // Mettre à jour les autres champs
      Object.assign(ad, data);
      if (data.tags) {
        // Gestion des tags
        const tagRepository = Tag.getRepository();

        // Synchroniser les tags
        const newTags = await tagRepository.findBy({
          id: In(data.tags.map((tag) => tag.id)),
        });
        ad.tags = newTags; // Remplace directement par les nouveaux tags
        const existingTagIds = ad.tags.map((tag) => tag.id);
        const newTagIds = data.tags.map((tag) => tag.id);

        ad.tags = ad.tags.filter((tag) => newTagIds.includes(tag.id));

        const tagsToAdd = data.tags.filter(
          (tag) => !existingTagIds.includes(tag.id)
        );
        const tagsToAddEntities = await Tag.findBy({
          id: In(tagsToAdd.map((tag) => tag.id)),
        });
        ad.tags.push(...tagsToAddEntities);
      }

      const error = await validate(ad);
      if (error.length) {
        throw error;
      } else {
        await ad.save();
        return ad;
      }
    }
    return null;
  }

  @Authorized()
  @Mutation(() => Ad)
  async deleteAd(
    @Ctx() context: AuthContextType,
    @Arg("id", () => ID) id: number
  ) {
    const ad = await Ad.findOneBy({ id, createdBy: { id: context.user.id } });
    if (ad !== null) {
      await ad.remove();
      Object.assign(ad, { id });
      return ad;
    }
  }
}
