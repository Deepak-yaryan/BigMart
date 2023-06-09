import React from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TableContainer,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const Allorders = ({ orders }) => {
    return (
        <BaseCard title="All orders">
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                    display: "block", position: "relative", overflow: "auto",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Order Id/ Payment Id
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Address
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Amount
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6">
                                Payment Status/ Delivery Status
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }} align="left"
                                >
                                    {order.name}
                                    <br></br>
                                    {order.email}
                                    <br></br>
                                    {order.phone}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }} align="left"
                                >
                                    {order.orderId}/{order.paymentId}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                }} align="left">{order.address}<br></br>{order.city}<br></br>{order.state}<br></br>{order.pincode}<br></br>{order.phone}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                }} align="left">₹{order.amount}.00 INR</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }} align="right"
                                >
                                    {order.status}/{order.deliveryStatus}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default Allorders;
