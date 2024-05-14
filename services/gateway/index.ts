import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { context } from "./context";

const gateway = new ApolloGateway({
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http?.headers.set("session", JSON.stringify(context));
      },
    });
  },
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "FACULTY_SERVICE",
        url: "http://localhost:4001",
      },
      {
        name: "ROLE_SERVICE",
        url: "http://localhost:4002",
      },
    ],
  }),
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, { context, listen: { port: 4000 } }).then(
  ({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  },
);
