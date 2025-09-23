import noImage from "@/assets/images/no-image.png";
import type { TableColumnsType } from "antd";

export type ProductRow = {
  key: string;
  _id: string;
  productId: string | number;
  name: string;
  images: Array<{ url?: string }>;
  classify: string;
  category: { name: string };
  price: number;
  cost: number;
  brand: { name: string };
};

const addCommas = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const productColumns: TableColumnsType<ProductRow> = [
  {
    title: "Mã sản phẩm",
    key: "productId",
    width: 250,
    align: "center",
    render: (_value, row) => (
      <div
        className="flex justify-center items-center pt-[10px] pb-[10px] cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div
          className="min-h-[50px] min-w-[50px] bg-no-repeat bg-center bg-cover mr-[10px] w-[30%]"
          style={{
            backgroundImage: `url('${row.images?.[0]?.url || noImage}')`,
          }}
          data-tag="allowRowEvents"
        ></div>
        <div data-tag="allowRowEvents" className="w-[70%]">
          <div className="font-bold mb-[2px]" data-tag="allowRowEvents">
            {row.productId}
          </div>
          <div
            className="line-clamp-2 text-ellipsis "
            data-tag="allowRowEvents"
          >
            {row.name}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Phân loại",
    key: "classify",
    width: 180,
    align: "center",
    dataIndex: "classify",
    render: (value: string) => (
      <div
        className="text-[#101828] bg-[#d0d5f1] rounded-[20px] py-[5px] px-[10px] flex items-center text-[12px] cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div className="font-medium text-center" data-tag="allowRowEvents">
          {value}
        </div>
      </div>
    ),
  },
  {
    title: "Loại sản phẩm",
    key: "category",
    width: 180,
    align: "center",
    render: (_value, row) => (
      <div
        className="text-[#101828] bg-[#d0d5f1] rounded-[20px] py-[5px] px-[10px] flex items-center text-[12px] cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div className="font-medium text-center" data-tag="allowRowEvents">
          {row.category.name}
        </div>
      </div>
    ),
  },
  {
    title: "Giá bán",
    key: "price",
    dataIndex: "price",
    sorter: true,
    align: "center",
    render: (value: number) => (
      <div
        className="text-[12px] font-medium cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div data-tag="allowRowEvents">{addCommas(value)}</div>
      </div>
    ),
  },
  {
    title: "Giá vốn",
    key: "cost",
    dataIndex: "cost",
    sorter: true,
    align: "center",
    render: (value: number) => (
      <div
        className="text-[12px] font-medium cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div data-tag="allowRowEvents">{addCommas(value)}</div>
      </div>
    ),
  },
  {
    title: "Thương hiệu",
    key: "brand",
    align: "center",
    render: (_value, row) => (
      <div
        className="text-[12px] font-medium cursor-pointer"
        data-tag="allowRowEvents"
      >
        <div data-tag="allowRowEvents">{row.brand.name}</div>
      </div>
    ),
  },
];
