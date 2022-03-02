import {buildSchema} from "type-graphql";
import {SignupResolver} from "./modules/user/Signup";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [SignupResolver]
  })
}