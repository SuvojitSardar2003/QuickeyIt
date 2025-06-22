import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  console.log("isMobile", isMobile);

  const location = useLocation();
  //console.log("location", location);

  const [isSearchPage, setIsSearchPage] = useState(false);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  console.log("search", isSearchPage);

  return (
    <>
      <header className="h-25 lg:h-20 lg:shadow-md sticky top-0 bg-red-500 ">
        <div className="container mx-auto flex items-center lg:h-20 h-13 px-2 justify-between">
          {/*logo*/}
          <div className="lg:h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/*search*/}
          <div className="hidden lg:block">
            <SearchBar></SearchBar>
          </div>
          {/*login and my cart*/}
          <div>
            <button className="text-neutral-800 lg:hidden">
              <FaRegUserCircle size={30} />
            </button>
            <div className="hidden lg:block">Login and my cart</div>
          </div>
        </div>

        <div className="lg:hidden h-10 container mx-auto px-2">
          <SearchBar></SearchBar>
        </div>
      </header>
      {/*<div>Header</div>;*/}
    </>
  );
};

export default Header;
