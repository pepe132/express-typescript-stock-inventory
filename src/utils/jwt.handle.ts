import { sign, verify } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || 'token.3eljwt';

export interface TokenPayload {
  id: number;
  company_id: number;
}

export const generateToken = (id: number, company_id: number) => {
  const jwt = sign({ id, company_id }, jwt_secret, {
    expiresIn: "8h"
  });

  return jwt;
};

export const verifyToken = (jwt: string) => {
  const isJwtOk = verify(jwt, jwt_secret) as TokenPayload;
  return isJwtOk;
};
