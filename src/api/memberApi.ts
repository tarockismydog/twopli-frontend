import axios from "axios";

export const loginPost = async (id: string, pw: string) => {
  const form = new FormData();
  form.append("id", id);
  form.append("password", pw);
  const res = await axios.post(`/api/member/login`, form);

  if (res.data && res.data.accessToken) {
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
  const form = new FormData();
  form.append("id", id);
  form.append("password", pw);
  form.append("nickname", nickname);

  const res = await axios.post(`/api/member/register`, form);

  return res.data;
};
