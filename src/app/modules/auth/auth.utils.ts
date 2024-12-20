import jwt from 'jsonwebtoken';
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
