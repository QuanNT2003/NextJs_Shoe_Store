"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faPercent,
  faBox,
  faReceipt,
  faChartSimple,
  faUser,
  faRightLeft,
  faWarehouse,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Cấu hình FontAwesome để tránh bị mất icon khi chuyển trang
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Tắt auto-add CSS để tránh conflict với Next.js
config.autoAddCss = false;
function SideBar() {
  const links = [
    {
      title: "Sản phẩm",
      path: "/products",
      icon: <FontAwesomeIcon icon={faBox} className="me-4 " />,
    },
    {
      title: "Khuyến mãi",
      path: "/promotions",
      icon: <FontAwesomeIcon icon={faPercent} className="me-4 " />,
    },
    {
      title: "Đơn hàng",
      path: "/orders",
      icon: <FontAwesomeIcon icon={faReceipt} className="me-4 " />,
    },
    {
      title: "Đổi - Trả hàng",
      path: "/exchange_returns",
      icon: <FontAwesomeIcon icon={faRightLeft} className="me-4 " />,
    },
    {
      title: "Nhập hàng",
      path: "/imports",
      icon: <FontAwesomeIcon icon={faWarehouse} className="me-4 " />,
    },
    {
      title: "Khách hàng",
      path: "/customers",
      icon: <FontAwesomeIcon icon={faUser} className="me-4 " />,
    },
    {
      title: "Thương hiệu",
      path: "/brands",
      icon: <FontAwesomeIcon icon={faStore} className="me-4 " />,
    },
    {
      title: "Bình luận",
      path: "/comments",
      icon: <FontAwesomeIcon icon={faComment} className="me-4 " />,
    },
    {
      title: "Báo cáo thông kê",
      path: "/reports",
      icon: <FontAwesomeIcon icon={faChartSimple} className="me-4 " />,
    },
  ];
  const pathname = usePathname();
  return (
    <div className="w-full h-full bg-white">
      {/* Header với logo */}
      <div className="pt-6 flex justify-center items-center h-28 border-b border-gray-200">
        <div className="text-2xl font-bold text-[#2cbaa0]">TQShop</div>
      </div>

      {/* Navigation Menu */}
      <div className="mt-5 me-2 pe-3 ms-2 text-base">
        {links.map((e, index) => (
          <Link
            key={index}
            href={e.path}
            className={pathname === e.path ? "navlink active" : "navlink"}
            title={e.title}
          >
            <div className="flex items-center justify-center w-6 h-6 fa-icon">
              {e.icon}
            </div>
            <div className="pe-2 flex-1">{e.title}</div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs text-gray-500 text-center">
          © 2024 TQShop Admin
        </div>
      </div>
    </div>
  );
}

export default SideBar;
