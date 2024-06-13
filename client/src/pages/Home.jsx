import React from "react";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import ClientLayout from "../components/layout/ClientLayout";

const Home = () => {
  return (
    <>
      <Announcement />
      <ClientLayout>
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
      </ClientLayout>
    </>
  );
};

export default Home;
