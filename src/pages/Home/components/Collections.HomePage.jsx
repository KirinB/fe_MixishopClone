import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../store/slice/categories.slice";

const CollectionsHomePage = () => {
  const { data: collections } = useSelector((state) => state.categoriesSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="">
      <h2 className="text-3xl uppercase text-center mb-10">đồ hiệu mixi</h2>
      <div className="grid grid-cols-6">
        {collections.map((item) => {
          return (
            <Link
              to={`/categories/${item.id}`}
              key={item.id}
              className="flex flex-col items-center hover:scale-110 transition-all duration-300"
            >
              <div className="rounded-full">
                <img
                  src={item.image}
                  alt=""
                  className="rounded-full w-44 h-44"
                />
              </div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.product_count} sản phẩm
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsHomePage;
