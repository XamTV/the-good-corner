import { Arg, ID, Mutation, Query } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { Like } from "typeorm";
import { validate } from "class-validator";

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
      relations: { category: true, tags: true },
    });
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const ad = new Ad();
    Object.assign(ad, data, { createdAt: new Date() });

    const error = await validate(ad);
    if (error.length) {
      throw new Error(`Validation Error: ${JSON.stringify(error)}`);
    } else {
      await ad.save();
      return ad;
    }
  }

  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      Object.assign(ad, data);

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

  @Mutation(() => Ad)
  async deleteAd(@Arg("id", () => ID) id: number) {
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      await ad.remove();
      Object.assign(ad, { id });
      return ad;
    }
  }
}
