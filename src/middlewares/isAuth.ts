import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../@types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  // @ts-ignore
  const { authorization } = context.req.headers;

  if (!authorization) {
    throw new Error('Not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, 'Apple');
    console.log('isAuth', payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('Not authenticated');
  }
  return next();
};
