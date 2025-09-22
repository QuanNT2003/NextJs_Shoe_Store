import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";
function Header() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="/profile">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="/setting">
          Setting
        </a>
      ),
    },
  ];

  return (
    <div className="flex min-h-[72px] items-center p-2 pe-4 bg-white justify-end">
      <Space direction="vertical">
        <Space wrap>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Avatar
              key="user-avatar"
              size={56}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
              className="cursor-pointer"
            />
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
}

export default Header;
