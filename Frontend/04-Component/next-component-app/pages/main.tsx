// 폰트스타일로 구글 폰트 참조하기
import { Inter } from "next/font/google";

// 폰트스타일을 적용하기 위해 Inter 함수 호출
const inter = Inter({ subsets: ["latin"] });

// 각종 재사용 컴포넌트 참조하기
import Header from "@/components/header";
import LogoContents from "@/components/logo-contents";
import Guide from "@/components/guide";

function Main() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* 헤더 컴포넌트 영역 */}
      <Header />

      {/* 로고 컴포넌트 영역 */}
      <LogoContents />

      {/* 가이드 컴포넌트 영역 */}
      <Guide />
    </main>
  );
}

export default Main;
