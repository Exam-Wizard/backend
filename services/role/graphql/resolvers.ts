import type { Resolvers } from "../generated";

export const resolvers: Resolvers = {
  Query: {
    Role: () => ({}),
  } as never,
  Mutation: {
    Role: () => ({}),
  },
  RoleQueries: {
    getByName: async (_, { name }, { dataSources }) => {
      return await dataSources.role.findOne(name);
    },
    getAll: async (_, __, { dataSources }) => {
      return await dataSources.role.findAll();
    },
  },
  RoleMutations: {
    create: async (_, { data }, { dataSources, user }) => {
      return await dataSources.role.create(data);
    },
    assign: async (_, data, { dataSources }) => {
      const id = await dataSources.role.assign(data);
      if (!id) return null;

      return await dataSources.faculty.findOne(id);
    },
    unassign: async (_, data, { dataSources }) => {
      const id = await dataSources.role.unassign(data);
      if (!id) return null;

      return await dataSources.faculty.findOne(id);
    },
  },
  Role: {
    __resolveReference: async ({ name }, { dataSources }) => {
      return await dataSources.role.findOne(name);
    },
  },
};
