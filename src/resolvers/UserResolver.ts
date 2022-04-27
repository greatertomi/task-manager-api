import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { LoginResponse, LoginSuccess } from '../@types/AuthType';
import { MyContext } from '../@types/MyContext';
import { JWT_KEY } from '../config';
import { User } from '../entities/User';
import { isAuth } from '../middlewares/isAuth';
import { LoginInput } from '../modules/inputtypes/LoginInput';
import { SignupInput } from '../modules/inputtypes/SignupInput';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => LoginSuccess)
  async signUp(
    @Arg('data') { firstName, lastName, password, email }: SignupInput
  ): Promise<LoginSuccess> {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    }).save();

    console.log('fetched', user);
    const payload = { userId: user.id };

    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '10h' });

    return { token, user };
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

      const token = jwt.sign(payload, JWT_KEY, { expiresIn: '10h' });

      return { token, user };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Server Error' };
    }
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async getUser(@Arg('id') id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    return User.findOne(payload?.userId);
  }
}
