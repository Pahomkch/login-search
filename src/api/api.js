import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://emphasoft-test-assignment.herokuapp.com/",
});

export const tokenAPI = {
  async getApiToken(userName, password) {
    try {
      const data = await instance.post("api-token-auth/", {
        username: userName,
        password: password,
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export const usersAPI = {
  async getUsers(apiKey) {
    try {
      const data = await instance.get("api/v1/users/", {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  },
};
