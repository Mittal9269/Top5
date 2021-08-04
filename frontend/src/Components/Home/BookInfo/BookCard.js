// import React from "react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "./card.css"
import "./newcard.css";

export default function BookCard(props) {


  let href = "/particular/";
  // let title = "" , subtitle = "";

  if (props.productInfo.id !== undefined) {
    href += props.productInfo.id;
  }
  const [userdata, Setuserdata] = useState([]);

  useEffect(() => {
    // let token = sessionStorage.getItem("Token");

    let userInfo = JSON.parse(localStorage.getItem("productId"));
    if (userInfo && userInfo.length !== 0) {
      Setuserdata(userInfo)
    } else {
      let arr = [];
      Setuserdata(arr)
    }
  }, [])



  const SendId = (e) => {
    e.preventDefault();
    if (!userdata.includes(props.productInfo.id)) {
      toast.success(' Card added successfully !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let prevdata = JSON.parse(localStorage.getItem("productId"));
      if (!prevdata) {
        let newdata = [props.productInfo._id];
        localStorage.setItem(props.productInfo._id, "1")
        localStorage.setItem("productId", JSON.stringify(newdata));

        Setuserdata(newdata);
      } else {
        let newdata = [...prevdata, props.productInfo._id];
        localStorage.setItem(props.productInfo._id, "1")
        localStorage.setItem("productId", JSON.stringify(newdata));
        Setuserdata(newdata);
      }
    }
    else {
      toast.info(' Card already exits !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>

      <div className="div_change col-sm-4 col-12 mx-auto my-2" >
        {/* <div className="card-img"  >
          <div class="image card__image-container">
            <img  className="mr-5 card__image" src={
                props.productInfo.volumeInfo.imageLinks === undefined ? "https://source.unsplash.com/user/erondu/400x300" : props.productInfo.volumeInfo.imageLinks.thumbnail
            } alt="" />
            
          </div>

    
          <div class="card__content">
            <h3 class="card__title">{props.productInfo.volumeInfo.title.substring(0, 12) + "..."}</h3>
            
            <p className="card-text">
                {props.productInfo.volumeInfo.authors}
            </p>
           
            <div className="row div_button">
            <NavLink to={href} className="btn btn-outline-info navlink">
              Info
            </NavLink>
            </div>
          </div>
        </div> */}
        <NavLink to={href}  class="card 1" >
          <div class="card_image"> <img  src={
                props.productInfo.volumeInfo.imageLinks === undefined ? "https://source.unsplash.com/user/erondu/400x300" : props.productInfo.volumeInfo.imageLinks.thumbnail
            } alt="" /> </div>
          <div class="card_title title-white">
          {/* <h3 class="card__title">{props.productInfo.volumeInfo.title.substring(0, 12) + "..."}</h3>
            
            <p className="card-text" >
                {props.productInfo.volumeInfo.authors}
            </p> */}
          </div>
        </NavLink>
      </div>



      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}



// link uses
// https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating