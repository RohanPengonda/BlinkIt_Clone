import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaCaretRight, FaCartShopping } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();

  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="px-2 py-1 bg-green-500 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden">
            {/* left side  */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit ">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} Items </p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            {/* Right side */}
            <Link to={"/cart"} className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
