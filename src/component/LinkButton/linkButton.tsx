import React from "react";
type LinkButtonProps = {
  path: string;
  icon: React.ReactNode;
  placeholder: string;
};
function LinkButton({ path, icon, placeholder }: LinkButtonProps) {
  return (
    <a
      rel="noopener noreferrer"
      href={path}
      className="bg-blue-500 text-white hover:bg-[#3a57e8] inline-flex items-center rounded-lg min-w-[100px] py-4 px-3 cursor-pointer text-sm me-4"
    >
      <span className="me-2">{icon}</span>
      {placeholder}
    </a>
  );
}

export default LinkButton;
