import type { IncomingMessage } from "http";
import { Role } from "./models";

export interface IContext {
  dataSource: {
    roleAPI: Role;
  };
  // token: string;
}

export const context = async ({
  req,
}: {
  req: IncomingMessage;
}): Promise<IContext> => {
  // const { token } = JSON.parse(req.headers.token as string);

  const roleAPI = new Role();
  return { dataSource: { roleAPI } };
};
