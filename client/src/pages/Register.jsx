import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { mobile } from "../responsive";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import useAxiosInstances from "../requestMethod";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
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
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0 0;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
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
  font-size: 16px;
`;

const Register = () => {
  // const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  const handleUser = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const history = useHistory();
  // console.log("user", user);

  const {publicRequest} = useAxiosInstances()

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, email, confirmPassword } = user;

    const errors = [];
    if (!username.trim()) errors.push("Username is required");
    if (!email.trim()) errors.push("Email is required");
    if (!password.trim()) errors.push("Password is required");
    // if (!confirmPassword.trim()) errors.push("Confirm Password is required");
    if (password !== confirmPassword) errors.push("Passwords do not match");

    if (errors.length) {
      setError(errors.join("" + ", "));
      return;
    }

    setError("");

    try {
      const res = await publicRequest.post("auth/register", {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        setOpen(true);
        history.push("/login");
      }
    } catch (error) {
      console.log(error?.error);
    }
  };

  return (
    <Container>
      <Snackbar
        severity="success"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        autoHideDuration={5000}
        message="Yoa are successfully registered!"
      />
      ;
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Error>{error && error}</Error>
        <Form>
          <Input
            placeholder="User Name"
            name="username"
            value={user.username}
            onChange={handleUser}
          ></Input>
          <Input
            placeholder="Email Id"
            name="email"
            value={user.email}
            onChange={handleUser}
          ></Input>
          <Input
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleUser}
          ></Input>
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleUser}
          ></Input>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
