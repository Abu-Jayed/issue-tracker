"use client";
import { Skeleton } from "@/app/components/";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug></AiFillBug>
            </Link>
            <NavLinks></NavLinks>
          </Flex>
          <AuthStatus></AuthStatus>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list" },
  ];
  return (
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
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"}></Skeleton>;

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image!}
              fallback="?"
              size={"2"}
              radius="full"
              alt="user img"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            ></Avatar>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{session.user?.email}</Text>{" "}
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href={"/api/auth/signin"}>
          Login
        </Link>
      )}
    </Box>
  );
};

export default NavBar;
