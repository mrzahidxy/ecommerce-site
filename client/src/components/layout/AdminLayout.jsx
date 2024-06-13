import React from "react";

import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Container = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 20%;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow: auto;
`;

const AdminLayout = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();



  if (!currentUser?.isAdmin) return history.push("/");

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default AdminLayout;
