import * as authApi from "./authentication/api";

const tokenCreateMutation = async (email, password) => {
  const {
    data: {
      data: {
        tokenCreate: { token },
      },
    },
  } = await authApi.tokenCreate({
    email,
    password,
  });

  return token;
};
export { tokenCreateMutation };
