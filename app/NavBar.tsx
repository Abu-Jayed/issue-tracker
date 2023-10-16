import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug></AiFillBug>
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.label}
            className="text-zinc-500 hover:text-zinc-800 transition-colors "
          >
            <Link href={link.herf}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
