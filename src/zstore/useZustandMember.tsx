import { create } from "zustand";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

export interface MemberInfo {
  id: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  roleNames: string[];
}
const initState: MemberInfo = {
  id: "",
  nickname: "",
  accessToken: "",
  refreshToken: "",
  roleNames: [],
};

export interface MemberStore {
  member: MemberInfo;
  status: "" | "pending" | "fulfilled" | "error";
  login: (id: string, pw: string) => void;
  logout: () => void;
  save: (memberInfo: MemberInfo) => void;
}

const useZustandMember = create<MemberStore>((set) => {
  return {
    member: initState,
    status: "",
    login: async (id: string, pw: string) => {
      set({ status: "pending" });

      try {
        const data = await loginPost(id, pw); // <- 비동기 호출
        console.log("save new data", data);

        set({ member: { ...data }, status: "fulfilled" });

        const newState = { ...data, status: "fulfilled" };

        setCookie("member", JSON.stringify(newState), 1); //1일
      } catch (error) {
        console.error("Login failed", error);
        set({ status: "error" });
      }
    },
    logout: () => {
      set({ member: initState, status: "" });

      removeCookie("member");
    },
    save: (memberInfo: MemberInfo) => {
      set({ member: memberInfo, status: "fulfilled" });
    },
  };
});

export default useZustandMember;
