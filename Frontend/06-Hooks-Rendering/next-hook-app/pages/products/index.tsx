import { useState, useEffect } from "react";
import { Category, Product } from "@/interface/product";

// DB에서 가져왔다고 가정하는 가상 데이터셋 전역변수 데이터 정의
const categoryData: Category[] = [
  { category_id: 0, category: "전체", sort: 0 },
  { category_id: 1, category: "TV", sort: 1 },
  { category_id: 2, category: "노트북", sort: 2 },
  { category_id: 3, category: "냉장고", sort: 3 },
];

const productData: Product[] = [
  {
    product_id: 1,
    category_id: 2,
    product_name: "삼성 노트북 2024 갤럭시북4 NT750XGR-A15A",
    manufacturer: "삼성전자",
    price: 939000,
    stock: 50,
    image: "",
  },
  {
    product_id: 2,
    category_id: 2,
    product_name: "LG 노트북 그램",
    manufacturer: "LG전자",
    price: 1539000,
    stock: 50,
    image: "",
  },
  {
    product_id: 3,
    category_id: 1,
    product_name: "LG 75인치 UHD TV 75UP7750PVA",
    manufacturer: "LG전자",
    price: 2990000,
    stock: 50,
    image: "",
  },
  {
    product_id: 4,
    category_id: 3,
    product_name: "삼성 냉장고 2023 XDFDFD071B4",
    manufacturer: "삼성전자",
    price: 5090000,
    stock: 50,
    image: "",
  },
  {
    product_id: 5,
    category_id: 3,
    product_name: "삼성 냉장고 2024 RS84T5071B4",
    manufacturer: "삼성전자",
    price: 6090000,
    stock: 50,
    image: "",
  },
];

const ProductSearch = () => {
  //콤보박스에 바인딩될 카테고리 목록
  const [categories, setCategories] = useState<Category[]>([]);

  //콤보박스에서 선택된 단일 분류정보
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    category_id: 0,
    category: "전체",
    sort: 0,
  });

  //제품 테이블에 바인딩될 제품 목록
  const [products, setProducts] = useState<Product[]>([]);

  // 최초 화면이 로딩되는 시점(마운팅시점)을 찾아서 백엔드에서 분류목록과 제품 목록 데이터를 가져옵니다.
  useEffect(() => {
    setCategories(categoryData);
    setProducts(productData);
    setSelectedCategory({
      category_id: 0,
      category: "전체",
      sort: 0,
    });
  }, []);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 선택한 단일 카테고리 정보 조회하기
    const category = categories.find(
      (c) => c.category_id === Number(e.target.value)
    ) as Category;

    setSelectedCategory(category);
  };

  // 특정 상태값이 변경되는 시점을 확인해서 기능을 구현합니다.
  useEffect(() => {
    const searchResult = productData.filter(
      (item) => item.category_id === selectedCategory.category_id
    );

    if (selectedCategory.category_id === 0) {
      // 전체 카테고리를 선택한 경우 전체 제품데이터 출력
      setProducts(productData);
    } else {
      // 나머지 카테고리를 선택한 경우 관련 제품목록데이터 출력
      setProducts(searchResult);
    }
  }, [selectedCategory]);

  return (
    <div>
      {/* 제품 카테고리 선택 영역 */}
      <div className="m-4 flex rounded-md">
        <select
          value={selectedCategory.category_id}
          onChange={changeCategory}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.category_id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <h1 className="m-4 text-2xl">
        <b>Product List</b>
      </h1>

      {/* 제품 목록 출력 영역 */}
      <div className="m-4">
        <table className="w-full rounded-md text-center divide-y divide-gray-100">
          <thead>
            <tr>
              <th className="border border-slate-600">제품번호</th>
              <th className="border border-slate-600">제품명</th>
              <th className="border border-slate-600">제조사</th>
              <th className="border border-slate-600">가격</th>
            </tr>
          </thead>
          <tbody className="w-full text-center divide-y divide-gray-100">
            {products.map((item, index) => (
              <tr key={index}>
                <td className="border border-slate-500">{item.product_id}</td>
                <td className="border border-slate-500">{item.product_name}</td>
                <td className="border border-slate-500">{item.manufacturer}</td>
                <td className="border border-slate-500">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSearch;
