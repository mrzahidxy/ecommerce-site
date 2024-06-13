import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

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
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
`;

const LinkInfo = styled.a`
  font-size: 14px;
  font-weight: 200;
  margin: 5px 0;
  text-decoration: none;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  outline: none;
  align-self: center;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, isError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <Input
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Button onClick={(e) => handleClick(e)} disabled={isFetching}>
            Log In
          </Button>
          {isError && <Error>Somethings went wrong</Error>}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <LinkInfo>
              <Link style={{ textDecoration: "none", color: "black" }}> Forget Your Password?</Link>
            </LinkInfo>

            <Link to="/register"  style={{ textDecoration: "none", color: "black" }}>
              <LinkInfo>Creat An Account!</LinkInfo>
            </Link>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LogIn;
