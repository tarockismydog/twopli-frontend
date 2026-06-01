import axios from "axios";

const api = axios.create({
  // "앞으로 내가 만드는 이 복사본(api)은 무조건 이런 설정을 기본으로 달고 움직여라" 하고 커스텀 인스턴스를 생성해 주는 함수
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // 브라우저의 로컬 스토리지에서 로그인할 때 저장한 토큰을 꺼내옵니다.
    let token = localStorage.getItem("accessToken");

    // 토큰이 존재한다면 헤더에 'Authorization: Bearer 토큰값' 형태로 주입합니다.
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 중에 에러가 발생했을 때 처리
    return Promise.reject(error);
  },
);

export default api;
