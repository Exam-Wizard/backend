import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";
import { context, type IContext } from "./context";

const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer<IContext>({ schema });

startStandaloneServer(server, { context, listen: { port: 4001 } }).then(
  ({ url }) => {
    console.log(`💂‍♂️ roles service ready at ${url}`);
  }
);
