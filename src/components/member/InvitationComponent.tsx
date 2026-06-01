// InvitationComponent.tsx 수정본
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InvitationComponent.module.css";
import {
  acceptFriendsBulkPut,
  rejectFriendsBulkPost,
  getReceivedRequestsGet,
} from "../../api/friendsApi";

interface FriendRequest {
  requesterId: string;
  nickname: string;
  message: string;
}

function InvitationComponent() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // 실제 백엔드 API 연동 함수
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await getReceivedRequestsGet();
      setRequests(data);
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || "친구 요청 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 화면 진입 시 요청 목록 로드
  useEffect(() => {
    fetchRequests();
  }, []);

  // 전체 선택 / 해제 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(requests.map((req) => req.requesterId));
    } else {
      setSelectedIds([]);
    }
  };

  // 단건 체크박스 토글 핸들러
  const handleCheckRow = (requesterId: string) => {
    setSelectedIds((prev) =>
      prev.includes(requesterId)
        ? prev.filter((id) => id !== requesterId)
        : [...prev, requesterId],
    );
  };

  // 일괄 수락(ACCEPT) 처리
  const handleAcceptBulk = async () => {
    if (selectedIds.length === 0) {
      setIsError(true);
      setStatusMessage("처리할 친구 요청을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const responseMessage = await acceptFriendsBulkPut(selectedIds);

      setIsError(false);
      setStatusMessage(
        responseMessage || "선택한 친구 신청을 모두 수락했습니다.",
      );

      // 처리 완료된 대상들 목록에서 제외 및 선택 해제
      setRequests((prev) =>
        prev.filter((req) => !selectedIds.includes(req.requesterId)),
      );
      setSelectedIds([]);
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || "일괄 수락 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 일괄 거절(REJECT) 처리
  const handleRejectBulk = async () => {
    if (selectedIds.length === 0) {
      setIsError(true);
      setStatusMessage("처리할 친구 요청을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const responseMessage = await rejectFriendsBulkPost(selectedIds);

      setIsError(false);
      setStatusMessage(
        responseMessage || "선택한 친구 신청을 모두 거절했습니다.",
      );

      // 처리 완료된 대상들 목록에서 제외 및 선택 해제
      setRequests((prev) =>
        prev.filter((req) => !selectedIds.includes(req.requesterId)),
      );
      setSelectedIds([]);
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(err.message || "일괄 거절 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.homeBtn} onClick={() => navigate("/list")}>
        <img src="/images/home.png" alt="home" />
      </div>
      <div className={styles.polaroidCard}>
        <button
          className={styles.homeButton}
          onClick={() => navigate("/list")}
        ></button>

        <h2 className={styles.title}>
          INVITATION<span className={styles.dot}>.</span>
        </h2>
        <p className={styles.description}>
          TWOPLI를 함께할 친구로부터 요청이 왔어요.
        </p>

        {statusMessage && (
          <p className={isError ? styles.errorMessage : styles.successMessage}>
            {statusMessage}
          </p>
        )}

        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.checkCol}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  requests.length > 0 && selectedIds.length === requests.length
                }
                disabled={isLoading || requests.length === 0}
              />
            </div>
            <div className={styles.idCol}>ID</div>
            <div className={styles.nicknameCol}>NICKNAME</div>
            <div className={styles.messageCol}>MESSAGE</div>
          </div>

          <div className={styles.tableBody}>
            {isLoading && requests.length === 0 ? (
              <div className={styles.emptyRow}>로딩 중입니다...</div>
            ) : requests.length === 0 ? (
              <div className={styles.emptyRow}>
                도착한 친구 요청이 없습니다.
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.requesterId}
                  className={`${styles.tableRow} ${
                    selectedIds.includes(req.requesterId)
                      ? styles.selectedRow
                      : ""
                  }`}
                >
                  <div className={styles.checkCol}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(req.requesterId)}
                      onChange={() => handleCheckRow(req.requesterId)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className={styles.idCol}>{req.requesterId}</div>
                  <div className={styles.nicknameCol}>{req.nickname}</div>
                  <div className={styles.messageCol}>{req.message}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.acceptButton}
            onClick={handleAcceptBulk}
            disabled={isLoading || selectedIds.length === 0}
          >
            ACCEPT
          </button>
          <button
            className={styles.rejectButton}
            onClick={handleRejectBulk}
            disabled={isLoading || selectedIds.length === 0}
          >
            REJECT
          </button>
        </div>

        <div className={styles.brandLogo}>TWOPLI</div>
      </div>
    </div>
  );
}

export default InvitationComponent;
