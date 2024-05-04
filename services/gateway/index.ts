import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { decode } from "@shared/jwt";
import { GraphQLError } from "graphql";
import type { IncomingMessage } from "http";

const context = async ({ req }: { req: IncomingMessage }) => {
  try {
    const token = decode(req);
    console.log(token);
    return { token };
  } catch (error) {
    throw new GraphQLError(error as string, {
      extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
    });
  }
};

const gateway = new ApolloGateway({
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http?.headers.set("token", JSON.stringify(context.token));
      },
    });
  },
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "roles",
        url: "http://localhost:4001",
      },
    ],
  }),
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, { context, listen: { port: 4000 } }).then(
  ({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  }
);
