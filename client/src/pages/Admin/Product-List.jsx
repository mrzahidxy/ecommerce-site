import React from "react";
import ProductList from "../../components/Admin/ProductList";
import AdminLayout from "../../components/layout/AdminLayout";

const ProductListPage = () => {
  return (
    <AdminLayout>
      <ProductList />
    </AdminLayout>
  );
};

export default ProductListPage;
