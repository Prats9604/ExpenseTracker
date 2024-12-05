"use client";
// components/Header.tsx
import React, { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Expenses", href: "/" },
  { name: "Dashboard", href: "/why" },
];

const Header: React.FC = () => {

  return (
    <header className="fixed top-0 right-0 text-white z-50 flex flex-row justify-between">
      {/* <div>Expense Tracker</div> */}
      <nav className=" bg-[#012224] flex items-center h-full">
        <div className="flex flex-grow justify-center gap-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="flex pt-8 pb-4 items-center px-4 hover:text-gray-300 cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
