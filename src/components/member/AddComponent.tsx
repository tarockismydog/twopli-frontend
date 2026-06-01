import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddComponent.module.css";
import { invitePost } from "../../api/friendsApi";
// import { inviteFriendPost } from "../../api/friendApi"; // 백엔드 API 연결 시 주석 해제

function AddComponent() {
  const [fId, setfId] = useState<string>("");
  const [message, setMessage] = useState<string>(""); // 메시지 상태 추가 ⭐
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInvite = async () => {
    if (!fId.trim()) {
      setIsError(true);
      setStatusMessage("친구 ID를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      // 백엔드 API 규격에 맞춰 ID와 message를 함께 전송 (이따 아래에서 api 함수도 보완해 드릴게요!)
      await invitePost(fId.trim(), message.trim());

      setIsError(false);
      setStatusMessage("친구가 요청을 수락하면 알림으로 알려드릴게요.");
      setfId("");
      setMessage(""); // 성공 시 메시지 창도 초기화
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || "요청 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfId(e.target.value);
    setStatusMessage("");
    setIsError(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setStatusMessage("");
    setIsError(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.homeBtn} onClick={() => navigate("/list")}>
        <img src="/images/home.png" alt="home" />
      </div>
      <div className={styles.polaroidCard}>
        <h2 className={styles.title}>
          INVITE<span className={styles.dot}>.</span>
        </h2>

        {/* 안내 문구 영역 */}
        <p className={styles.description}>친구와 함께 TWOPLI를 즐겨보세요</p>

        <div className={styles.inputArea}>
          {/* 1. FRIEND ID 입력창 */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>FRIEND ID</label>
            <input
              name="fId"
              value={fId}
              type="text"
              className={styles.blackInput}
              placeholder="ENTER FRIEND ID"
              onChange={handleIdChange}
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>MESSAGE</label>
            <input
              name="message"
              value={message}
              type="text"
              className={styles.blackInput}
              placeholder="ENTER MESSAGE"
              onChange={handleMessageChange}
              disabled={isLoading}
            />
          </div>

          {statusMessage && (
            <p
              className={isError ? styles.errorMessage : styles.successMessage}
            >
              {statusMessage}
            </p>
          )}
        </div>

        <button
          className={styles.inviteButton}
          onClick={handleInvite}
          disabled={isLoading}
        >
          {isLoading ? "SENDING..." : "SEND INVITATION"}
        </button>

        <div className={styles.divider}>OR</div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/list")}
        >
          BACK TO LIST
        </button>

        <div className={styles.brandLogo}>TWOPLI</div>
      </div>
    </div>
  );
}

export default AddComponent;
