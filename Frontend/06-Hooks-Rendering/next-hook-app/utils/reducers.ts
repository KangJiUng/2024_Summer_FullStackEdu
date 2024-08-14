import { CountActionType, ActionType } from "@/interface/common";

// 재사용 가능한 카운트 리듀서 함수 정의하기
export function countReducer(state: number, action: ActionType) {
  // 처리 로직 유형에 따른 비지니스 로직 처리 후 관리하는 상태값 반환하기, 기본값은 현재 상태값 반환
  const { type } = action;

  switch (type) {
    case CountActionType.PLUS:
      return state + 1;
    case CountActionType.MINUS:
      return state - 1;
    case CountActionType.INIT:
      return 0;
    default:
      return state;
  }
}
