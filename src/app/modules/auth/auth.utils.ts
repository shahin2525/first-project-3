import jwt, { JwtPayload } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expireIn: string,
) => {
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    secret,
    { expiresIn: expireIn },
  );
  return accessToken;
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
