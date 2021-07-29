import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Image from "../../Images/defaultUser.png"
import Multiselect from 'multiselect-react-dropdown';
import option from "../../Login/Options";

export default function UserTop() {
    const [redirect, setRedirect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [categorySelect, setCategorySelect] = useState([]);
    const [selectedVal , setSelectedVal] = useState([]);
    // const [photselect , setPhotoselect] = useState("");
    const [newUser, setNewUser] = useState(
        {
            photo: '',
        }
    );
    let [parent_data, setParent_data] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    })
    const [data, Setdata] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        AboutMe: "",
        category: []
    });
    const formData = new FormData()
    // const selectedVal = data.category;
    let selectedValue = [];
    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if (token) {
            let array = [];
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            Setdata(userInfo)
            // setCategorySelect(userInfo.category)
            setParent_data(userInfo)
            // let selectedValue = [];
            // if(userInfo.category !== null && userInfo.category !== undefined)
            // userInfo.category.forEach(element => {
            //     selectedValue.push({ value: element, label: element });
            // });
            // setSelectedVal(userInfo.category)
        } else {
            setRedirect(true);
        }
    }, [])

    const eventInput = (event) => {
        const { name, value } = event.target;
        Setdata((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        })
    }

    const FindAns = () => {
        setIsOpen(true);
    }

    const SubmitReview = (e) => {
        e.preventDefault();

        if (!validator.isEmail(data.email)) {
            toast.error('Invalid Email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (data.firstName.length === 0 || data.lastName.length === 0) {
            toast.error('Error in firstname or lasname', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (data.username.length === 0) {
            toast.error('Invalid username', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // console.log(categorySelect)
            const update = {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                AboutMe: data.AboutMe,
                category: categorySelect
            }
            // console.log(update);
            const token = sessionStorage.getItem('Token');
            fetch('http://localhost:8000/api/update_user', {
                method: 'PUT',
                headers: {
                    'x-auth-token': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }).then(res => res.json())
                .then(res => {
                    // console.log(res)
                    toast.success("Updated sucessfully !", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    sessionStorage.setItem("userInfo", JSON.stringify(res.user))
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(err => console.log(err));
        }


    }

    const Onclose = (e) => {
        setIsOpen(false);
        Setdata(parent_data);
    }
    const handlePhoto = (e) => {
        setNewUser({ photo: e.target.files[0] });
        // }
        // const handleSubmit = (e) =>{
        // e.preventDefault();
        formData.append('photo', e.target.files[0]);
        // let p = e.target.files[0];
        // console.log("something is tiggred")

        const token = sessionStorage.getItem('Token');
        // console.log(token);
        fetch('http://localhost:8000/api/update_image', {
            method: 'PATCH',
            headers: {
                'x-auth-token': token,
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
            // body: JSON.stringify(update)
            body: formData
        }).then(res => res.json())
            .then(res => {
                // console.log(res)
                toast.success("Updated sucessfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                sessionStorage.setItem("userInfo", JSON.stringify(res.user))
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => console.log(err));
    }


    const animatedComponents = makeAnimated();

    // const animatedComponents = makeAnimated();
    // const onSelect = (selectedList, selectedItem) => {
    //     console.log(selectedList)
    //     setCategorySelect(selectedList);
    // }

    // const onRemove = (selectedList, removedItem) => {
    //     console.log(selectedList)
    //     setCategorySelect(selectedList);
    // }
    const ChangingVal = (value, val) => {
        console.log(value)
        let arr = []
        value.forEach(element => {
            arr.push(element.value)
        });
        console.log(arr)
        setCategorySelect(arr);
        // console.log(val)
    }
    return (
        <>
            <div className="">

                <div class="container emp-profile">
                    {/* <form> */}
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src={data.image && data.image.length !== 0 ? 'http://localhost:8000/images/' + data.image : Image} alt="" />
                                {/* <form onSubmit={handleSubmit} encType='multipart/form-data'> */}
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handlePhoto}
                                        name="file" />
                                </div>

                                {/* <button className="button" type="submit">Submit</button> */}
                                {/* </form> */}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                <h5>
                                    {data.firstName + " " + data.lastName}
                                </h5>

                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    {/* <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Category</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>


                        <div class="col-md-2">
                            {/* <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" /> */}
                            <button data-toggle="modal" className="btn btn-light btn-md mr-1 mb-2" data-target="#exampleModalCenter" onClick={() => { FindAns() }}>
                                Edit Profile
                            </button>
                        </div>


                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-work">
                                <div>
                                    <h3>About Me</h3>
                                    <hr />
                                    <h6>{data.AboutMe}</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{data.username}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{data.firstName + " " + data.lastName}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{data.email}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Category Lover :</label>
                                        </div>
                                        <div class="col-md-6">
                                            {/* <p>Web Developer and Designer</p> */}
                                            {
                                                data && data.category && data.category.length !== 0 && (
                                                    data.category.map((val, index) => {
                                                        return (
                                                            <span style={{ color: "rgb(0,98,204)" }}>{val + ", "}</span>

                                                        )
                                                    })
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">


                                </div> */}
                            </div>
                        </div>

                    </div>
                    {/* </form> */}
                </div>
            </div>


            {
                isOpen &&
                <div>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Profile</h5>

                                    <button onClick={Onclose} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={SubmitReview}>
                                    <div class="modal-body">
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter firstname" name="firstName"
                                                value={data.firstName}
                                                className="input"
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="password">First Name:</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter lastname" name="lastName"
                                                value={data.lastName}
                                                onChange={eventInput}
                                                className="input"
                                                autocomplete="off" />
                                            <label for="password">Last Name:</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter username" name="username"
                                                value={data.username}
                                                onChange={eventInput}
                                                className="input"
                                                autocomplete="off" />
                                            <label for="username">UserName</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="email"
                                                placeholder="Enter Email"
                                                name="email"
                                                className="input"
                                                value={data.email}
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="email">Email:</label>
                                        </div>
                                        <div className="">
                                            {/* <Multiselect
                                                isObject={false}
                                                options={option}
                                                selectedValues={selectedValue}
                                                onSelect={onSelect}
                                                onRemove={(selectedList, selectedValue) => { onRemove(selectedList, selectedValue) }}
                                                selectionLimit={6}
                                                displayValue="name"
                                                placeholder="Select Type you like"
                                            /> */}

                                            
                                            
                                            
                                                <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                defaultValue={selectedVal}
                                                isMulti
                                                options={option}
                                                onChange={ChangingVal}
                                            // isObject={false}
                                            />
                                           
                                            <label for="Category">Category:</label>
                                            
                                        </div>
                                        <div class="floating-label">
                                            <textarea
                                                type="text"
                                                placeholder="About Me"
                                                name="AboutMe"
                                                className="input"
                                                rows={6}
                                                value={data.AboutMe}
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="email">AboutMe:</label>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={Onclose} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

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