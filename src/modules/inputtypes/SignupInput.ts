import { Field, InputType } from "type-graphql";

@InputType()
export class SignupInput {
  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
