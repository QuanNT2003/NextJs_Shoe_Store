import React from "react";
import { Slider } from "antd";

type PriceRangeProps = {
  title?: string;
  handleChange?: (value: number[]) => void;
  value?: number[];
};
function valuetext(value: string) {
  return addCommas(value) + "đ";
}
const addCommas = (num: string) => {
  if (num === null) return;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
function PriceRange({ title, handleChange, value }: PriceRangeProps) {
  return (
    <div className="text-sm bg-white mb-5">
      <div className="font-medium mb-[3px]">{title}</div>
      <Slider
        range
        min={0}
        max={20000000}
        onChange={handleChange}
        value={value}
        tooltip={{
          formatter: (value) => valuetext(value?.toString() || "0"),
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{value?.[0] ? valuetext(value[0].toString()) : "0đ"}</span>
        <span>{value?.[1] ? valuetext(value[1].toString()) : "0đ"}</span>
      </div>
    </div>
  );
}

export default PriceRange;
