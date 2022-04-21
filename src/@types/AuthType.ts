import { createUnionType, Field, ObjectType } from 'type-graphql';
import { User } from '../entities/User';

@ObjectType()
export class LoginSuccess {
  @Field()
  token: string;

  @Field()
  user: User;
}

@ObjectType()
export class LoginError {
  @Field()
  code: number;

  @Field()
  message: string;
}

export const LoginResponse = createUnionType({
  name: 'LoginResponse',
  types: () => [LoginSuccess, LoginError] as const,
  resolveType: (value) => {
    if ('token' in value) {
      return LoginSuccess; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('code' in value) {
      return LoginError; // or the schema name of the type as a string
    }
    return undefined;
  },
});
