import React, { useState } from "react";
import Announcement from "../components/Announcement";

import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const Title = styled.h1`
  margin: 20px;
  text-transform: capitalize;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ marginRight: "0px" })};
`;

const Select = styled.select`
  margin-left: 20px;
  padding: 10px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const cat = useLocation().pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("new");

  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };


  return (
    <>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select onChange={handleFilters} name="color">
            <Option disabled selected>
              Color
            </Option>
            <Option value="red">Red</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
          </Select>
          <Select onChange={handleFilters} name="size">
            <Option disabled selected>
              Size
            </Option>
            <Option>XL</Option>
            <Option>L</Option>
            <Option>M</Option>
            <Option>S</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={handleSort}>
            <Option disabled selected>
              Newest
            </Option>
            <Option value="asc">Low to High </Option>
            <Option value="desc">High to Low</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products cat={cat} sort={sort} filters={filters} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductList;
