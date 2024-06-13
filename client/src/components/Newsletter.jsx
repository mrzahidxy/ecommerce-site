import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "35px" })}
`;

const Description = styled.p`
  font-size: 25px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "18px", textAlign: "center" })}
`;

const InputContrainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80vw" })}
`;

const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 10px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>NEWSLETTER</Title>
      <Description>Get updates on your favorite products.</Description>
      <InputContrainer>
        <Input placeholder="Write your mail!" />
        <Button>
          <SendIcon />
        </Button>
      </InputContrainer>
    </Container>
  );
};

export default Newsletter;
