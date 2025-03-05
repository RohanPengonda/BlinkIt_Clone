import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();

  const [openAddress, setOpenAddress] = useState(false);

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full justify-between gap-5 ">
        <div className="w-full">
          {/* address  */}
          <h3 className="text-lg font-semibold">Choose Address:</h3>
          <div
            onClick={() => setOpenAddress(true)}
            className="h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer"
          >
            Add Address
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          {/* summary payment details  */}

          <h3 className="text-lg font font-semibold">Payment Summary:</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Total Amount:</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Total Quantity :</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charges:</p>
              <p className="flex items-center gap-2 font-bold">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-600 hover:text-green-700 text-white rounded font-semibold">
              Online Payment
            </button>
            <button className="py-2 px-4 border-2 border-green-600 text-green-600 hover:bg:green-500 hover:text-white font-semibold">
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
