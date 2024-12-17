import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field({ nullable: true })
  title!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad], { nullable: true })
  ads!: Ad[];
}

@InputType()
export class CategoryCreateInput {
  @Field()
  title!: string;
}

@InputType()
export class CategoryUpdateInput {
  @Field({ nullable: true })
  title!: string;
}
