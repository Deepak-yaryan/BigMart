import React, { useState } from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { toast } from 'react-toastify';

const Add = () => {
    const [form, setForm] = useState({});
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    let title,slug,desc,img,category,size,color,price,availaibleQty;
    title = form.title;
    slug = form.slug;
    desc = form.desc;
    img = "/" + form.img;
    category = form.category;
    size = form.size;
    color = form.color;
    price = form.price;
    availaibleQty = form.availaibleQty;

    const submitForm = async (e) => {
        e.preventDefault;
        // fetch api request to add a product
        let data = { title, slug, desc, img, category, size, color, price, availaibleQty };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([data])
        })
        let res = await a.json()
        console.log(res)
        if (res.success) {
            setForm({});
            toast.success("Product is Added");
          }
          else {
            toast.error("Some error occured while adding the product. Please check all the fields carefully and try again after Some time");
          }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <style>{`footer{ display: none;}`}</style>
                <FullLayout>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <BaseCard title="Add Product">
                                <Stack spacing={3}>
                                    <TextField onChange={onChange} name="title" value={form.title ? form.title : ""} label="Title" variant="outlined" />
                                    <TextField onChange={onChange} name="slug" value={form.slug ? form.slug : ""} label="Slug" variant="outlined" />
                                    <TextField onChange={onChange} name="desc" value={form.desc ? form.desc : ""} label="Description" multiline rows={4} />
                                    <TextField onChange={onChange} name="img" value={form.img ? form.img : ""} label="Image" variant="outlined" />
                                    <TextField onChange={onChange} name="category" value={form.category ? form.category : ""} label="Type" variant="outlined" />
                                    <TextField onChange={onChange} name="size" value={form.size ? form.size : ""} label="Size" type="text" variant="outlined" />
                                    <TextField onChange={onChange} name="color" value={form.color ? form.color : ""} label="Color" type="text" variant="outlined" />
                                    <TextField onChange={onChange} name="price" value={form.price ? form.price : ""} label="Price" type="text" variant="outlined" />
                                    <TextField onChange={onChange} name="availaibleQty" value={form.availaibleQty ? form.availaibleQty : ""} label="Quantity" type="text" variant="outlined" />
                                </Stack>
                                <br />
                                <Button onClick={submitForm} variant="outlined" mt={2} >
                                    Submit
                                </Button>
                            </BaseCard>
                        </Grid>
                    </Grid>
                </FullLayout>
            </ThemeProvider>
        </>
    )
}

export default Add