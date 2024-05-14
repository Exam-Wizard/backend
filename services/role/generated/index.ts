import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../graphql/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: any; output: any; }
};

export type Faculty = {
  __typename?: 'Faculty';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Role?: Maybe<RoleMutations>;
};

export type NewRole = {
  isUnique: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type Permissions = {
  __typename?: 'Permissions';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  Role: RoleQueries;
};

export type Role = {
  __typename?: 'Role';
  assignees: Array<Faculty>;
  isUnique: Scalars['Boolean']['output'];
  name: Scalars['ID']['output'];
  permissions: Array<Permissions>;
};

export type RoleMutations = {
  __typename?: 'RoleMutations';
  assign?: Maybe<Faculty>;
  create?: Maybe<Role>;
  unassign?: Maybe<Faculty>;
};


export type RoleMutationsAssignArgs = {
  faculty: Scalars['ID']['input'];
  role: Scalars['ID']['input'];
};


export type RoleMutationsCreateArgs = {
  data: NewRole;
};


export type RoleMutationsUnassignArgs = {
  faculty: Scalars['ID']['input'];
  role: Scalars['ID']['input'];
};

export type RoleQueries = {
  __typename?: 'RoleQueries';
  getAll: Array<Role>;
  getByName?: Maybe<Role>;
};


export type RoleQueriesGetByNameArgs = {
  name: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Faculty: ResolverTypeWrapper<Faculty>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewRole: NewRole;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Permissions: ResolverTypeWrapper<Permissions>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleMutations: ResolverTypeWrapper<RoleMutations>;
  RoleQueries: ResolverTypeWrapper<RoleQueries>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Faculty: Faculty;
  ID: Scalars['ID']['output'];
  Mutation: {};
  NewRole: NewRole;
  Boolean: Scalars['Boolean']['output'];
  String: Scalars['String']['output'];
  Permissions: Permissions;
  Query: {};
  Role: Role;
  RoleMutations: RoleMutations;
  RoleQueries: RoleQueries;
}>;

export type FacultyResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Faculty']>, { __typename: 'Faculty' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  Role?: Resolver<Maybe<ResolversTypes['RoleMutations']>, ParentType, ContextType>;
}>;

export type PermissionsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Permissions'] = ResolversParentTypes['Permissions']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Permissions']>, { __typename: 'Permissions' } & GraphQLRecursivePick<ParentType, {"name":true}>, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Role?: Resolver<ResolversTypes['RoleQueries'], ParentType, ContextType>;
}>;

export type RoleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Role']>, { __typename: 'Role' } & GraphQLRecursivePick<ParentType, {"name":true}>, ContextType>;
  assignees?: Resolver<Array<ResolversTypes['Faculty']>, ParentType, ContextType>;
  isUnique?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permissions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleMutationsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RoleMutations'] = ResolversParentTypes['RoleMutations']> = ResolversObject<{
  assign?: Resolver<Maybe<ResolversTypes['Faculty']>, ParentType, ContextType, RequireFields<RoleMutationsAssignArgs, 'faculty' | 'role'>>;
  create?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<RoleMutationsCreateArgs, 'data'>>;
  unassign?: Resolver<Maybe<ResolversTypes['Faculty']>, ParentType, ContextType, RequireFields<RoleMutationsUnassignArgs, 'faculty' | 'role'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleQueriesResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RoleQueries'] = ResolversParentTypes['RoleQueries']> = ResolversObject<{
  getAll?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  getByName?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<RoleQueriesGetByNameArgs, 'name'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContext> = ResolversObject<{
  Faculty?: FacultyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Permissions?: PermissionsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RoleMutations?: RoleMutationsResolvers<ContextType>;
  RoleQueries?: RoleQueriesResolvers<ContextType>;
}>;

