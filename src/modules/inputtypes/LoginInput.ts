import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(4, 200)
  password!: string;
}
