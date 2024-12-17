import { Arg, ID, Mutation, Query } from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";

export class TagsResolver {
  @Query(() => [Tag])
  async readTags(): Promise<Tag[]> {
    const tags = await Tag.find();
    return tags;
  }

  @Query(() => Tag, { nullable: true })
  async readTag(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id },
      relations: { ads: true },
    });
    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Arg("data", () => TagCreateInput) data: TagCreateInput) {
    const tag = new Tag();
    Object.assign(tag, data);
    await tag.save();
    return tag;
  }

  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => TagUpdateInput) data: TagUpdateInput
  ): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ id });
    if (tag !== null) {
      Object.assign(tag, data);
      await tag.save();
      return tag;
    }
    return null;
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id", () => ID) id: number) {
    const tag = await Tag.findOneBy({ id });
    if (tag !== null) {
      await tag.remove();
      Object.assign(tag, { id });
      return tag;
    }
  }
}
