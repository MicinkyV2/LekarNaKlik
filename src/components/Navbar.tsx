import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar className="">
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}