import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from '../validators/isEmailAlreadyExist';

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist()
  email!: string;

  @Field()
  @Length(4, 200)
  password!: string;

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
