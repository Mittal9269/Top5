import { useState, useEffect } from "react"
import HomeBooks from "./HomeBooks";

export default function HomeTop5() {
    const [data, setData] = useState();
    const [Category, setCategory] = useState([]);
    const [handleSplit, setHandleSplit] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/comment/comment", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(fetchdata => fetchdata.json())
            .then(fecthnow => {

                // setComment(fecthnow);
                // console.log(fecthnow)
                let temp_arr = [];
                let comment_object = {};
                fecthnow.forEach(element => {
                    if (!temp_arr.includes(element.Category)) {
                        comment_object[element.Category] = [];
                        temp_arr.push(element.Category)
                    }
                });
                setCategory(temp_arr);
                let arr = [];
                fecthnow.forEach(element => {
                    // if(userInfo.category.includes(element.Category)){
                    arr.push(element.BookId);
                    // console.log(element.Category);
                    let temp = [...comment_object[element.Category], element]
                    comment_object[element.Category] = temp;
                    // } 
                });
                
                temp_arr.forEach(element => {
                    let books = comment_object[element];
                    console.log(books)
                    let result = {};
                    let p = [];
                    for (let i = 0; i < books.length; ++i) {
                        if(!p.includes(books[i].BookId)){
                            p.push(books[i].BookId)
                            result[books[i]] = 0;
                        }
                        // if (!result[books[i].BookId])
                        ++result[books[i]];
                    }
                    console.log(result)
                    // let sortable = Object.fromEntries(
                    //     Object.entries(result).sort(([,a],[,b]) => a-b)
                    //     );
                    // let bookKey = Object.keys(sortable);
                    // bookKey.reverse()
                    // let new_array;
                    // if(bookKey.length > 5){
                    //     new_array = bookKey.slice(0, 5)
                    // }
                    // else{
                    //     new_array = bookKey;
                    // }
                    // console.log(new_array)
                    // comment_object[element] = new_array;
                });

                setHandleSplit(comment_object);
                // console.log(handleSplit)

                // dispatch(counterAction.bookscheck(arr));

            }).catch(err => console.log(err))
    }, [])


    return (
        <>
            <hr />
            {Category !== undefined && Category.length !== 0 && (Category.map((value, index) => {
                return (
                    <div>
                        {(handleSplit[value] !== undefined && handleSplit[value].length !== 0) ? <h3 className="text-center"> Top books in {value}</h3> : null}
                        <div className="container-fluid mb-5">
                            <div className="row">
                                <div className="clo-10 mx-auto">
                                    <div className="row">
                                        <div className="col-10 mx-auto">
                                            <div className="row gy-4">

                                                {/* {console.log(handleSplit[value])} */}
                                                {handleSplit[value] !== undefined && handleSplit[value].length !== 0 && (handleSplit[value].map((val, ind) => {
                                                    {/* { console.log(val) } */}
                                                    return (
                                                        <HomeBooks
                                                            key={ind}
                                                            indenity={ind}
                                                            commentAll={val}
                                                        />
                                                    )

                                                }))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }))}
        </>
    )
}