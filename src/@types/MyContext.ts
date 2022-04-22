export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
