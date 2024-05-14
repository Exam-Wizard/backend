import jwt from "jsonwebtoken";
import type { IncomingMessage } from "http";

export const decode = <TUser>(req: IncomingMessage) => {
  if (!req.headers.authorization)
    throw new Error("Missing authorization header");

  const auth = req.headers.authorization.split(" ");
  if (auth.length !== 2) throw new Error("Invalid token format");

  const [scheme, token] = auth;
  if (scheme !== "Bearer")
    throw new Error("Wrong scheme, please prefix the token with 'Bearer'");
  else if (!token) throw new Error("Missing token");

  // TODO: use JWT to decode the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as TUser;
    return { token, user };
  } catch (error) {
    console.log(error);
    return { token: null, user: null };
  }
};

export const encode = (payload: Record<string, any>) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
