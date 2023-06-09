import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import AllProducts from "../../src/components/dashboard/AllProducts";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Product from '@/models/Product';
import mongoose from 'mongoose';

export default function Index({products}) {
  return (
    <ThemeProvider theme={theme}>
      <style>{`footer{ display: none;}`}</style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
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