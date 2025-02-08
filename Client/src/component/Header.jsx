import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../Hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-1 flex items-center flex-col gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
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
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and My Cart */}

          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaRegUserCircle size={25} />
            </button>
            <div className="hidden lg:block">Login and Cart</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
