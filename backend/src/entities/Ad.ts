import { IsEmail, IsUrl, Min } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

// R step for CRUD
@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  location!: string;

  @Column()
  @IsEmail()
  @Field()
  owner!: string;

  @Column()
  @Min(0, { message: " Le prix ne peut pas etre négatif" })
  @Field(() => Int)
  price!: number;

  @Column()
  @IsUrl()
  @Field()
  picture!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

// C step for CRUD

@InputType()
export class AdCategoryInput {
  @Field(() => ID)
  id!: number;
}
@InputType()
export class AdTagInput {
  @Field(() => ID)
  id!: number;
}

@InputType()
export class AdCreateInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  location!: string;

  @IsEmail()
  @Field()
  owner!: string;

  @Min(0, { message: " Le prix ne peut pas etre négatif" })
  @Field(() => Int)
  price!: number;

  @IsUrl()
  @Field()
  picture!: string;

  @Field(() => AdCategoryInput)
  category!: AdCategoryInput;

  @Field(() => [AdTagInput])
  tags!: AdTagInput[];
}

// U step for CRUD
@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  location!: string;

  @IsEmail()
  @Field({ nullable: true })
  owner!: string;

  @Min(0, { message: " Le prix ne peut pas etre négatif" })
  @Field(() => Int, { nullable: true })
  price!: number;

  @IsUrl()
  @Field({ nullable: true })
  picture!: string;

  @Field(() => AdCategoryInput, { nullable: true })
  category!: AdCategoryInput;

  @Field(() => [AdTagInput], { nullable: true })
  tags!: [AdTagInput];
}
// D step for CRUD
