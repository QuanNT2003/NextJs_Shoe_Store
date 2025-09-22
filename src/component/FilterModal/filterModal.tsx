import React from "react";
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
type filterModalProps = {
  children?: React.ReactNode;
  open?: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  handleClearFilter?: () => void;
  handleFilter?: () => void;
};
function FilterModal({
  children,
  open,
  handleOpen,
  handleClose,
  handleClearFilter,
  handleFilter,
}: filterModalProps) {
  return (
    <div>
      <div
        className="ml-[20px] px-[10px] py-[15px] text-[14px] text-[#4a4a4a] border border-solid border-white rounded-lg flex justify-center items-center hover:cursor-pointer hover:border-blue-500"
        onClick={handleOpen}
      >
        <FontAwesomeIcon className="text-[#4a4a4a]" icon={faFilter} />
        <div className="ml-[10px]">Bộ lọc</div>
      </div>
      <Drawer
        open={open}
        onClose={handleClose}
        placement="right"
        width={480}
        footer={
          <div className="py-[10px] gap-5 flex justify-end text-[14px]">
            <Button
              className="px-[10px] py-[20px] font-semibold mr-[20x]"
              danger
              onClick={handleClearFilter}
            >
              Xóa bộ lọc
            </Button>
            <Button
              className="px-[10px] py-[20px] font-semibold mr-[20x]"
              type="primary"
              onClick={handleFilter}
            >
              Lọc
            </Button>
          </div>
        }
      >
        {children}
      </Drawer>
    </div>
  );
}

export default FilterModal;
