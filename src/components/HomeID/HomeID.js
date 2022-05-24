import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './HomeID.css'
import Axios from 'axios';
import {Link} from 'react-router-dom';
//import SubscriptionForm from '../../Pages/SubscriptionForm';
//import reactRouterDom from 'react-router-dom';

function HomeID() {
    //const [show, setShow]=useState(null)

        var userHomeId = localStorage.getItem('userHomeId');

        const url="http://35.176.229.91:8080/api/endusers/homeId/"
        const [data, setData] = useState({
            homeId:"",
            ownerName:"",
            sensorId:"",
        })
    
        function submit(e){
            e.preventDefault();
            Axios.get(url + data.homeId,{
                homeId: data.homeId,
            })
            .then(res=>{
                console.log(res.data);
            if (res.data[0].found === "Home found"){
                e.preventDefault();
                localStorage.setItem('userHomeId', data.homeId);
                //alert('Correct house ID !');
                window.location.replace(`http://localhost:3000/${data.homeId}/signupForm`);
            }
            else if (res.data === "Home not found"){ 
                //alert('Wrong house ID !');
                ReactDOM.render(<p>This home Id doesn't exist ! Try again</p>, document.getElementById('HomeNotfound'));
            }
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
            {/* {
                show?<SubscriptionForm />:null
            } */}
            <form onSubmit={(e)=> submit(e)}>
               <input onChange={(e)=>handle(e)} value={data.homeId} placeholder="Home ID" type="text" id="homeId"></input>
               <div id='HomeNotfound'></div>
               <br /> <br /><br />
                {/* <button onClick={()=>setShow(false)}>Cancel</button> */}

                <div id="buttonContainer">
                {/* <Link to ={{ 
                    pathname : "/signupForm",
                    state : data.homeId
                }}> */}
                    <button /* onClick={()=>setShow(!show)} */>Confirm</button>
                {/* </Link> */}
                </div>
            </form>
        </div>
    );
        }

export default HomeID;