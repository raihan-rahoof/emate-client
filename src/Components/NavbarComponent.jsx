import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
function NavbarComponet() {
  return (
    <>
      <Navbar position="static" className="bg-[#18181b]">
        <NavbarBrand>
          <p className="font-bold text-xl text-white ">
            MAIL<span className="text-green-400">MATE</span>
          </p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="text-white"
              color="default"
              href="#"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavbarComponet;
