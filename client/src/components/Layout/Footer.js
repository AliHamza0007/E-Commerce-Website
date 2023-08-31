import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import ReactWhatsapp from "react-whatsapp";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const contact = async (e) => {
    e.preventDefault();
    let user = { email, phone, message };
    if (!email || !message || !phone) {
      toast.error("Fill All Details");
    }
    let result = await fetch(` ${process.env.REACT_APP_API}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    result = await result.json();
    if (result?.success) {
      toast.success(result.message);
    } else {
      toast.error(result?.message);
    }
  };
  return (
    <div className=" bg-secondary py-3 text-white ">
      <h6 className="text-center  ">
        &copy; 2023 ConfortZone Services All Rights Reserved.
        <hr />
      </h6>
      <div className="container py-2 ">
        <div className="row text-center ">
          <div className="col-md-4 col-12 text-start cursor-pointer ">
            <h5>Contact Us</h5>
            <div className="details py-2  ">
              <h6>ALI Hamza</h6>
              <h6>Shehbaz Ahmed</h6>
              <h5 className="pt-2 ">Admin</h5>
              <h5>
                <AiOutlineUser /> Muhammad Zeeshan Riaz
              </h5>
              <h5>
                <AiOutlineMail /> zriaz9363@gmail.com
              </h5>
              <h5>
                <AiOutlinePhone /> +447706672199
              </h5>
              <h5>
                <ReactWhatsapp
                  className=" text-success p-2 rounded"
                  number="+447706672199"
                >
                  <BsWhatsapp /> WhatsApp
                </ReactWhatsapp>
              </h5>
            </div>
            <form className="form-group form">
              <h2>Leave A Message</h2>

              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Valid Email"
                className="form-control "
              />
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Enter Phone"
                className="form-control "
              />

              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
              ></textarea>
              <button
                className="btn btn-success  m-2 px-3 "
                onClick={(e) => contact(e)}
              >
                Send
              </button>
            </form>
          </div>
          <div className="col-md-4 col-12 ">
            <h5>About Us</h5>
            <div className="details py-2 text-start">
              <p>
                Welcome to ConfortZone, where comfort meets quality. We're more
                than a furniture store we're your home's companions. With a
                passion for crafting cozy spaces, our journey is guided by
                warmth, style, and care. Every piece tells a story of
                craftsmanship and dedication. We believe in creating harmony,
                embracing uniqueness, and making your home truly yours. Join us
                in shaping comfort together.we Plans to give Comfort to you
              </p>
            </div>
          </div>
          <div className="col-md-4 col-12 ">
            <h5>Policy & Terms</h5>
            <div className="details py-2">
              <h6> ConfortZone Furniture </h6>
              <p className=" text-start">
                We deeply value respect, kindness, and fairness. Your well-being
                matters most we keep your info safe, assist with care, and
                uphold diverse inclusion. Our clear Terms ensure accurate
                orders, fair delivery, and easy returns. We cherish our
                creations and respect everyone's rights.
              </p>
              <h6> Policy:</h6>
              <p className=" text-start">
                We're dedicated to respect, diversity, and ethical practices. We
                prioritize customer well-being, protect data privacy, and
                provide empathetic support.
              </p>
              <h6> Terms of Service :</h6>
              <p className=" text-start">
                Order accuracy, fair shipping, easy returns. We aim for accuracy
                in product info, protect intellectual property, and limit
                liability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
