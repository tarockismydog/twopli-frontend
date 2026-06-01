import api from "./axiosConfig";

export interface FriendRequest {
  requesterId: string; // 나에게 친구 요청을 보낸 사람의 아이디 (예: "katsuki")
  nickname: string; // 나에게 친구 요청을 보낸 사람의 닉네임 (예: "캇짱")
  message: string; // 상대방이 보낸 한마디 메시지 (예: "함께해용~~~!!")
}

// 에러 처리 공통 함수
const handleApiError = (error: any) => {
  if (error.response && error.response.data) {
    throw new Error(error.response.data);
  }
  throw new Error("서버 통신 중 오류가 발생했습니다.");
};

/**
 * 1. 단건 친구 신청 보내기 (메시지 필드 추가 확장)
 * @param receiverId 상대방 회원 ID
 * @param message 함께 보낼 한마디 메시지
 */
export const invitePost = async (
  receiverId: string,
  message: string,
): Promise<string> => {
  try {
    const response = await api.post<string>(`/api/friends/request`, {
      receiverId: receiverId,
      message: message, // 백엔드 RequestBody DTO에 매핑될 필드
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * 2. 나에게 온 친구 신청 목록 조회 (PENDING)
 */
export const getReceivedRequestsGet = async (): Promise<FriendRequest[]> => {
  try {
    debugger;
    const response = await api.get<FriendRequest[]>(`/api/friends/received`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * 3. 다건 친구 신청 일괄 수락
 * @param requesterIds 수락할 신청자 ID 배열 (e.g. ['user1', 'user2'])
 */
export const acceptFriendsBulkPut = async (
  requesterIds: string[],
): Promise<string> => {
  try {
    const response = await api.put<string>(`/api/friends/accept`, {
      requesterIds: requesterIds,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * 4. 다건 친구 신청 일괄 거절/삭제
 * @param requesterIds 거절할 신청자 ID 배열
 */
export const rejectFriendsBulkPost = async (
  requesterIds: string[],
): Promise<string> => {
  try {
    const response = await api.post<string>(`/api/friends/reject`, {
      requesterIds: requesterIds,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
