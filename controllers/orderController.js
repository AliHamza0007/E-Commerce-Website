import { OrderModel } from "../models/orderModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "confortzoneuk@gmail.com",
    pass: "kkwocpwjgmgyjdym",
  },
});

export const createOrderController = async (req, res) => {
  try {
    let order = await new OrderModel(req.body).save();

    if (order) {
      async function main() {
        const info = await transporter.sendMail({
          from: `${req.body.userEmail}`, // sender address
          // to: "hamzasarwer9@gmail.com", // list of receivers
          to: "zriaz9363@gmail.com", // list of receivers
          subject: "ConfortZone Order", // Subject line
          text: "New Ordered is Placed", // plain text body
          html: `<h3>
      New Order Is place  by ${req.body.username} Please Check it On Website </h3><h3>Name: ${req.body.username} </h3><h3>Email: ${req.body.userEmail} </h3><h3>Total_Price: ${req.body.totalPrice} </h3>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
      async function user() {
        const info = await transporter.sendMail({
          from: "confortzoneuk@gmail.com", // list of receivers
          to: `${req.body.userEmail}`, // reciver address
          // to: `hamzasarwer9@gmail.com`, // list of receivers

          subject: "ConfortZone Order Place", // Subject line
          text: `${req.body.username} Order is Placed`, // plain text body
          html: `<h3>
     Your Order Is Placed .Now We Start Processing & Working On Your Order</h3><h3>Thanks For Choose Best PlatForm ConfortZone which Provide a comfort Not Products</h3><h3> ${req.body.username} </h3><h3> ${req.body.userEmail} </h3>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
      }

      user().catch(console.error);

      res.status(201).send({
        success: true,
        message: " Thanks For Order & Processing to delivery ASAP",
        order,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in creating order", error });
  }
};

//specfic user orders get
export const getOrderController = async (req, res) => {
  try {
    const { userId } = req.params;
    let order = await OrderModel.find(userId).sort({
      createdAt: -1,
    });
    // console.log(order);
    if (order) {
      res.status(201).send({ success: true, message: " Get Order ", order });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in creating order", error });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    let order = await OrderModel.find({}).sort({ createdAt: -1 });
    if (order) {
      res
        .status(201)
        .send({ success: true, message: " Get All Order ", order });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in getting All order", error });
  }
};

export const deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    let orderUser = await OrderModel.findById(id);
    let order = await OrderModel.findByIdAndDelete(id);
    // console.log(order);
    if (order) {
      async function main() {
        const info = await transporter.sendMail({
          from: "confortzoneuk@gmail.com", // sender address
          to: `${orderUser.userEmail}`, // list of receivers
          // to: `hamzasarwer9@gmail.com`, // list of receivers

          subject: "ConfortZone", // Subject line
          text: "Your Ordered is Deleted", // plain text body
          html: `<h2>
     Your Order is Removed. Why You Remove Your Order Share With Me </h2><h2> Wish  to Buy Comfort Furniture Beds and other categories From Us </h2>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
      res.status(201).send({ success: true, message: " Deleted Order" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in deleing Order", error });
  }
};

export const updateOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let orderUser = await OrderModel.findById(id);

    let order = await OrderModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    // console.log(order);
    if (order) {
      async function main() {
        const info = await transporter.sendMail({
          from: "confortzoneuk@gmail.com", // sender address
          to: `${orderUser.userEmail}`, // list of receivers
          // to: `hamzasarwer9@gmail.com`, // list of receivers
          subject: "ConfortZone", // Subject line
          text: "Ordered status Update", // plain text body
          html: `<h2>
     Your Order status is Updated by ConfortZone Admin</h2><h2>${orderUser.username} Check Your Status On ConfortZone Website</h2>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
      res
        .status(201)
        .send({ success: true, message: " Update Order & Processing" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in updating order", error });
  }
};

export const searchOrderController = async (req, res) => {
  try {
    const { value } = req.params;
    let order = await OrderModel.find({
      $or: [
        { username: { $regex: value } },
        { userEmail: { $regex: value } },
        { status: { $regex: value } },
        { color: { $regex: value } },
        { size: { $regex: value } },
      ],
    }).sort({ createdAt: -1 });

    // console.log(order);
    if (order) {
      res.status(200).send({ success: true, message: " search Order", order });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in searching order", error });
  }
};
