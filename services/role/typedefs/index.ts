import { readFileSync } from "fs";
import { join } from "path";

import { gql } from "graphql-tag";

const schema = readFileSync(join(__dirname, "schema.graphql"), {
  encoding: "utf-8",
}).toString();

export const typeDefs = gql`
  ${schema}
`;
