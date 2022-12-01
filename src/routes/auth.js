"use strict";

import debug from "../helpers/debug";
import { isDevelopment } from "../helpers/env";
import { parseToken, tokenFromRequest } from "../helpers/jwt";
import { User } from "../models/users/model";

const auth = (app) => {
  // Parse the JWT token and fetch the logged in user & org
  app.use(async (req, res, next) => {
    try {
      const token = tokenFromRequest(req);

      if (token) {
        const payload = parseToken(token);
        req.user = await User.findByPhoneNumber(payload.phoneNumber);
      } else if (isDevelopment() && process.env.MOCK_SESSION_USER) {
        // For using graphiql authenticated with a fake user
        req.user = await User.findByPhoneNumber(process.env.MOCK_SESSION_USER);
      }
    } catch (err) {
      debug.log(err);
    }

    next();
  });

  app.use(async (req, res, next) => {
    next();
  });
};

export default auth;
