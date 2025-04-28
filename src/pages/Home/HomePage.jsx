import React from "react";
import HeroHomePage from "./components/Hero.HomePage";
import CollectionsHomePage from "./components/Collections.HomePage";
import ListProductHomePage from "./components/ListProduct.HomePage";
import ImageProductHomePage from "./components/ImageProduct.HomePage";
import CustomerTestimonialsHomePage from "./components/CustomerTestimonials.HomePage";
import { pathDefault } from "../../common/path";
import { Link } from "react-router-dom";
import InstagramHomePage from "./components/Instagram.HomePage";

const HomePage = () => {
  return (
    <>
      <div className="container space-y-16">
        <HeroHomePage />
        <CollectionsHomePage />
        <ListProductHomePage />
        <ImageProductHomePage />
      </div>
      <CustomerTestimonialsHomePage />
      <div className="container space-y-16 pb-10">
        <Link to={pathDefault.homePage}>
          <img src="/imgtext_2_img.jpg" alt="" className="w-full rounded-lg" />
        </Link>
        <InstagramHomePage />
      </div>
    </>
  );
};

export default HomePage;
