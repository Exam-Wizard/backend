import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  overwrite: true,
  schema: "./graphql/typedefs.gql",
  generates: {
    "generated/index.ts": {
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: "../graphql/context#IContext",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
} satisfies CodegenConfig;
