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
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
};

export type FacultyMutations = {
  __typename?: 'FacultyMutations';
  login?: Maybe<Session>;
  register?: Maybe<Session>;
};


export type FacultyMutationsLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type FacultyMutationsRegisterArgs = {
  data: NewFaculty;
};

export type FacultyQueries = {
  __typename?: 'FacultyQueries';
  getAll: Array<Faculty>;
  getByID?: Maybe<Faculty>;
};


export type FacultyQueriesGetByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Faculty: FacultyMutations;
};

export type NewFaculty = {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  Faculty: FacultyQueries;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['ID']['output'];
};

export type Session = {
  __typename?: 'Session';
  token: Scalars['String']['output'];
  user: Faculty;
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
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  FacultyMutations: ResolverTypeWrapper<FacultyMutations>;
  FacultyQueries: ResolverTypeWrapper<FacultyQueries>;
  Mutation: ResolverTypeWrapper<{}>;
  NewFaculty: NewFaculty;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  Session: ResolverTypeWrapper<Session>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Faculty: Faculty;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  FacultyMutations: FacultyMutations;
  FacultyQueries: FacultyQueries;
  Mutation: {};
  NewFaculty: NewFaculty;
  Query: {};
  Role: Role;
  Session: Session;
  Boolean: Scalars['Boolean']['output'];
}>;

export type FacultyResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Faculty']>, { __typename: 'Faculty' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FacultyMutationsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FacultyMutations'] = ResolversParentTypes['FacultyMutations']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<FacultyMutationsLoginArgs, 'email' | 'password'>>;
  register?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<FacultyMutationsRegisterArgs, 'data'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FacultyQueriesResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FacultyQueries'] = ResolversParentTypes['FacultyQueries']> = ResolversObject<{
  getAll?: Resolver<Array<ResolversTypes['Faculty']>, ParentType, ContextType>;
  getByID?: Resolver<Maybe<ResolversTypes['Faculty']>, ParentType, ContextType, RequireFields<FacultyQueriesGetByIdArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  Faculty?: Resolver<ResolversTypes['FacultyMutations'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Faculty?: Resolver<ResolversTypes['FacultyQueries'], ParentType, ContextType>;
}>;

export type RoleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Role']>, { __typename: 'Role' } & GraphQLRecursivePick<ParentType, {"name":true}>, ContextType>;
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Faculty'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContext> = ResolversObject<{
  Faculty?: FacultyResolvers<ContextType>;
  FacultyMutations?: FacultyMutationsResolvers<ContextType>;
  FacultyQueries?: FacultyQueriesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
}>;

