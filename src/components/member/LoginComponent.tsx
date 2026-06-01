import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginComponent.module.css";
import { loginPost } from "../../api/memberApi";

function LoginComponent() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { id, password } = formData;

    if (!id || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await loginPost(id, password);
      navigate("/myMusic");
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.polaroidCard}>
        <h2 className={styles.title}>
          LOGIN<span className={styles.dot}>.</span>
        </h2>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>ID</label>
            <input
              name="id"
              value={formData.id}
              type="text"
              className={styles.blackInput}
              placeholder="ENTER YOUR ID"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>PASSWORD</label>
            <input
              name="password"
              value={formData.password}
              type="password"
              className={styles.blackInput}
              placeholder="ENTER YOUR PASSWORD"
              onChange={handleChange}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          SIGN IN
        </button>

        <div className={styles.divider}>OR</div>

        <button
          type="button"
          className={styles.signupButton}
          onClick={() => navigate("/member/register")}
        >
          CREATE ACCOUNT
        </button>

        <div className={styles.brandLogo}>TWOPLI</div>
      </div>
    </div>
  );
}

export default LoginComponent;
