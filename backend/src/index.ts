import "reflect-metadata";

import datasource from "./datasource";

import { buildSchema } from "type-graphql";
import { CategoriesResolver } from "./resolvers/CategoriesResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdsResolver } from "./resolvers/AdsResolver";
import { TagsResolver } from "./resolvers/TagsResolver";

// Router uses

async function initialize() {
  await datasource.initialize();
  console.log("Datasource is connected");
  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

initialize();
