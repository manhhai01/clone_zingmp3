import http from "../utils/configInterceptor";

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get("/home");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
