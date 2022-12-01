"use strict";

const auth = require("passport-local-authenticate");
auth.hash("1990", { iterations: 25000 }, function (err, hashed) {
  console.log(hashed);
});
