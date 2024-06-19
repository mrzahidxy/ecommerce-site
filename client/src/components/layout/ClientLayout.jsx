import React from "react";

import styled from "styled-components";
import Navbar from "./Navbar";
import Announcement from "../Announcement";

const Container = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow: auto;
`;

const ClientLayout = ({ children }) => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <ContentWrapper>
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default ClientLayout;
