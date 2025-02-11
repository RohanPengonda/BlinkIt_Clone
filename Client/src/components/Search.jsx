import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import useMobile from "../Hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 group-focus-within:text-primary-200 bg-white m-1"
          >
            <FaRegArrowAltCircleLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <FaSearch size={23} />
          </button>
        )}
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search bar
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Search 'bread'",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Search 'milk'",
                1000,
                "Search 'vegetables'",
                1000,
                "Search 'fruits'",
                1000,
                "Search 'panner'",
                1000,
                "Search 'sugar'",
                1000,
                "Search 'rice'",
                1000,
                "Search 'chocolates'",
                1000,
                "Search 'chips'",
                1000,
                "Search 'curd'",
                1000,
                "Search 'egg'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "20px", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in Search Bar
          <div className="w-full h-full">
            <input
              className="bg-transparent w-full h-full outline-none"
              type="text"
              autoFocus
              placeholder="Search for "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
