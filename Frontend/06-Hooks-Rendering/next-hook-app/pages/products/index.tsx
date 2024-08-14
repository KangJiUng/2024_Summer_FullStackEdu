import { useState, useEffect } from "react";
import { Category, Product } from "@/interface/product";

const categoryData: Category[] = [
  { category_id: 1, category: "노트북", sort: 1 },
  { category_id: 2, category: "TV", sort: 2 },
  { category_id: 3, category: "냉장고", sort: 3 },
];

// 원본 데이터 목록(Database)
const productsData: Product[] = [
  {
    product_id: 1,
    category_id: 1,
    product_name: "삼성 노트북 2024 갤럭시북4 NT750XGR-A15A",
    manufacturer: "삼성전자",
    price: 939000,
    stock: 50,
    image: "",
  },
  {
    product_id: 2,
    category_id: 1,
    product_name: "LG 노트북 그램",
    manufacturer: "LG전자",
    price: 1539000,
    stock: 50,
    image: "",
  },
  {
    product_id: 3,
    category_id: 2,
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
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);

  //제품 테이블에 바인딩될 제품 목록
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
    setSelectedCategory(categoryData);
  }, []);

  useEffect(() => {
    console.log("검색어가 변경되어 블로그목록을 갱신합니다.");
    productSearch();
  }, [selectedCategory]);

  const productSearch = () => {
    let searchResult: Product[] = [];

    if (categories === selectedCategory) {
      searchResult = productsData.filter(
        (item) => item.category_id === selectedCategory.category_id
      );
      setProducts(searchResult);
    } else {
      setProducts(productsData);
    }

    setProducts(productsData);
  };

  return (
    <div>
      {/* 제품 카테고리 선택 영역 */}
      <div className="m-4 flex">
        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
          <option value="0">전체보기</option>
          <option value="1">노트북</option>
          <option value="2">TV</option>
          <option value="3">냉장고</option>
        </select>
      </div>

      <h1 className="m-4 text-2xl">
        <b>Product List</b>
      </h1>

      {/* 제품 목록 출력 영역 */}
      <div className="m-4">
        <table className="w-full text-center divide-y divide-gray-100">
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
