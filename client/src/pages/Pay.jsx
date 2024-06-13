import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
`;



const key =
  "pk_test_51LYYjtE3f7z3X8dphqRDYL7Qu6RtpFgQogUTvuGmAMDXD30BzFzycBEoyVqgMLTR2KZhYpgp9CPbJ5kk7saBae3700sXRqG6kZ";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState("");

  const onToken = (token) => {
    setStripeToken(token);
  };

  const makeRequest = async () => {
    try {
      const res = await axios.post(
        "https://ecommerce-mernapi.herokuapp.com/api/checkout/payment",
        {
          tokenId: stripeToken.id,
          amount: 2000,
        }
      );
      console.log(res.data);
      history.push("/paySuccess");
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();

  useEffect(() => {
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <Container>
      <Wrapper>
        <Title>Payment</Title>
        {stripeToken ? (
          <span> Processing... please wait!</span>
        ) : (
          <StripeCheckout
            name="Procharok Shop"
            billingAddress
            shippingAddress
            description="Your total is $20"
            amount={200}
            token={onToken}
            stripeKey={key}
          >
            <button>Pay</button>
          </StripeCheckout>
        )}
      </Wrapper>
    </Container>
  );
};

export default Pay;
