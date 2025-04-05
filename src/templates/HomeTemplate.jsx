import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHomeTemplte from "./components/Header.HomeTemplte";
import FooterHomeTemplate from "./components/Footer.HomeTemplate";

const HomeTemplate = () => {
  return (
    <>
      <HeaderHomeTemplte />
      <Outlet />
      <FooterHomeTemplate />
    </>
  );
};

export default HomeTemplate;
