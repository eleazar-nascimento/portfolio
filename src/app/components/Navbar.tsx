"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { SwitchTheme } from "./Switch";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

export function NavbarHeader() {
  return (
    <Navbar
      className="bg-zinc-900"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-success",
        ],
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-white sm:text-lg">Eleazar Nascimento</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-white" href="#">
          SOBRE
          </Link>
        </NavbarItem>
        <NavbarItem isActive className="data-[active=true]:font-bold">
          <Link href="#" aria-current="page" color="success">
          PROJETOS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
          SERVIÇOS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
          HABILIDADES
          </Link>
        </NavbarItem>
        <NavbarItem>
          <SwitchTheme />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}