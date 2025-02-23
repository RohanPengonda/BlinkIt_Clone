import React from "react";

const ProductCardAdmin = ({ data }) => {
  return (
    <div className="w-36 p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down"
        />
        <p className="text-eclipse line-clamp-2 font-medium">{data?.name}</p>
        <p className="text-slate-400">{data?.unit}</p>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
