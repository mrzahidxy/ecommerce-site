import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import AdminLayout from "../layout/AdminLayout";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const initialFormValues = {
  title: "",
  desc: "",
  price: "",
  color: "",
  size: "",
  inStock: false,
};

const initialErrors = {
  title: "",
  desc: "",
  price: "",
  color: "",
  size: "",
};


const ProductForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [barOpen, setBarOpen] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    let tempErrors = { ...initialErrors };
    if (!formValues.title) tempErrors.title = "Title is required.";
    if (!formValues.desc) tempErrors.desc = "Description is required.";
    if (!formValues.price) tempErrors.price = "Price is required.";
    if (!formValues.color) tempErrors.color = "Color is required.";
    if (!formValues.size) tempErrors.size = "Size is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("Form Values:", formValues);
      setBarOpen(true);
      // Add your submit logic here
    }
  };

  return (
    <AdminLayout>
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            {["title", "desc", "price"].map((field) => (
              <FormControl key={field} fullWidth margin="normal"  error={!!errors[field]}>
                <TextField
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  value={formValues[field]}
                  onChange={handleChange}
                />
              </FormControl>
            ))}
            {[
              { name: "color", label: "Color", options: ["red", "blue", "black"] },
              { name: "size", label: "Size", options: ["s", "l", "xl"] },
            ].map(({ name, label, options }) => (
              <FormControl key={name} variant="outlined" margin="normal"  error={!!errors[name]}>
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                  labelId={`${name}-label`}
                  id={name}
                  name={name}
                  value={formValues[name]}
                  onChange={handleChange}
                  label={label}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <FormControl margin="normal">
              <Switch
                name="inStock"
                checked={formValues.inStock}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Form>
        </CardContent>
      </Card>

      <Snackbar
        open={barOpen}
        autoHideDuration={6000}
        message="Created Successfully"
        onClose={() => setBarOpen(false)}
      />
    </AdminLayout>
  );
};

export default ProductForm;
