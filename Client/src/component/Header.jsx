import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../Hooks/useMobile";
import { FaCartPlus } from "react-icons/fa";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-1 flex items-center flex-col gap-1 text-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-4 py-2 justify-between">
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

          <div className="">
            {/* User Icon on display in Mobile verion only */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegUserCircle size={25} />
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={redirectToLoginPage} className="text-lg px-2">
                Login
              </button>

              <button className="flex items-center gap-2 bg-green-800  hover:bg-green-700 px-3 py-3 rounded text-white ">
                {/* add to cart icons */}
                <div className="animate-bounce">
                  <FaCartPlus size={28} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
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
