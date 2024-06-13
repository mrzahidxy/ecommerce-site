import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../src/pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Cart from "./pages/Cart";
import Pay from "./pages/Pay";
import PaySuccess from "./pages/PaySuccess";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Admin/Dashboard";
import ProductListPage from "./pages/Admin/Product-List";
import ProductCreatePage from "./pages/Admin/Product-create";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/product" component={ProductListPage} />
        <Route path="/admin/product/add" component={ProductCreatePage} />
        <Route path="/products/:category" component={ProductList} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route
          path="/logIn"
          render={() =>
            !user ? (
              <LogIn />
            ) : user?.currentUser?.isAdmin ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/register"
          render={() => (user ? <Redirect to="/" /> : <Register />)}
        />
        <Route
          path="/profile"
          render={() => (user ? <Profile /> : <Redirect to="/" />)}
        />
        <Route path="/pay" component={Pay} />
        <Route path="/paysuccess" component={PaySuccess} />
      </Switch>
    </Router>
  );
};

export default App;
