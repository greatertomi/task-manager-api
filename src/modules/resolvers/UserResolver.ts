import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { LoginResponse } from '../../@types/AuthType';
import { User } from '../../entities/User';
import { LoginInput } from '../inputtypes/LoginInput';
import { SignupInput } from '../inputtypes/SignupInput';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async signUp(
    @Arg('data') { firstName, lastName, password, email }: SignupInput
  ): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12);
    return User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    }).save();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') { email, password }: LoginInput
  ): Promise<typeof LoginResponse> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { code: 404, message: 'This user does not exist' };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { code: 400, message: 'This password is incorrect' };
      }

      const payload = { userId: user.id };

      const token = jwt.sign(payload, 'Apple', { expiresIn: '10h' });

      // ctx.req.session.userId = user.id;
      // console.log('token', token);

      return { token, user };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Server Error' };
    }
  }
}
