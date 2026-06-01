import { useNavigate } from "react-router-dom";
import { useTrackStore } from "../store/useTrackStore";
import styles from "./ListComponent.module.css";

function ListComponent() {
  const navigate = useNavigate();
  const { currentTrack } = useTrackStore();

  const nickname = localStorage.getItem("nickname");

  return (
    <div className={styles.pageContainer}>
      {/* 플러스 버튼 - 왼쪽 상단 */}
      <div className={styles.plusBtn} onClick={() => navigate("/add")}>
        <img src="/images/plus.png" alt="add" />
      </div>
      <div
        className={styles.invitationBtn}
        onClick={() => navigate("/invitation")}
      >
        <img src="/images/invitation.png" alt="invitation" />
      </div>

      <div className={styles.polaroidFrame}>
        <div className={styles.innerContent}>
          {/* 말풍선 영역 */}
          <div className={styles.thoughtBalloon}>
            <img
              src="/images/thought_balloon.png"
              alt="balloon"
              className={styles.balloonImg}
            />

            {/* Store에 곡 정보가 있을 때만 썸네일 표시 */}
            {currentTrack?.videoId && (
              <div className={styles.thumbnailInsideBalloon}>
                <img
                  src={`https://img.youtube.com/vi/${currentTrack.videoId}/mqdefault.jpg`}
                  alt="track thumbnail"
                />
              </div>
            )}
          </div>

          {/* 아바타와 닉네임 */}
          <div className={styles.avatarLayer}>
            <img
              src="/images/avator/avator.png"
              alt="avatar"
              onClick={() => navigate("/myMusic")}
            />
            <div className={styles.nicknameTag}>{nickname}</div>
          </div>

          {/* 턴테이블 */}
          <div className={styles.turnTableLayer}>
            <img src="/images/dj_controller.png" alt="turntable" />
          </div>
        </div>

        <div className={styles.brandLogo}>TWOPLI</div>
      </div>
    </div>
  );
}

export default ListComponent;
