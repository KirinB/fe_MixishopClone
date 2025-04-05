import React from "react";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const ImageProductHomePage = () => {
  return (
    <div>
      <Link to={pathDefault.homePage}>
        <img className="w-full rounded-xl" src="/imgtext_1_img.jpg" />
      </Link>
    </div>
  );
};

export default ImageProductHomePage;
