import React, {useState} from 'react';
import './AddressForm.css'
import Axios from 'axios';



function AddressForm() {
  const url="http://35.176.229.91:8080/api/endusers/"
    const [data, setData] = useState({
        street:"",
        city:"",
        region:"",
        post_code:"",

    })

    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            street: data.street,
            city: data.city,
            region: data.region,
            post_code: data.post_code,

        })
        .then(res=>{
            console.log(res.data)
        })
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div>
         <form onSubmit={(e)=> submit(e)}>
               <input onChange={(e)=>handle(e)} id="street" value={data.street} placeholder="Street" type="text"></input>
               <input onChange={(e)=>handle(e)} id="city" value={data.city} placeholder="City" type="text"></input>
               <input onChange={(e)=>handle(e)} id="region" value={data.region} placeholder="Region" type="text"></input>
               <input onChange={(e)=>handle(e)} id="post_code" value={data.post_code} placeholder="Post Code" type="text"></input>
               <br /><br />
               <div id="buttonContainer">
                <button>Submit</button>
               </div>
            </form>
        </div>
    );
}



export default AddressForm;