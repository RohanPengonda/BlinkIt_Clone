import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container mx-auto flex items-center h-full px-2 justify-between">
        {/* Logo */}
        <div className="h-full">
          <Link to={"/"} className="h-full flex justify-center items-center">
            <img
              src={logo}
              width={170}
              height={60}
              alt=""
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={170}
              height={60}
              alt=""
              className="lg:hidden"
            />
          </Link>
        </div>

        {/* Search */}
        <div>
          <Search />
        </div>

        {/* Login and My Cart */}

        <div>Login and CArt</div>
      </div>
    </header>
  );
};

export default Header;
