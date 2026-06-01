import { useNavigate } from "react-router-dom";
import styles from "./MainComponent.module.css";

function MainComponent() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/member/login"); // 로그인 페이지로 이동 (라우팅 경로에 맞춰 수정 가능)
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.polaroidCard}>
        {/* 상단 타이틀 */}
        <h1 className={styles.title}>TWOPLI</h1>

        {/* 중단 메인 이미지 락커 영역 */}
        <div className={styles.imageArea}>
          <img
            src="/images/background.png" // 퍼블릭 폴더 내 이미지 경로에 맞게 매칭해 주세요
            alt="Main Locker"
            className={styles.mainImage}
          />
        </div>

        {/* 하단 스타트 버튼 */}
        <button className={styles.startButton} onClick={handleStart}>
          START!
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
