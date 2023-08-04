import { jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
  username: string;
  isSalon: boolean;
  email: string;
}

export function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecret())
    );
    return verified.payload as unknown as UserJwtPayload;
  } catch (e) {
    throw new Error("Invalid token");
  }
};
