import axios from "axios";

// tạo bản sao của axios
const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 12000, // set thời gian chờ
});

// cấu hình cho request
http.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// cấu hình cho response
http.interceptors.response.use(
  (res) => {
    // Tất cả kết quả trả về từ http đều chạy vào hàm này

    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
