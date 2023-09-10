// import { OrderModel } from "../models/order-model.js";
export const createOrder = async (req, res) => {
  const {
    ordernumber,
    customeremail,
    customerphone,
    customeraddress,
    orderstatus,
    orderdate,
    orderitems,
    productname,
    productprice,
    productquantity,
    productsubtotal,
    ordertotal,
  } = req.body;
  try {
    const newOrder = await OrderModel.create({
      ordernumber,
      customeremail,
      customerphone,
      customeraddress,
      orderstatus,
      orderdate,
      orderitems,
      productname,
      productprice,
      productquantity,
      productsubtotal,
      ordertotal,
    });
    return res.status(200).json({
      customeremail: newOrder.customeremail,
      customeraddress: newOrder.customeraddress,
      ordertotal: newOrder.ordertotal,
      orderdate: newOrder.orderdate,
      orderstatus: newOrder.orderstatus,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
