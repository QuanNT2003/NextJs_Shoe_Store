import React from "react";
import { Table, Input } from "antd";
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
  handleRowClick?: (record: T, rowIndex?: number) => void;
  handleSearch?: () => void;
  handleSort?: (
    column: { text: string },
    sortDirection: "asc" | "desc"
  ) => void;
  filterComponent?: React.ReactNode;
}

const { Search } = Input;

function CustomTable<T extends { key: React.Key }>({
  columns,
  data,
  // rowSelection,
  tableProps,
  searchVisibility,
  placeholderSearch,
  search,
  setSearch,
  handleRowClick,
  handleSearch,
  handleSort,
  filterComponent,
}: CustomTableProps<T>) {
  // const resolvedRowSelection: TableProps<T>["rowSelection"] = rowSelection
  //   ? { type: "checkbox", ...rowSelection }
  //   : undefined;

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
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  handleRowClick?.(record, rowIndex);
                },
              };
            }}
            onChange={(_pagination, _filters, sorter, extra) => {
              if (extra?.action !== "sort") return;
              if (handleSort && sorter && !Array.isArray(sorter)) {
                const { field, order } = sorter;
                if (field && order) {
                  handleSort(
                    { text: field as string },
                    order === "ascend" ? "asc" : "desc"
                  );
                }
              }
            }}
            // rowSelection={resolvedRowSelection}
            rowKey="key"
            {...tableProps}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
