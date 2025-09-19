import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const SearchBar = () => {
  const [isMobile] = useMobile();

  /*i can use usenaviage() instead of using <a></a> tag :*/
  const navigate = useNavigate();
  const redirectToSearchPage = () => {
    navigate("/search");
  };
  /*and instead of <a> tage just do <div onClick={rediectToSearchPage}
   */

  const location = useLocation();
  //console.log("location", location);

  const [isSearchPage, setIsSearchPage] = useState(false);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const handleOnChange = (e) => {
    const value = e.target.value;

    const url = `/search?q=${value}`;
    navigate(url);
  };

  const params = useLocation();
  const searchText = params?.search?.slice(3);

  //console.log("search", isSearchPage);
  return (
    <>
      <div
        onClick={redirectToSearchPage}
        //href="/search"
        /*className="w-full min-w-[500px] lg:min-w[420px] h-10 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50"*/
        className={` lg:min-w-[420px] h-10 lg:h-10 rounded-lg border overflow-hidden flex items-center px-3 text-neutral-500 bg-slate-50 transition-all duration-200 cursor-text ${
          isSearchPage ? "border-black bg-white shadow-md text-black" : ""
        }`}
      >
        <div>
          {(!isSearchPage || (isSearchPage && !isMobile)) && (
            <IoSearch
              /*className={`${isSearchPage ? "text-black" : "text-neutral-500"}`}*/
              className="text-black m-3 p-0"
            />
          )}

          {isSearchPage && isMobile && (
            <FaArrowLeft
              className=" text-black m-3 p-0"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
            />
          )}
        </div>

        <div className="text-sm" /*text-sm font-medium*/>
          {!isSearchPage ? (
            //not in search page
            <div>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  'Search "milk"',
                  1000,
                  'Search "bread"',
                  1000,
                  'Search "sugar"',
                  1000,
                  'Search "butter"',
                  1000,
                  'Search "paneer"',
                  1000,
                  'Search "chocolate"',
                  1000,
                  'Search "chips"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "rice"',
                  1000,
                  'Search "egg"',
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            //when in search page
            <div>
              <input
                type="text"
                placeholder="Search for atta dal and more"
                autoFocus={true}
                id=""
                className="w-full min-w-[500px] lg:min-w[420px] h-10 rounded-lg  overflow-hidden flex items-center text-black bg-transparent outline-none"
                onChange={handleOnChange}
                defaultValue={searchText}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
