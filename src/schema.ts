import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/resolvers/UserResolver';
import { TestResolver } from './modules/user/Signup';

export default (Container: any) =>
  buildSchema({
    container: Container,
    resolvers: [UserResolver, TestResolver],
  });
