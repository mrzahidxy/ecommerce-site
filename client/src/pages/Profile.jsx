import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { mobile } from "../responsive";
import ClientLayout from "../components/layout/ClientLayout";
import useAxiosInstances from "../requestMethod";

const Conatiner = styled.div`
  height: 90vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80vw;
  padding: 20px;

  display: flex;
  gap: 50px;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: #4bb543;
`;

const ProfileContainer = styled.div`
  background-color: #fff;
  flex: 1;
  padding: 20px 40px;
  height: 40vh;
`;

const Text = styled.h3`
  font-size: 16px;
  font-weight: 400;
`;

const OrderContainer = styled.div`
  background-color: #fff;
  flex: 2;
  padding: 20px;
`;

const Orders = styled.div`
  height: 70vh;
  overflow-y: scroll;
  margin-top: 20px;
`;

const Order = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  margin: 20px;
`;

const OrderText = styled.h3`
  font-size: 16px;
  font-weight: 400;
`;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const {privateRequest} = useAxiosInstances()

  const orderHistory = async () => {
    try {
      const res = await privateRequest.get(`orders/find/${currentUser?._id}`, {
        headers: {
          token: `Bearer ${currentUser.accessToken}`,
        },
      });
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    orderHistory();
  }, []);

  return (
    <ClientLayout>
      <Wrapper>
        <ProfileContainer>
          <Title>User Profile</Title>
          <Text>Username: {currentUser?.username}</Text>
          <Text>Email: {currentUser?.email}</Text>
        </ProfileContainer>
        <OrderContainer>
          <Title>Order History</Title>
          <Orders>
            {orders.map((order) => (
              <Order key={order._id}>
                <OrderText>Order Id: {order._id}</OrderText>
                <OrderText>Amount: {order.amount} Taka</OrderText>
                {order.products.map((product) => (
                  <div key={product.productId}>
                    <OrderText>Product Id: {product.productId}</OrderText>
                    <OrderText>Quantity: {product.quantity}</OrderText>
                  </div>
                ))}
              </Order>
            ))}
          </Orders>
        </OrderContainer>
      </Wrapper>
    </ClientLayout>
  );
};

export default Profile;
