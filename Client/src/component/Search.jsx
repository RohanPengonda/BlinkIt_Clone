import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, []);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg boredr overflow-hidden flex items-center text-neutral-500 bg-slate-50">
      <button className="flex justify-center items-center h-full p-3 ">
        <FaSearch size={23} />
      </button>

      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search bar
          <div onClick={redirectToSearchPage}>
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
              style={{ fontSize: "23px", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in Search Bar
          <div className="w-full h-full">
            <input
              className="bg-transparent w-full h-full"
              type="text"
              placeholder="Search for "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
