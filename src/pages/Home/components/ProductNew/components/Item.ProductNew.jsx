import React from "react";
import { CiHeart } from "react-icons/ci";
import { formattedPrice } from "../../../../../utils/utils";
import { Link } from "react-router-dom";

const ItemProductNew = ({ main_image, name, price, brand, id }) => {
  return (
    <Link to={`product/${id}`} className="flex flex-col gap-2">
      <div>
        <img
          src={main_image}
          className="h-96 object-cover rounded-lg w-full hover:shadow-md hover:scale-90 transition-all duration-300"
          alt={name}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-gray-500">#{brand}</div>
        <div>
          <CiHeart size={20} />
        </div>
      </div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-price">{formattedPrice(price)}</p>
    </Link>
  );
};

export default ItemProductNew;
