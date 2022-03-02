import {Field, ID, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', {unique: true})
  email: string;

  @Column()
  password: string

  @Field()
  @Column('bool', {default: false})
  confirmed: boolean

  @Field()
  @Column({default: 'user'})
  userRole: string
}