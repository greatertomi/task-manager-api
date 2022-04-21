import {buildSchema} from "type-graphql";
import {SignupResolver} from "./modules/user/Signup";
import {UserResolver} from "./modules/UserResolver";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [SignupResolver, UserResolver]
  })
}