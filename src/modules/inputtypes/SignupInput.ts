import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { LoginInput } from './LoginInput';

@InputType()
export class SignupInput extends LoginInput {
  @Field()
  @Length(1, 255, {
    message: 'Firstname should be between 1 and 255 characters',
  })
  public firstName!: string;

  @Field()
  @Length(1, 255, {
    message: 'Lastname should be between 1 and 255 characters',
  })
  public lastName!: string;
}
