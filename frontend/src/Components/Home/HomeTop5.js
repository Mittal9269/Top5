import { useState , useEffect } from "react"
import HomeBooks from "./HomeBooks";

export default function HomeTop5(){
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
                let temp_arr = [];
                let comment_object = {};
                fecthnow.forEach(element => {
                    if(!temp_arr.includes(element.Category)){
                        comment_object[element] = [];
                        temp_arr.push(element)
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

                setHandleSplit(comment_object);
                // console.log(handleSplit)

                // dispatch(counterAction.bookscheck(arr));

            }).catch(err => console.log(err))
    }, [])

    const popUpRemvoe = (bol, identity) => {

        // setIden(identity)

        // if (comment[iden] != undefined && comment[iden] != null) {
        //     setIdRating(comment[iden].Rating)
        //     setIdreview(comment[iden].Review)
        // }
        // setIsOpen(bol);
    }

    return (
        <>
            <hr />
            {Category !== undefined && Category.length !== 0 && (Category.map((value, index) => {
                return (
                <div>
                    {(handleSplit[value] !== undefined &&  handleSplit[value].length!== 0) ? <h3 className="text-center">Your Top books in {value}</h3> : null}
                    <div className="container-fluid mb-5">
                        <div className="row">
                            <div className="clo-10 mx-auto">
                                <div className="row">
                                    <div className="col-10 mx-auto">
                                        <div className="row gy-4">
                                            
                                            {console.log(handleSplit[value])}
                                            {handleSplit[value] !== undefined && handleSplit[value].length !== 0 && (handleSplit[value].map((val, ind) => {
                                                {console.log(val)}
                                                return (
                                                    <HomeBooks
                                                        key={ind}
                                                        indenity={ind}
                                                        commentAll={val}
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
                </div>)
            }))}
        </>
    )
}