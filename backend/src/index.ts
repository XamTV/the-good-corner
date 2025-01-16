import "reflect-metadata";

import datasource from "./datasource";

import { buildSchema } from "type-graphql";
import { CategoriesResolver } from "./resolvers/CategoriesResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdsResolver } from "./resolvers/AdsResolver";
import { TagsResolver } from "./resolvers/TagsResolver";
import { UsersResolver } from "./resolvers/UsersResolver";
import { authChecker } from "./auth";

// Router uses

async function initialize() {
  await datasource.initialize();
  console.log("Datasource is connected");
  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver, UsersResolver],
    authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

initialize();
