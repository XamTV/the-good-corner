import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsEmail, IsStrongPassword } from "class-validator";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column()
  @Field()
  hashedPassword!: string;
}

@InputType()
export class UserCreateInput {
  @IsEmail()
  @Field()
  email!: string;

  @Field()
  @IsStrongPassword()
  hashedPassword!: string;
}

// U step for CRUD

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  hashedPassword!: string;
}
