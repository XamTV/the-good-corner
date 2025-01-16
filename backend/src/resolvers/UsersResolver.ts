import { Arg, Ctx, ID, Mutation, Query } from "type-graphql";
import { validate } from "class-validator";
import { User, UserCreateInput, UserUpdateInput } from "../entities/User";
import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType, getUserFromContext } from "../auth";

export class UsersResolver {
  // @Query(() => [User])
  // async readUsers(): Promise<User[]> {
  //   const users = await User.find();
  //   return users;
  // }

  // @Query(() => User, { nullable: true })
  // async readUser(@Arg("id", () => ID) id: number): Promise<User | null> {
  //   const user = await User.findOne({
  //     where: { id },
  //   });
  //   return user;
  // }

  @Mutation(() => User)
  async createUser(
    @Arg("data", () => UserCreateInput) data: UserCreateInput
  ): Promise<User> {
    const user = new User();
    const hashedPassword = await argon2.hash(data.hashedPassword);
    const updatedData = { ...data, hashedPassword: hashedPassword };
    Object.assign(user, updatedData, { createdAt: new Date() });

    const error = await validate(data);
    if (error.length) {
      throw new Error(`Validation Error: ${JSON.stringify(error)}`);
    } else {
      await user.save();
      return user;
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput
  ): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
    });
    if (user !== null) {
      // Mettre à jour les autres champs
      const hashedPassword = await argon2.hash(data.hashedPassword);
      const updatedData = { ...data, hashedPassword: hashedPassword };
      Object.assign(user, updatedData);

      const error = await validate(user);
      if (error.length) {
        throw error;
      } else {
        await user.save();
        return user;
      }
    }
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Ctx() context: ContextType,
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput
  ): Promise<User | null> {
    try {
      const user = await User.findOneBy({
        email: data.email,
      });

      if (user) {
        if (await argon2.verify(user.hashedPassword, data.hashedPassword)) {
          // Generate JWT
          const token = sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY as string
          );
          console.log(token);

          try {
            const payload = verify(token, process.env.JWT_SECRET_KEY as string);
            console.log(payload);
          } catch (error) {
            console.log(error);
          }

          const cookie = new Cookies(context.req, context.res);
          cookie.set("token", token, {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 72,
          });

          return user;
        } else {
          // password did not match
          return null;
        }
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  @Mutation(() => Boolean)
  async signout(@Ctx() context: ContextType) {
    const cookie = new Cookies(context.req, context.res);
    cookie.set("token", "", { maxAge: -1 });
    return true;
  }

  @Query(() => User, { nullable: true })
  async whoami(@Ctx() context: ContextType): Promise<User | null> {
    return await getUserFromContext(context);
  }
  @Mutation(() => User)
  async deleteUser(@Arg("id", () => ID) id: number) {
    const user = await User.findOneBy({ id });
    if (user !== null) {
      await user.remove();
      Object.assign(user, { id });
      return user;
    }
  }
}
