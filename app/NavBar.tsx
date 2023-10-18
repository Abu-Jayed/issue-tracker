"use client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list" },
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
            className={`${
              currentPath === link.herf ? "text-zinc-900" : "text-zinc-500"
            }  hover:text-zinc-800 transition-colors`}
          >
            <Link href={link.herf}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Logout</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
