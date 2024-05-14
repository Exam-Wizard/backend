import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "./resolvers";

const content = readFileSync(join(__dirname, "typedefs.gql"), {
  encoding: "utf-8",
}).toString();

export const typeDefs = gql`
  ${content}
`;
export * from "./context";
export * from "./resolvers";

export const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
