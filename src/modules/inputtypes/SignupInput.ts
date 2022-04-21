import { Field, InputType } from 'type-graphql';
import { LoginInput } from './LoginInput';

@InputType()
export class SignupInput extends LoginInput {
  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;
}
