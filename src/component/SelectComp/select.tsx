import React from "react";
import { Select } from "antd";

type SelectOption = { value: string; label: string };

type SelectCompProps = {
  options?: SelectOption[];
  selected?: string[];
  setSelected?: (value: string[]) => void;
  placeholder?: string;
  notShowTitle?: boolean;
};

function SelectComp({
  options,
  selected,
  setSelected,
  placeholder,
  notShowTitle,
}: SelectCompProps) {
  return (
    <div className="text-sm bg-white mb-5">
      {notShowTitle ? (
        <div></div>
      ) : (
        <div className="font-medium mb-[6px] text-sm">{placeholder}</div>
      )}
      <Select
        style={{ width: "100%" }}
        showSearch
        optionFilterProp="label"
        value={selected}
        onChange={(value) => setSelected?.(value as string[])}
        options={options}
      />
    </div>
  );
}

export default SelectComp;
