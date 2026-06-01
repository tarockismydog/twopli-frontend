import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterComponent.module.css";
import { registerPost } from "../../api/memberApi";

function RegisterComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async () => {
    const { id, password, nickname } = formData;

    if (!id || !password || !nickname) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await registerPost(id, password, nickname);
      alert("회원가입이 완료되었습니다!");
      navigate("/member/login");
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.polaroidCard}>
        <h2 className={styles.title}>
          JOIN<span className={styles.dot}>.</span>
        </h2>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>ID</label>
            <input
              name="id"
              type="text"
              className={styles.blackInput}
              placeholder="ENTER YOUR ID"
              value={formData.id}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>PASSWORD</label>
            <input
              name="password"
              type="password"
              className={styles.blackInput}
              placeholder="ENTER YOUR PASSWORD"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>NICKNAME</label>
            <input
              name="nickname"
              type="text"
              className={styles.blackInput}
              placeholder="ENTER YOUR NICKNAME"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <button className={styles.registerButton} onClick={handleRegister}>
          SIGN UP
        </button>

        <button className={styles.backButton} onClick={() => navigate(-1)}>
          BACK TO LOGIN
        </button>

        <div className={styles.brandLogo}>TWOPLI</div>
      </div>
    </div>
  );
}

export default RegisterComponent;
