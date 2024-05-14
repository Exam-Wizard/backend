import { decode } from "@package/auth";
import type { IncomingMessage } from "http";

export const context = async ({ req }: { req: IncomingMessage }) => {
  try {
    const { token, user } = decode(req);
    return { token, user };
  } catch (_) {
    return {
      token: null,
      user: null,
    };
  }
};
