import type { IncomingMessage } from "http";
import { db } from "@package/db";
import { getDataSource, type DataSources } from "@package/store";

type User = {
  id: string;
  email: string;
  permissions: string[];
};

export interface IContext {
  dataSources: DataSources;
  user: User | null;
}

type ContextFn = ({ req }: { req: IncomingMessage }) => Promise<IContext>;

export const context: ContextFn = async ({ req }) => {
  let user: User | null = null;
  if (req.headers.session) {
    const session = JSON.parse(req.headers.session as string) as { user: User };
    user = session.user;
  }

  const dataSources = getDataSource(db);
  return { dataSources, user };
};
