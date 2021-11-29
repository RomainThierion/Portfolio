import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Header";
import reportWebVitals from "./reportWebVitals";
import OnePage from "./OnePage";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <div className='section1 animate__animated animate__fadeInDown'>
      {/* <img src={romainThierion} alt='romainThierion' className='avatar' /> */}
      <div className='title'>Romain Thierion</div>
      <h1>Développeur web</h1>
    </div>
    <OnePage />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
