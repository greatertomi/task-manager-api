import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import createSchema from "./schema";
import { Container } from "typeorm-typedi-extensions";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

useContainer(Container);

const main = async () => {
  try {
    await createConnection();
    const schema = await createSchema(Container);

    const server = new ApolloServer({
      schema,
      context: async ({ req, res }: any) => ({ req, res }),
      debug: true,
      playground: true,
    });

    await server.start();

    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );

    server.applyMiddleware({ app });

    app.listen(5500, () => {
      console.log(`Server ready at http://localhost:5500${server.graphqlPath}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
