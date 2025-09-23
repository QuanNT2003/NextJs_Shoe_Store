"use client";
import type { TableColumnsType, TableProps } from "antd";
import CustomTable from "@/component/CustomTable/customTable";
import { useState } from "react";
import FilterModal from "@/component/FilterModal/filterModal";
import SelectComp from "@/component/SelectComp/select";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    age: 30,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Jim Green",
    age: 41,
    address: "London No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Joe Black",
    age: 38,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Disabled User",
    age: 100,
    address: "Sydney No. 1 Lake Park",
  },
];
export default function Products() {
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log(search);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  const handleClearFilter = () => {};
  const handleFilter = () => {
    console.log(selected);
  };
  const options = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "tom",
      label: "Tom",
    },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="frame">
      <CustomTable<DataType>
        columns={columns}
        data={data}
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
            <SelectComp
              selected={selected}
              options={options}
              setSelected={setSelected}
              placeholder="test choose"
            />
          </FilterModal>
        }
        placeholderSearch="Tìm kiếm theo tên sản phẩm"
        tableProps={{ pagination: { pageSize: 10, total: 30 } }}
      />
    </div>
  );
}
