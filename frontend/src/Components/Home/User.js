import { useState, useEffect } from "react";
import {  Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./User.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from "react-rating-stars-component";
import { useSelector  , useDispatch} from "react-redux";

import ShowBook from "./User/ShowBook";
import UserTop from "./User/UserTop";
import {counterAction} from "../../store/index";

export default function User() {
    const [redirect, setRedirect] = useState(false);
    const [data, Setdata] = useState({

    });

    const dispatch = useDispatch();

    const Review_particluar =  useSelector(state => state.particluarIndex);
    const rate = useSelector(state => state.particluarRating);
    const bookId = useSelector(state => state.particluarBook)
    const ID = useSelector(state => state.commentId)

    // console.log(Review_particluar)
    // const [reviewstate , setReviewstate] = useState(Review_particluar);
    console.log(bookId + " please check");
    
    const [top5, setTop5] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [iden, setIden] = useState(null);
    // state = { selectedFile: null }
    const [selectedFile, setSelectedFile] = useState(null);

    const fileChangedHandler = event => {
        setSelectedFile({ selectedFile: event.target.files[0] })
    }
    const [comment, setComment] = useState([]);
    const [idreview , setIdreview] = useState("");
    const [idRating , setIdRating] = useState(1);



    // const uploadHandler = () => {
    //     const formData = new FormData()
    //     formData.append(
    //         'myFile',
    //         selectedFile,
    //         selectedFile.name
    //     )
    //     axios.post('my-domain.com/file-upload', formData, {
    //         onUploadProgress: progressEvent => {
    //             console.log(progressEvent.loaded / progressEvent.total)
    //         }
    //     })
    // }

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        let id;
        if (token) {
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            id = userInfo._id;
            Setdata(userInfo)

        } else {
            setRedirect(true);
        }
        // setTop5(JSON.parse(localStorage.getItem("topInfo")));
        console.log(data)
        fetch("http://localhost:8000/comment/comment/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(fetchdata => fetchdata.json())
            .then(fecthnow => {
                // console.log(fecthnow)
                setComment(fecthnow);
                let arr = []
                fecthnow.forEach(element => {
                    arr.push(element.BookId);
                });
                dispatch(counterAction.bookscheck(arr));
            }).catch(err => console.log(err))
    }, [])

    const popUpRemvoe = (bol, identity) => {
        // console.log(identity)
        setIden(identity)
        // console.log(iden);
        if(comment[iden] != undefined && comment[iden] != null){
            // console.log(comment[iden].Review);
            setIdRating(comment[iden].Rating)
            setIdreview(comment[iden].Review)
        }
        setIsOpen(bol);
    }

    const SubmitDetail = () => {

    }
    const SubmitReview = (e) =>{
        e.preventDefault();
        if (Review_particluar.length === 0) {
            toast.warning('Please Write your review!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            // setIsOpen(false);
            // console.log(user._id);
            console.log(bookId)
            const update = {
                Review: Review_particluar,
                Rating: rate,
                BookId: bookId,
                UserId: data._id
            }
            // console.log(update);
            fetch('http://localhost:8000/comment/comment/' + ID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }).then(res => res.json())
                .then(res => {
                    // console.log(res);

                    toast.success('Added successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // window.location = "/input"
                    //  let bookInsert = [...book , id];
                    // localStorage.setItem("topInfo" , JSON.stringify(bookInsert));
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 2000);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }

    }
    const InputData = (e) =>{
        // setReviewstate(e.target.value);   
        // index = index + e.target.value;
        // dispatch({type : 'setParticularIndex' , amount : e.target.value})
        dispatch(counterAction.reviewcheck(e.target.value))
        
    }

    const RatingChanged = (newRating) => {
        // dispatch({type : 'sctParticularRating' , amount : newRating})
        dispatch(counterAction.ratingcheck(newRating));
    };
    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/login" />}
            <UserTop />
            <hr />
            <h3 className="text-center">Your Top five books</h3>

            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="clo-10 mx-auto">
                        <div className="row">
                            <div className="col-10 mx-auto">
                                <div className="row gy-4">
                                    {comment !== undefined && comment.length !== 0 && (comment.map((value, index) => {
                                        return (
                                            <ShowBook
                                                key={index}
                                                indenity={index}
                                                // id={top5[index]}
                                                commentAll = {value}
                                                // review={comment[index].Review}
                                                // Rating={comment[index].Rating}
                                                // commentId = {comment[index]._id}
                                                // Bookid = {comment[index].BookId}
                                                HandleRemove={popUpRemvoe}
                                            />
                                        )
                                    }))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                (comment === undefined || comment === null) &&
                <div>Nothing to get</div>
            }
            {isOpen && comment !== undefined  && comment.length !== 0 && 
            ( 
            <div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">FeedBack</h5>
                                {console.log("something found")}
                                <button onClick={() => { setIsOpen(false) }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={SubmitReview}>
                            <div class="modal-body">
                                <h4>Rating</h4>
                                <ReactStars
                                    count={5}
                                    onChange={RatingChanged}
                                    value={rate}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                <h4>Your review</h4>
                                <textarea type="text"
                                    placeholder="your review on this book!"
                                    name="comment"
                                    value={Review_particluar}
                                    onChange={InputData}
                                    rows={7}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            {/* <h1>Comthing is thre</h1> */}
                            <div class="modal-footer">
                                <button onClick={() => { setIsOpen(false) }} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={() => SubmitDetail()} type="submit" class="btn btn-primary">Submit</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
             }
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
    )
}