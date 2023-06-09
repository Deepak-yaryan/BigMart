import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Allorder from '@/src/components/dashboard/AllOrders';
import Order from '@/models/Order';
import mongoose from 'mongoose';

const Allorders = ({orders}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <style>{`footer{ display: none;}`}</style>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <Allorder orders={orders}/>
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
  let orders = await Order.find()
  return {
      props: { orders: JSON.parse(JSON.stringify(orders)) }
    }
}

export default Allorders