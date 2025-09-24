"use client";
import type { TableProps } from "antd";
import CustomTable from "@/component/CustomTable/customTable";
import { useEffect, useState } from "react";
import FilterModal from "@/component/FilterModal/filterModal";
import {
  productColumns,
  ProductRow,
} from "@/component/Item/productItem/productItem";
import * as ProductsServices from "@/apiServices/productService";
import * as BrandServices from "@/apiServices/brandService";
import * as CategoryServices from "@/apiServices/categoryService";
import MultiselectComp from "@/component/MultiSelectComp/multiselectComp";
import LinkButton from "@/component/LinkButton/linkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import PriceRange from "@/component/PriceRange/priceRange";
type ProductQueryParams = {
  page: number;
  limit: number;
  sortBy?: string;
  orderBy?: string;
  search?: string;
  brand?: string[];
  category?: string[];
  classify?: string[];
  price?: number[];
  // Thêm các trường khác nếu cần
};
const optionsType = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" },
  { label: "Trẻ em", value: "Trẻ em" },
];
export default function Products() {
  const router = useRouter();
  const createObjectQuery = async (
    page: number,
    limit: number,
    sortBy?: string,
    orderBy?: "asc" | "desc",
    search?: string,
    brand?: string[] | string,
    category?: string[] | string,
    classify?: string[] | string,
    price?: number[]
  ) => {
    const toArray = (value?: string[] | string) =>
      value === undefined ? undefined : Array.isArray(value) ? value : [value];

    return {
      limit,
      page,
      ...(orderBy && { orderBy }),
      ...(sortBy && { sortBy }),
      ...(search && { search }),
      ...(toArray(brand) && { brand: toArray(brand)! }),
      ...(toArray(category) && { category: toArray(category)! }),
      ...(toArray(classify) && { classify: toArray(classify)! }),
      ...(price && { price }),
    };
  };
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  // API PROPS
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sortBy, setSortBy] = useState<string>("");
  const [orderBy, setOrderBy] = useState<"asc" | "desc" | undefined>(undefined);

  // Filter Options
  const [optionsCate, setOptionsCate] = useState([]);
  const [optionsBrand, setOptionsBrand] = useState([]);

  //Filter
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  // PriceRange
  const [price, setPrice] = useState([0, 0]);

  const handleChangePriceRange = (newValue: number[]) => {
    // console.log(newValue);

    setPrice(newValue);
    // if (!Array.isArray(newValue)) {
    //   return;
    // }

    // if (newValue[0] < newValue[1] - minDistance) {
    //   setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    // } else {
    //   setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    // }
  };
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  const handleClearFilter = () => {
    setSelectedBrand([]);
    setSelectedCate([]);
    setSelectedType([]);
    setPrice([0, 0]);
  };
  const handleFilter = async () => {
    setPage(1);
    console.log("handleFilter");
    getList(
      await createObjectQuery(
        1,
        limit,
        sortBy,
        orderBy,
        search,
        selectedBrand,
        selectedCate,
        selectedType,
        price[1] === 0 ? undefined : price
      )
    );

    handleCloseFilter();
  };

  const getBrand = async () => {
    const response = await BrandServices.getAllBrands({}).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

    if (response) {
      const data = await response.data.map(
        (brand: { brand: { name: string; _id: string } }) => ({
          label: brand.brand.name,
          value: brand.brand._id,
        })
      );
      setOptionsBrand(data);
    }
  };

  // GET DATA SUPPLIERS
  const getCate = async () => {
    const response = await CategoryServices.getAllCategories({}).catch(
      (error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );

    if (response) {
      const data = await response.data.map(
        (cate: { name: string; _id: string }) => ({
          label: cate.name,
          value: cate._id,
        })
      );
      setOptionsCate(data);
    }
  };

  const handlePageChange = async (pageNumber: number) => {
    setPage(pageNumber);
    console.log("get List handlePageChange", pageNumber);
    getList(
      await createObjectQuery(
        pageNumber,
        limit,
        sortBy,
        orderBy,
        search,
        selectedBrand,
        selectedCate,
        selectedType,
        price[1] === 0 ? undefined : price
      )
    );
  };

  const handlePerRowsChange = async (
    newPerPage: number,
    pageNumber: number
  ) => {
    setPage(pageNumber);
    setLimit(newPerPage);
    console.log("handlePerRowsChange");
    getList(
      await createObjectQuery(
        pageNumber,
        newPerPage,
        sortBy,
        orderBy,
        search,
        selectedBrand,
        selectedCate,
        selectedType,
        price[1] === 0 ? undefined : price
      )
    );
  };

  const handleSort = async (
    column: { text: string },
    sortDirection: "asc" | "desc"
  ) => {
    setSortBy(column.text);
    setOrderBy(sortDirection);
    setPage(1);
    console.log("handleSort");
    getList(
      await createObjectQuery(
        1,
        limit,
        column.text,
        sortDirection,
        search,
        selectedBrand,
        selectedCate,
        selectedType,
        price[1] === 0 ? undefined : price
      )
    );
    handleCloseFilter();
  };

  const getList = async (obj: ProductQueryParams) => {
    setLoading(true);
    const response = await ProductsServices.GetProducts(obj).catch((error) => {
      setLoading(false);

      if (error?.response?.status === 404) {
        setRows([]);
        setTotalRows(0);
      } else {
        // toastContext.notify('error', 'Có lỗi xảy ra');
      }
    });

    if (response) {
      // console.log(response);
      setLoading(false);
      type ApiProduct = Omit<ProductRow, "key"> & {
        _id?: string;
        productId?: string | number;
      };
      const rowsWithKey: ProductRow[] = (response.data as ApiProduct[]).map(
        (item, index) => ({
          key: String(item?._id ?? item?.productId ?? index),
          ...item,
        })
      );
      setRows(rowsWithKey);
      setTotalRows(response.total);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      getList(await createObjectQuery(page, limit, sortBy, orderBy, search));
      getBrand();
      getCate();
      // console.log(optionsLSP)
      // console.log(optionsManufacturer);
    };

    fetch();
  }, []);
  const rowSelection: TableProps<ProductRow>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    getList(
      await createObjectQuery(
        1,
        limit,
        sortBy,
        orderBy,
        search,
        selectedBrand,
        selectedCate,
        selectedType
        // price[1] === 0 ? '' : price
      )
    );

    handleCloseFilter();
  };

  const handleRowClick = (record: ProductRow, rowIndex?: number) => {
    router.push("/products/" + record._id);
    // console.log(record);
  };
  return (
    <div>
      <div className="frame flex justify-end">
        <LinkButton
          path="/products/add"
          placeholder="Thêm sản phẩm"
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>
      <div className="frame">
        <CustomTable<ProductRow>
          columns={productColumns}
          data={rows}
          rowSelection={rowSelection}
          searchVisibility
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          filterComponent={
            <FilterModal
              open={openFilter}
              handleOpen={handleOpenFilter}
              handleClose={handleCloseFilter}
              handleClearFilter={handleClearFilter}
              handleFilter={handleFilter}
            >
              <MultiselectComp
                selected={selectedType}
                options={optionsType}
                setSelected={setSelectedType}
                placeholder="Phân loại"
              />
              <MultiselectComp
                selected={selectedBrand}
                options={optionsBrand}
                setSelected={setSelectedBrand}
                placeholder="Thương hiệu"
              />
              <MultiselectComp
                selected={selectedCate}
                options={optionsCate}
                setSelected={setSelectedCate}
                placeholder="Loại sản phẩm"
              />
              <PriceRange
                value={price}
                title="Giá bán"
                handleChange={handleChangePriceRange}
              />
            </FilterModal>
          }
          placeholderSearch="Tìm kiếm theo tên sản phẩm"
          handleRowClick={handleRowClick}
          handleSort={handleSort}
          tableProps={{
            loading,
            pagination: {
              current: page,
              pageSize: limit,
              total: totalRows,
              showSizeChanger: true,
              onChange: (p, _ps) => {
                // setPage(p);
                // setLimit(ps);
                handlePageChange(p);
              },
              onShowSizeChange: (_current, size) => {
                handlePerRowsChange(size, _current);
                // setPage(1);
                // setLimit(size);
              },
            },
          }}
        />
      </div>
    </div>
  );
}
