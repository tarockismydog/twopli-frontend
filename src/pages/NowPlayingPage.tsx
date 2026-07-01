import { useState } from "react";
import YouTube from "react-youtube";
import styles from "./NowPlayingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useTrackStore } from "../store/useMyTrackStore";

interface YouTubeSearchResult {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { default: { url: string } };
  };
}

export default function NowPlayingPage() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YouTubeSearchResult[]>([]);
  const { currentTrack, setCurrentTrack } = useTrackStore();

  const handleSelectTrack = (item: any) => {
    const trackData = {
      videoId: item.id.videoId,
      title: item.snippet.title,
    };
    setCurrentTrack(trackData);
    setIsSearching(false);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    const API_KEY = "AIzaSyDfSFbUmmvLSXm6K4seDsNls0qgfgQU3Xc";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&maxResults=5&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.homeBtn} onClick={() => navigate("/list")}>
        <img src="/images/home.png" alt="home" />
      </div>
      {currentTrack && (
        <div style={{ display: "none" }}>
          <YouTube
            videoId={currentTrack.videoId}
            opts={{ playerVars: { autoplay: 1 } }}
          />
        </div>
      )}

      {/* 슬라이드 애니메이션을 위한 래퍼 */}
      <div
        className={`${styles.mainWrapper} ${isSearching ? styles.shifted : ""}`}
      >
        {/* 왼쪽: 폴라로이드 섹션 */}
        <div className={styles.polaroidFrame}>
          <div className={styles.innerContent}>
            <div className={styles.thoughtBalloon}>
              <img
                src="/images/thought_balloon.png"
                alt="balloon"
                className={styles.balloonImg}
              />

              {/* 선택된 음악 썸네일 표시 */}
              {currentTrack && (
                <div className={styles.thumbnailInsideBalloon}>
                  <img
                    src={`https://img.youtube.com/vi/${currentTrack.videoId}/mqdefault.jpg`}
                    alt="track thumbnail"
                  />
                </div>
              )}
            </div>
            {/* 락커 배경은 CSS의 background-image로 처리 */}
            <div className={styles.avatarLayer}>
              <img src="/images/avator/avator.png" alt="avatar" />
            </div>
            <div
              className={styles.turnTableLayer}
              onClick={() => setIsSearching(true)}
            >
              <img src="/images/dj_controller.png" alt="turntable" />
            </div>
          </div>
          <div className={styles.brandLogo}>TWOPLI</div>
          {currentTrack && (
            <div className={styles.selectedTrackInfo}>{currentTrack.title}</div>
          )}
        </div>

        {/* 오른쪽: 검색창 섹션 (twopli_searching_2.jpg 디자인) */}
        <div className={styles.searchPanel}>
          <div className={styles.searchHeader}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search your music"
              />
            </form>
            <button type="submit" className={styles.searchConfirmBtn}>
              O
            </button>
            <button
              className={styles.searchCloseBtn}
              onClick={() => setIsSearching(false)}
            >
              X
            </button>
          </div>

          <div className={styles.searchResultArea}>
            {results.map((item) => (
              <div
                key={item.id.videoId}
                className={styles.resultItem}
                onClick={() => {
                  setCurrentTrack({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                  });
                  setIsSearching(false);
                }}
              >
                {/* 1. 썸네일 추가 */}
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                  className={styles.resultThumbnail}
                />

                {/* 2. 제목 텍스트 (특수문자 처리를 위해 여전히 dangerouslySetInnerHTML 사용) */}
                <span
                  className={styles.resultText}
                  dangerouslySetInnerHTML={{ __html: item.snippet.title }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
