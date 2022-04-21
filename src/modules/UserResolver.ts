import {Query, Resolver} from "type-graphql";
import {User} from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUsers(): Promise<User[]> {
    return User.find()
  }
}
