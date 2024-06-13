import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import AddIcon from "@mui/icons-material/Add";
import { Button, Link } from "@mui/material";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductList = () => {
  let history = useHistory();
  const [page, setPage] = React.useState(1);

  // console.log(history)
  const res = useFetch(`http://localhost:8080/api/products?page=${page}`);

  const pageChange = (event, page) => {
    setPage(page);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Typography color="text.primary">Product</Typography>
      </Breadcrumbs>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/admin/product/add");
          }}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res?.data?.data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={300}>{row.title}</TableCell>
                <TableCell width={400}>{row.desc}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.inStock}</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2}>
        <Pagination count={10} onChange={pageChange} page={page} />
      </Stack>
    </Container>
  );
};

export default ProductList;
