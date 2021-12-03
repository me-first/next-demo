import React from "react";
import classess from "./MeetupDetail.module.css";

const MeetupDetail = ({ image, title, address, detail }) => {
  return (
    <section className={classess.detail}>
      <img src={image} alt={title}></img>

      <h1>{title}</h1>
      <address>{address}</address>
      <p>{detail}</p>
    </section>
  );
};

export default MeetupDetail;
