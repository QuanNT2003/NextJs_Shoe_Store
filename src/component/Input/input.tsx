"use client";
import React from "react";
import { Input } from "antd";
const addCommas = (num: string) => {
  if (Number(num) === 0) return "0";

  if (num.indexOf("0") === 0)
    return num
      .toString()
      .slice(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, "");

const { TextArea } = Input;

type InputTextProps = {
  title?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  money?: boolean;
  number?: boolean;
  type?: string;
  error?: string;
};
function ProInput({
  title,
  required,
  value,
  placeholder,
  onChange,
  money,
  number,
  type,
  error,
}: InputTextProps) {
  const renderContent = () => {
    switch (type) {
      case "textarea":
        return (
          <TextArea
            rows={4}
            placeholder={placeholder}
            onChange={(e) => {
              if (money) {
                onChange?.(addCommas(removeNonNumeric(e.target.value)));
              } else if (number) {
                onChange?.(removeNonNumeric(e.target.value));
              } else {
                onChange?.(e.target.value);
              }
            }}
            value={value}
          />
        );
      case "password":
        return (
          <Input.Password
            status={error && "error"}
            placeholder={placeholder}
            onChange={(e) => {
              if (money) {
                onChange?.(addCommas(removeNonNumeric(e.target.value)));
              } else if (number) {
                onChange?.(removeNonNumeric(e.target.value));
              } else {
                onChange?.(e.target.value);
              }
            }}
            value={value}
          />
        );
      default:
        return (
          <Input
            size="large"
            status={error && "error"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (money) {
                onChange?.(addCommas(removeNonNumeric(e.target.value)));
              } else if (number) {
                onChange?.(removeNonNumeric(e.target.value));
              } else {
                onChange?.(e.target.value);
              }
            }}
          />
        );
    }
  };
  return (
    <div className="mx-2">
      <div className="font-medium mb-[3px]">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </div>
      <div>{renderContent()}</div>
      {error && (
        <div className="text-red-500 mt-[5px] ml-[5px] mr-[3px] text-[12px]">
          {error}
        </div>
      )}
    </div>
  );
}

export default ProInput;
