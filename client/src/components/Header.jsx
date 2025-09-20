import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

const Header = () => {
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  //console.log("User from store", user);

  const [isMobile] = useMobile();
  //console.log("isMobile", isMobile);

  const location = useLocation();
  //console.log("location", location);

  const [isSearchPage, setIsSearchPage] = useState(false);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const handleMobileLoginUser = () => {
    navigate("/user");
  };

  //console.log("search", isSearchPage);

  const cartItem = useSelector((state) => state?.cartItem.cart);

  //console.log("cartItem:", cartItem);

  //total item and total price
  const [totalQtyItem, setTotalQtyItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalQty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQtyItem(totalQty);

    const totalP = cartItem.reduce((preve, curr) => {
      return (
        preve +
        pricewithDiscount(curr.productId.price, curr.productId.discount) *
          curr.quantity
      );
    }, 0);
    setTotalPrice(totalP);
  }, [cartItem]);

  return (
    <>
      <header className="h-28 lg:h-20 lg:shadow-md sticky top-0 z-40 bg-white">
        <div className="container mx-auto flex items-center lg:h-20 h-15 px-2 justify-between">
          {/*logo*/}
          <div className="lg:h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo2}
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
            {/*User Icon only in Mobile Version */}
            {user?._id ? (
              <button className="text-neutral-800 lg:hidden">
                <FaRegUserCircle size={30} onClick={handleMobileLoginUser} />
              </button>
            ) : (
              <button className="text-neutral-800 lg:hidden">
                <FaRegUserCircle size={30} onClick={redirectToLoginPage} />
              </button>
            )}

            {/*For Desktop Version */}
            <div className="hidden lg:flex items-center gap-10 justify-center ">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex items-center gap-1 cursor-pointer select-none"
                  >
                    <p>Account </p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}

              {/*h-14 w-28*/}
              <button className="bg-green-700 hover:bg-green-600 rounded flex justify-center items-center text-white px-3 py-2 gap-2">
                <div className="flex items-center">
                  {/*add to cart icon*/}
                  <div>
                    <BsCart4 size={26} className="hover:animate-bounce" />
                  </div>
                  <div className="font-semibold">
                    {cartItem[0] ? (
                      <div>
                        <p>{totalQtyItem} Items</p>
                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                      </div>
                    ) : (
                      <p>My Cart</p>
                    )}
                    {/* <p>1 items</p>
                    <p>total price</p> */}
                  </div>
                </div>
              </button>
            </div>
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
