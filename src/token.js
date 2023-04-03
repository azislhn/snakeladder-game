import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";

const secretKey = SECRET_KEY;

export function jsonWebToken(payload) {
  const token = jwt.sign({ payload: payload }, secretKey, {
    algorithm: "HS256",
  });
  return token;
}

// export function decodeToken(token) {
//   const decoded = jwt.verify(token, secretKey)
//   return decoded;
// }