import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";

import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";

import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartReducer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../components/layout/Navbar";
import ClientLayout from "../components/layout/ClientLayout";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "10px" })};
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Img = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "50vh" })};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  margin: 20px 0;
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  ${mobile({ width: "100%" })};
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterText = styled.span`
  font-weight: 200;
  font-size: 20px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: ${(props) => props.color};
`;

const FilterSize = styled.select`
  margin-left: 5px;
  padding: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ width: "100%" })};
`;

const AmmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Ammount = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid teal;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const Button = styled.div`
  border: 2px solid teal;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Link = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.currentUser);

  const location = useLocation();
  //fetching product based on id
  const id = useLocation().pathname.split("/")[2];
  const getProduct = () => {
    publicRequest
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data));
  };
  useEffect(() => {
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleCLick = () => {
    dispatch(addProduct({ ...product, quantity, size, color }));
  };

  return (
<ClientLayout>


      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Img src={product.img}></Img>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price} $ </Price>
          <FilterContainer>
            <Filter>
              <FilterText>Color: </FilterText>
              {product.color?.map((c) => (
                <FilterColor
                key={c}
                  color={c}
                  onClick={() => setColor(c)}
                ></FilterColor>
              ))}
            </Filter>
            <Filter>
              <FilterText>Size: </FilterText>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((item) => (
                  <FilterSizeOption key={item}>{item}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          {/* <AddContainer>
            <AmmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Ammount>{quantity}</Ammount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmmountContainer>
            <Button onClick={handleCLick} data-tip data-for="toolTip">
              Add to Cart
            </Button>
          </AddContainer> */}
          <Link
            href={`https://wa.me/1623920049?text=http://localhost:300/${location?.pathname}%20Want%20to%20buy`}
          >
            <WhatsAppIcon /> Message to buy
          </Link>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
      </ClientLayout>
  );
};

export default Product;
