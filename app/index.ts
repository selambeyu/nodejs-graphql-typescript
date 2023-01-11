import { ApolloServer } from "apollo-server-express";
import Schema from "./Schema";
import Resolver from "./Resolver";
import express from "express";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import { resolve } from "path";

async function startApolloServer(schema: any, resolver: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 9000 }, resolve)
  );
  console.log(`Server ready at http://localhost:9000${server.graphqlPath}`);
}

startApolloServer(Schema, Resolver);
