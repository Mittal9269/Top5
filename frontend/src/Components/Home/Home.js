import Navbar from "../Navbar/Navbar";
import { DiscussionEmbed } from 'disqus-react';
import { NavLink } from "react-router-dom";
import "./home.css";
import Img from "../Images/homeimage.png"
import HomeTop5 from "./HomeTop5";

export default function Home() {
    return (
        <>
    
        <div className="home_background">
            <Navbar />
            <section id="header" className="d-flex align-item-center">
        <div className="container-fluid nav-bg">
          <div className="row">
            <div className="clo-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h1>
                  Grow More With
                    <strong className="brand-name"> Us </strong>
                  </h1>
                  <h2 className="my-3">
                    We are team of Best developer to help you
                  </h2>
                  <div className="mt-3">
                    <NavLink to="/login" className="btn-get-started">
                      Signin
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img
                    src= {Img}
                    className="img-fluid animated image__size"
                    alt="Common img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <HomeTop5 />
        </>

    )
}