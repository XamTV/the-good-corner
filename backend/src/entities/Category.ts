import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field({ nullable: true })
  title!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  createdBy!: User;

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
