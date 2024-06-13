import React from "react";
import styled from "styled-components";

const Sidebar = () => {
  const Container = styled.div`
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #555;
    font-weight: 500;
    text-decoration: none;
  `;

  const Menu = styled.a`
    padding: 10px;
    cursor:pointer;
    text-decoration: none;
    color: black;
    &:hover {
      color: red; // <Thing> when hovered
    }
  
  `;

  const data = [
    {
      title: "Home",
      link: "/admin",
      id: 1,
    },
    {
      title: "Product",
      link: "/admin/product",
      id: 2,
    },
    {
      title: "Orders",
      link: "/admin",
      id: 3,
    },
  ];


  return (
    <Container>
      <Wrapper>
        {data?.map((item) => (
          <Menu href={item?.link} key={item.id}>{item?.title}</Menu>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
