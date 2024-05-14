import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";

import { schema, context, type IContext } from "./graphql";

const server = new ApolloServer<IContext>({
  schema,
  plugins: [ApolloServerPluginInlineTrace()],
});

startStandaloneServer(server, { context, listen: { port: 4001 } }).then(
  ({ url }) => {
    console.log(`🧑 user service ready at ${url}`);
  },
);
