import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { persistor } from "../../redux/store";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SeacrhContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginRight: "5px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "15px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MenuItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const handleLogOut = () => {
    persistor.purge();
    window.location.reload(false);
  };


  const userProfile = user?.isAdmin ? "/admin" : "/profile";

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>En</Language>
          <SeacrhContainer>
            <Input placeholder="search" />
            <SearchIcon style={{ fontSize: 16, color: "gray" }} />
          </SeacrhContainer>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>Procharok</Logo>
          </Link>
        </Center>

        <Right>
          {user ? (
            <>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <Tooltip title="Log Out">
                    <ExitToAppIcon />
                  </Tooltip>
                </MenuItem>
              </Link>

              <Link
                to={userProfile}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>
                  <span> {user?.username} </span>

                  <AccountCircleIcon />
                </MenuItem>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <RightWrapper>
                <AccountCircleIcon />
                <MenuItem>LOG IN</MenuItem>
              </RightWrapper>
            </Link>
          )}

          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "black" }}
            data-tip
            data-for="registerTip"
          >
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Tooltip title="Cart">
                  <ShoppingCartIcon />
                </Tooltip>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
