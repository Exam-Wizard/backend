import type { Resolvers } from "../generated";

export const resolvers: Resolvers = {
  Query: {
    Faculty: () => ({}),
  } as never,
  Mutation: {
    Faculty: () => ({}),
  },
  FacultyQueries: {
    getByID: async (_, { id }, { dataSources }) => {
      return await dataSources.faculty.findOne(id);
    },
    getAll: async (_, __, { dataSources }) => {
      return await dataSources.faculty.findAll();
    },
  },
  FacultyMutations: {
    register: async (_, { data }, { dataSources }) => {
      return await dataSources.faculty.create(data);
    },
    login: async (_, { email, password }, { dataSources }) => {
      return await dataSources.faculty.login(email, password);
    },
  },
  Faculty: {
    __resolveReference: async ({ id }, { dataSources }) => {
      return await dataSources.faculty.findOne(id);
    },
  },
};
