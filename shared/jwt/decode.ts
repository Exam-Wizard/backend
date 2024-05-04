import type { IncomingMessage } from "http";

export const decode = (req: IncomingMessage) => {
  const auth = req.headers.authorization?.split(" ");
  if (auth?.length !== 2) throw new Error("Invalid token format");

  const [scheme, token] = auth;
  if (scheme !== "Bearer")
    throw new Error("Wrong scheme, please prefix the token with 'Bearer'");
  else if (!token) throw new Error("Missing token");

  // TODO: use JWT to decode the token
  return { token };
};
