import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { SignupInput } from "../inputtypes/SignupInput";
import bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data") { firstName, lastName, password, email }: SignupInput
  ): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12);
    return User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    }).save();
  }
}
