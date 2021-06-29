import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import BookCard from "./BookInfo/BookCard";
import Books from "./Category/Category";
import Search from "./Search/Search";
import {  Redirect } from "react-router-dom";
import { Roller } from 'react-spinners-css';
import "./BookInfo/card.css";
import Img1 from "../Images/void.png";
import CategoryButton from "./Category/CategoryButton";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import { useSelector ,useDispatch } from "react-redux";
import { counterAction } from "../../store";


export default function Input() {
    const dispatch = useDispatch();
    // const [data, setData] = useState([])
    const data = useSelector(state => state.data)


    const [redirect, setRedirect] = useState(false);
    const [changeCat , setChangeCat] = useState("history");
    const [loading, isLoding] = useState(false);
    const [stateindex , setStateindex] = useState(-1);
    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        let id;
        if (token) {


        } else {
            setRedirect(true);
        }
        if(!data.length){
            isLoding(true);
            // console.log('hello from useEffect')
            fetch('https://www.googleapis.com/books/v1/volumes?q=' + changeCat +  '&maxResults=39', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(fetchedata => {
                    // console.log(fetchedata)
                    // setData(fetchedata.items)
                    dispatch(counterAction.datacheck(fetchedata.items))
                    isLoding(false);
                })
                .catch(err => console.log(err));
        }
          

    }, [])

    const changeState = (value , key) => {
       
        setStateindex(key);
        // console.log(key);
        isLoding(true)
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + value + "&maxResults=39", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(dat => {
                console.log(dat)
                setChangeCat(value)
                // setData(data.items)
                dispatch(counterAction.datacheck(dat.items))
                isLoding(false);
            }).catch(err => console.log(err))
    }

    const searchQuery = (input) => {
        isLoding(true)
        changeState(input);
        // setChangeClass(!changeClass);

    }

    // const toggle = () =>{
    //     setChangeClass(!changeClass);
    //     console.log(changeClass)
    // }
    return (
        <>
            <Navbar />
            <Search handleSearch={searchQuery} />
            {redirect && <Redirect to="/login" />}
            <h3 className="text-center my-2">Select Your Category </h3>
            <ScrollUpButton />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="clo-10 mx-auto">
                        <div className="row">
                            <div className="col-10 mx-auto">
                                
                                        {!loading &&
                                    <div className="row">
                                        <div className="col-md-2 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column">

                                            <div className="left-part" style={{ textAlign: "center" }}>
                                                <h4 style={{ justifyContent: "center", paddingLeft: "20px", textAlign: "center" }}>Category </h4>
                                                <hr />
                                                <div>
                                                    
                                                    <ul>
                                                        {Books.map((value, index) => {
                                                            {/* <form onSubmit={changeState(value)}> */ }
                                                            return (
                                                                <CategoryButton key = {index} curIndex ={index} value={value} colorIndex={index === stateindex} handleButton={changeState} />
                                                            )

                                                        })}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-10 order-1 order-lg-2 header-img">
                                        
                                            <div className="row">
                                                {data !== undefined && data.length !== 0 && (
                                                    data.map((value) => {
                                                        return (
                                                            <BookCard
                                                                id={value.id}
                                                                productInfo={value}
                                                            // img={img2}
                                                            />
                                                        )
                                                    })
                                                )}
                                                {
                                                    data === undefined && <div className="void__div">
                                                        <img className="void__image" src={Img1} alt="Fun with image" />
                                                        <h6 className="void__text">Nothing found please check your queury!</h6>
                                                    </div>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                }
                               
                                {loading && <div className="align-items-center justify-content-center ml-lg-5">
                                    <Roller className="change__loading__input" color="#be97e8" size={200} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}