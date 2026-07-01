import axios from "axios";

export const loginPost = async (id: string, pw: string) => {
  const res = await axios.post("/api/member/login", {
    id,
    password: pw,
  });

  if (res.data?.accessToken) {
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("nickname", res.data.nickname);
  }

  return res.data;
};

export const registerPost = async (
  id: string,
  pw: string,
  nickname: string,
) => {
  const res = await axios.post("/api/member/register", {
    id,
    password: pw,
    nickname,
  });

  return res.data;
};
