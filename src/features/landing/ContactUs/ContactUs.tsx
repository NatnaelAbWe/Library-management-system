import React from "react";

import "./ContactUs.css";

export const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      <h3>Contact Us</h3>
      <h4>Address</h4>
      <p>ABC Library Street</p>
      <p>Library, TW, 77777</p>
      <div className="contact-us-divider"></div>
      <h4>Phone Number</h4>
      <p>111-2222-3333</p>
      <div className="contact-us-divider"></div>
      <h4>Email</h4>
      <p>mylib@library.com</p>
    </div>
  );
};
