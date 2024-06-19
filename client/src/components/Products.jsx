import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })};
`;

const Title = styled.h1`
  text-transform: capitalize;
  font-size: 30px;
  font-weight: 500;
`;

const Products = ({ sort, filters, cat, limit=10 }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const endpoint = `${process.env.REACT_APP_BASE_URL
      }/products?category=${cat ?? ""}&page=1&limit=${limit}&color=${filters?.color ?? ""
      }&size=${filters?.size ?? ""}&sortBy=price&sortOrder=${sort ?? "desc"}`;
    try {
      const response = await axios.get(endpoint);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sort]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Wrapper>
      <Title>{cat ? cat : "All Products"}</Title>
      <Container>
        {products.length > 0 ? products?.map((item) => (
          <div key={item._id}>
            <Product item={item} />
          </div>
        )) : <span>No products found</span>}
      </Container>
    </Wrapper>
  );
};

export default Products;
