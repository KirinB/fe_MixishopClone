import React from "react";
import HeroHomePage from "./components/Hero.HomePage";
import CollectionsHomePage from "./components/Collections.HomePage";
import ListProductHomePage from "./components/ListProduct.HomePage";
import ImageProductHomePage from "./components/ImageProduct.HomePage";

const HomePage = () => {
  return (
    <main className="container space-y-16 pb-10">
      <HeroHomePage />
      <CollectionsHomePage />
      <ListProductHomePage />
      <ImageProductHomePage />
    </main>
  );
};

export default HomePage;
