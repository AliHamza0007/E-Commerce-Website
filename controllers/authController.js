import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// resgistertaion
export const userRegisterController = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      phone,
      resetToken,
      postalCode,
      answer,
      address,
    } = req.body;

    if (!resetToken) {
      return res.send({ message: "Reset Token is Required" });
    }
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!postalCode) {
      return res.send({ message: "Postal Code is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (password.length < 8) {
      return res.send({ message: "password Al_least 8 characters" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }
    //for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "Already Registered please Login" });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save new user
    let userSave = await new userModel({
      name,
      password: hashedPassword,
      email,
      phone,
      answer,
      postalCode,
      resetToken,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      userSave,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Problem in Registration", error });
  }
};

// resgistertaion;

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid Email & Password", error });
    }

    //validation check
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email",
      });
    }

    let matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "invalid Password",
      });
    }
    //token gerate
    let token = await jwt.sign({ _id: user._id }, process.env.JWT_Token, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        postalCode: user.postalCode,
        resetToken: user.resetToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Problem in Login", error });
  }
};

export const tokenRequireController = async (req, res) => {
  res.send("Protected route by token successful");
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, confirmPassword, answer } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!confirmPassword) {
      res.status(400).send({ message: "Password is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    //check
    let existUser = await userModel.findOne({ email, answer });
    if (!existUser) {
      res
        .status(404)
        .send({ success: false, message: "Invalid Email or Answer" });
    }
    const PasswordHashing = await hashPassword(confirmPassword);
    await userModel.findByIdAndUpdate(existUser._id, {
      password: PasswordHashing,
    });
    res
      .status(200)
      .send({ success: true, message: "Password Reset Successfully " });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something went wrong", error });
  }
};
// 88888888888reset bu code token when genrated registerd
export const resetPasswordController = async (req, res) => {
  try {
    const { email, confirmPassword, token } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!confirmPassword) {
      res.status(400).send({ message: "Password is required" });
    }
    if (!token) {
      res.status(400).send({ message: "token is required" });
    }
    //check
    let existUser = await userModel.findOne({ email, resetToken: token });
    if (!existUser) {
      res
        .status(404)
        .send({ success: false, message: "Invalid Email or ResetToken" });
    }
    const PasswordHashing = await hashPassword(confirmPassword);
    await userModel.findByIdAndUpdate(existUser._id, {
      password: PasswordHashing,
    });
    res
      .status(201)
      .send({ success: true, message: "Password Reset Successfully " });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something went wrong", error });
  }
};

export const userUpdateController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, password, phone, address, postalCode } = req.body;

    if (password && password.length < 8) {
      return res.status(201).send({
        success: false,
        message: "Password must be At-least 8 Words",
      });
    }
    //password hash if have password
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const ExistUser = await userModel.findById(id);
    //update  user
    let updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name || ExistUser.name,
        password: hashedPassword || ExistUser.password,
        phone: phone || ExistUser.phone,
        address: address || ExistUser.address,
        postalCode: postalCode || ExistUser.postalCode,
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: `Update ${updateUser.name} Successfully`,
      updateUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in Updating user", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.find({}).sort({ createdAt: -1 });
    if (result) {
      res
        .status(201)
        .send({ success: true, message: "Get users Successfully", result });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error, success: false, message: "Error in get All Users" });
  }
};
export const getSingleUsers = async (req, res) => {
  try {
    const result = await userModel.findById(req.params.id);
    if (result) {
      res.status(201).send({
        success: true,
        message: `Get ${result.name} Successfully`,
        result,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error, success: false, message: "Error in get Single Users" });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await userModel
      .find({
        $or: [
          { name: { $regex: keyword } },
          { email: { $regex: keyword } },
          { phone: { $regex: keyword } },
          { address: { $regex: keyword } },
        ],
      })
      .sort({ createdAt: -1 });
    if (result) {
      res
        .status(201)
        .send({ success: true, message: "Get users Successfully", result });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error, success: false, message: "Error in Searching Users" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const role = await userModel.findById(req.params.id);
    if (role?.role === 0) {
      const result = await userModel.findByIdAndDelete(req.params.id);
      if (result) {
        res.status(201).send({
          success: true,
          message: `${result.name} Deleted SuccessFully`,
        });
      }
    } else {
      res.status(200).send({ success: true, message: "Admin Can't Delete" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error, success: false, message: "Error in deleting Users" });
  }
};
