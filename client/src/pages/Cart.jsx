import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import styled from "styled-components";

import { mobile } from "../responsive";
import { useSelector } from "react-redux/es/hooks/useSelector";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  clearCart,
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from "../redux/cartReducer";
import ClientLayout from "../components/layout/ClientLayout";
import useAxiosInstances from "../requestMethod";


const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`;

const TopText = styled.span`
  text-decoration: underline;
  margin: 0 10px;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: " 10px" })};
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: " 20px" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
`;

const Cart = () => {
  const key =
    "pk_test_51LYYjtE3f7z3X8dphqRDYL7Qu6RtpFgQogUTvuGmAMDXD30BzFzycBEoyVqgMLTR2KZhYpgp9CPbJ5kk7saBae3700sXRqG6kZ";
  const { products, price, total } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const [stripeToken, setStripeToken] = useState("");
  const dispatch = useDispatch();

  const {privateRequest} = useAxiosInstances()

  const onToken = (token) => {
    setStripeToken(token);
  };

  //payment
  const makePayment = async () => {
    try {
      const res = await axios.post(
        "https://ecommerce-mern-api.vercel.app/api/checkout/payment",
        {
          tokenId: stripeToken.id,
          amount: total,
        }
      );
      console.log("payment", res.data);
      makeOrder();
      history.push("/paySuccess");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stripeToken && makePayment();
  }, [stripeToken]);

  //create a order
  useEffect(() => {
    const collection = [];
    products.map(({ _id, quantity }) =>
      collection.push({ productId: _id, quantity: quantity })
    );
    setOrders(collection);
  }, []);

  const makeOrder = async () => {
    try {
      const res = await privateRequest.post(
        `orders`,
        {
          userId: user?._id,
          products: orders,
          amount: total,
          address: { city: "Dhaka" },
          status: "pending",
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      dispatch(clearCart());
      console.log("order", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientLayout>
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>SHOPPING BAG (2)</TopText>
            <TopText>YOUR WISHLIST (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
          <Info>
            {products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img}></Image>
                  <Details>
                    <ProductName>
                      <b>PRODUCT:</b> {product.title}
                    </ProductName>
                    <ProductName>
                      <b>PRICE:</b> {product.price}
                    </ProductName>
                    {/* <ProductId>{product._id}</ProductId> */}
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>SIZE :</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ActionButton
                      onClick={() => dispatch(increaseProduct(product))}
                    >
                      {/* <Add /> */}
                    </ActionButton>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <ActionButton
                      onClick={() => dispatch(decreaseProduct(product))}
                    >
                      {/* <Remove /> */}
                    </ActionButton>
                  </ProductAmountContainer>
                  <ActionButton
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    {/* <Delete /> */}
                  </ActionButton>

                  <ProductPrice> {price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice> $ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimsted Shipping</SummaryItemText>
              <SummaryItemPrice> $ 10 </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ {(total / 10000) * 5}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $ {total + 10 - (total / 10000) * 5}
              </SummaryItemPrice>
            </SummaryItem>
            {stripeToken ? (
              <span> Processing... please wait!</span>
            ) : (
              <StripeCheckout
                name="Procharok Shop"
                billingAddress
                shippingAddress
                // description={total}
                amount={total}
                token={onToken}
                stripeKey={key}
              >
                <Button>Checkout Now</Button>
              </StripeCheckout>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      </ClientLayout>
  );
};

export default Cart;
