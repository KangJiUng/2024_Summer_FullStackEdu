// 자식 컴포넌트 참조하기
import Personal from "@/components/personal";
import Company from "@/components/company";

const Profile = () => {
  return;
  <>
    {/* 자식 요소에 props로 읽기전용 데이터를 전달합니다. */}
    <Personal
      name="강지웅"
      email="test@test.co.kr"
      phone="010-1234-1234"
      age={22}
    >
      {/* 자식 컴포넌트의 children 값을 정의합니다. */}
      <b>사용자 기본 프로필</b>
    </Personal>

    <hr />

    <Company company="충북대" role="학생개발자" address="청주시 서원구">
      <span>회사 정보</span>
    </Company>
  </>;
};

export default Profile;
