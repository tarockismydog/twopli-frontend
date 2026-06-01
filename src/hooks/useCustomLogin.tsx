import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { getCookie } from "../util/cookieUtil";
import useZustandMember from "../zstore/useZustandMember";

const useCustomLogin = () => {
  const { member, status, login, logout, save } = useZustandMember();

  const loginState = member;

  const loginStatus = status;

  useEffect(() => {
    if (!loginStatus) {
      const cookieData = getCookie("member");

      if (cookieData) {
        save(cookieData);
      }
    }
  });

  const navigate = useNavigate();

  const doLogin = async (email: string, pw: string) => {
    login(email, pw);
  };

  const doLogout = () => {
    logout();
  };

  const moveToLogin = () => {
    navigate("/member/login");
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login" />;
  };

  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true });
  };

  return {
    loginState,
    loginStatus,
    doLogin,
    navigate,
    doLogout,
    moveToLogin,
    moveToLoginReturn,
    moveToPath,
  };
};

export default useCustomLogin;
