import React, { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../layout/AdminLayout";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import useAxiosInstances from "../../requestMethod";
import { styled as MuiStyled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = MuiStyled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [errors, setErrors] = useState(initialErrors);

  console.log(formValues)

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files && files[0] : value,
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

  const { privateRequest } = useAxiosInstances();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const Formdata = new FormData();

      Formdata.append("title", formValues.title);
      Formdata.append("desc", formValues.desc);
      Formdata.append("price", formValues.price);
      Formdata.append("color", formValues.color);
      Formdata.append("size", formValues.size);
      Formdata.append("inStock", formValues.inStock);
      Formdata.append("image", formValues.image);

      privateRequest.post("/products/", Formdata);
    }
  };

  return (
    <AdminLayout>
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <h2>Create Product</h2>

          <Form onSubmit={handleSubmit}>
            {["title", "desc", "price"].map((name) => (
              <FormControl key={name} margin="normal">
                <TextField
                  name={name}
                  label={name[0].toUpperCase() + name.substring(1)}
                  variant="outlined"
                  value={formValues[name]}
                  onChange={handleChange}
                  error={Boolean(errors[name])}
                  helperText={errors[name]}
                />
              </FormControl>
            ))}

            <FormControl key="image" margin="normal">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleChange}
              >
                Upload file
                <VisuallyHiddenInput type="file" name="image" />
              </Button>
            </FormControl>

            {[
              {
                name: "color",
                label: "Color",
                options: ["red", "blue", "black"],
              },
              { name: "size", label: "Size", options: ["s", "l", "xl"] },
            ].map(({ name, label, options }) => (
              <FormControl
                key={name}
                variant="outlined"
                margin="normal"
                error={!!errors[name]}
              >
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                  labelId={`${name}-label`}
                  id={name}
                  name={name}
                  value={formValues[name]}
                  onChange={handleChange}
                  label={label}
                  error={!!errors[name]}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[name] && (
                  <FormHelperText>{errors[name]}</FormHelperText>
                )}
              </FormControl>
            ))}
            <FormControl margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    name="inStock"
                    checked={formValues.inStock}
                    onChange={handleChange}
                  />
                }
                label="In Stock"
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ProductForm;
