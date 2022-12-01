const { pipe, invertObj, mapObjIndexed } = require("ramda");

export const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");

export const toCursorHash = (string) => Buffer.from(string).toString("base64");

export const convertToKeyValue = (arr = []) => {
  let keyValue = {};
  console.log(arr);

  arr.forEach((x) => {
    Object.assign(keyValue, {
      [x.name.toUpperCase().replace(/\s+/g, "_")]: x.name,
    });
  });
  return keyValue;
};

export const toGraphQLEnum = (ENUM) => {
  return pipe(
    invertObj,
    mapObjIndexed((val, key) => ({ value: key }))
  )(ENUM);
};

export const getAppURL = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.LOCAL_APP_URL
    : process.env.PROD_APP_URL;
};
