"use strict";

import jwt from "jsonwebtoken";
import parseBearerToken from "parse-bearer-token";

const secret = process.env.SESSION_SECRET;

export const getTokenSecret = () => secret;

export const tokenFromRequest = (req) => parseBearerToken(req);

export const createToken = async (user) => {
  const { id, phoneNumber, name, role } = user;
  return await jwt.sign(
    {
      id,
      name,
      phoneNumber,
      role,
    },
    secret,
    {
      expiresIn: "24 hours",
    }
  );
};

export const parseToken = (token) => jwt.verify(token, secret);
