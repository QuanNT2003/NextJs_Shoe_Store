import React from "react";
import { Table, Input, Button } from "antd";
import type { TableColumnsType, TableProps } from "antd";

export type SelectionType = "checkbox" | "radio";

export interface CustomTableProps<T extends { key: React.Key }> {
  columns: TableColumnsType<T>;
  data: T[];
  rowSelection?: TableProps<T>["rowSelection"];
  tableProps?: Omit<TableProps<T>, "columns" | "dataSource" | "rowSelection">;
  searchVisibility?: boolean;
  placeholderSearch?: string;
  search?: string;
  setSearch?: (value: string) => void;
  handleSearch?: () => void;
  filterComponent?: React.ReactNode;
}

const { Search } = Input;

function CustomTable<T extends { key: React.Key }>({
  columns,
  data,
  rowSelection,
  tableProps,
  searchVisibility,
  placeholderSearch,
  search,
  setSearch,
  handleSearch,
  filterComponent,
}: CustomTableProps<T>) {
  const resolvedRowSelection: TableProps<T>["rowSelection"] = rowSelection
    ? { type: "checkbox", ...rowSelection }
    : undefined;

  return (
    <div className="w-[100%] bg-white rounded-2xl p-5 select-none shadow-table">
      <div>
        <div className="flex justify-center items-center flex-wrap">
          {searchVisibility && (
            <div className="flex-1 flex gap-2">
              <Search
                className="flex-1"
                placeholder={placeholderSearch}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch?.(e.target.value)
                }
                onSearch={handleSearch}
              />
            </div>
          )}

          {filterComponent}
        </div>
        <div className="w-[100%] h-[100%] mt-[10px] overflow-y-auto">
          <Table<T>
            columns={columns}
            dataSource={data}
            rowSelection={resolvedRowSelection}
            {...tableProps}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
