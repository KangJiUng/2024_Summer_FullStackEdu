// 신규 회원가입 데이터 타입 정의
// export 사용하는 경우 다른 파일에서 {}를 사용해서 참조, export default 사용하는 경우 {} 안 쓰고 참조
export interface IEntryMember {
  email: string;
  password: string;
  name: string;
}
