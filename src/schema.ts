import { buildSchema } from "type-graphql";
import { TestResolver } from "./modules/user/Signup";
import { UserResolver } from "./modules/resolvers/UserResolver";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [UserResolver, TestResolver],
  });
};
