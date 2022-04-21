interface AppRequest extends Request {
  session: any;
}

export interface MyContext {
  req: AppRequest;
  res: Response;
}
