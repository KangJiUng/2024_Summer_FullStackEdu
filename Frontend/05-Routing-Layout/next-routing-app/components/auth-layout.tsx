import Header from "@/components/header";
import Footer from "@/components/footer";
import MypageMenu from "@/components/mypage-menu";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        {/* 마이페이지 좌측메뉴바 영역 */}
        <div className="w-2/12 bg-blue-500">
          <MypageMenu />
        </div>

        {/* 마이페이지 콘텐츠 영역 */}
        <div className="w-10/12 bg-green-500">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
