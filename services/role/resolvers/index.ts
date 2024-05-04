import { Resolvers } from "../generated";

export const resolvers: Resolvers = {
  Query: {
    role: (_, { name }, { dataSource }) => dataSource.roleAPI.findOne(name),
    roles: (_, __, { dataSource }) => dataSource.roleAPI.findAll(),
  },
  Role: {
    __resolveReference: ({ name }, { dataSource }) =>
      dataSource.roleAPI.findOne(name),
  },
};
