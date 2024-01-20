import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import LoginModal from "./account/LoginModal";
import RegisterModal from "./account/RegisterModal";

export default function App() {
  return (
    <Navbar className="" isBordered shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit text-xl">LékařNaKlik</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">   
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            <Button color="primary" className="px-20">
                Mapa
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <RegisterModal />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <LoginModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}