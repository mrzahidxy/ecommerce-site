import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px; ;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  width: 50%;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  margin-bottom: 10px;
  ${mobile({ backgroundColor: "fff8f8" })};
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>PROCHAROK</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999">
            {/* <Facebook></Facebook> */}
          </SocialIcon>
          <SocialIcon color="#E4405F">
            {/* <Instagram></Instagram> */}
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            {/* <Twitter></Twitter> */}
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>USEFUL LINKS</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>CONTACT</Title>
        <ContactItem>Vatara, Dhaka-1212</ContactItem>
        <ContactItem>+8801783798673</ContactItem>
        <ContactItem>mrzahidxy@gmail.com</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
