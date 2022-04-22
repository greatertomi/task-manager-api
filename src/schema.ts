import { buildSchema } from 'type-graphql';
import { TestResolver } from './modules/user/Signup';
import { UserResolver } from './resolvers/UserResolver';

export default (Container: any) =>
  buildSchema({
    container: Container,
    resolvers: [UserResolver, TestResolver],
  });
