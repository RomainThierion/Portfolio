import React from "react";
import "./index.css";
import romainThierion from "./romainThierion.jpg";

const OnePage = () => {
  return (
    <div>
      <img src={romainThierion} alt='romainThierion' className='avatar' />
      <h1>Romain Thierion</h1>
      <h2>Développeur web</h2>
    </div>
  );
};

export default OnePage;
