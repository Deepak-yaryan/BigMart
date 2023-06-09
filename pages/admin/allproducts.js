import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from '@/models/Product';
import mongoose from 'mongoose';

const Allproducts = ({products}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <style>{`footer{ display: none;}`}</style>
                <FullLayout>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <AllProducts products={products} />
                        </Grid>
                    </Grid>
                </FullLayout>
            </ThemeProvider>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.mongoURI)
        console.log("Connected to Mongo Succesfully");
    }
    let products = await Product.find()
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
      }
}

export default Allproducts