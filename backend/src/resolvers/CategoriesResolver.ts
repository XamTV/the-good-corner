import { Arg, Authorized, Ctx, ID, Mutation, Query } from "type-graphql";
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from "../entities/Category";
import { In } from "typeorm";
import { AuthContextType } from "../auth";

export class CategoriesResolver {
  @Query(() => [Category])
  async readCategories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories;
  }

  @Query(() => Category, { nullable: true })
  async readCategory(
    @Arg("id", () => ID) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });
    return category;
  }

  @Authorized()
  @Mutation(() => Category)
  async createCategory(
    @Ctx() context: AuthContextType,
    @Arg("data", () => CategoryCreateInput) data: CategoryCreateInput
  ) {
    const category = new Category();
    Object.assign(category, data, {
      createdAt: new Date(),
      createdBy: context.user,
    });
    await category.save();
    return category;
  }
  @Authorized()
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Ctx() context: AuthContextType,
    @Arg("id", () => ID) id: number,
    @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput
  ): Promise<Category | null> {
    const category = await Category.findOneBy({
      id,
      createdBy: { id: context.user.id },
    });
    if (category !== null) {
      Object.assign(category, data);
      await category.save();
      return category;
    }
    return null;
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id", () => ID) id: number) {
    const category = await Category.findOneBy({ id });
    if (category !== null) {
      category.remove();
      return category;
    }
  }

  @Mutation(() => [Category])
  async deleteCategories(@Arg("id", () => [ID]) ids: number[]) {
    const categories = await Category.findBy({ id: In(ids) });
    console.log(categories);
    if (categories.length > 0) {
      await Category.remove(categories);
      Object.assign(categories, { id: In(ids) });
      return categories;
    }
  }
}
