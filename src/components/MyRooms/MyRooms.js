import React, {useState} from 'react';
import './MyRooms.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'
import bed from '../../bed.svg'; 
import fridge from '../../fridge.svg'; 

function MyRooms() {

    var barOpened = localStorage.getItem('barOpened')

    const [navbarOpen, setNavbarOpen] = useState(JSON.parse(barOpened))

    const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


        return  (
            <div>
                <MainContext.Provider value={{navbarOpen, setNavbarOpen}}>
                <SideBar />
                    <div className='page_content' style = {{width: !navbarOpen ? 'calc(100% - 78px);' : 'calc(100% - 240px);', left: !navbarOpen ? '78px' : '240px'}} >
                        <div className='text'>
                            MY ROOMS
                        </div>
                        <div className='subtitle'>EDIT YOUR ROOMS INFORMATION</div>
                        <div id="col3">

                        <div id="settingsUsername">
                            <label for="totalNb">Total Number Of Rooms</label>
                            <input /* onChange={(e)=>handle(e)} */ type="text" id="totalNb" name="totalNb" />
                        </div>

                        <br /><br /><br />

    <div
          className="columns is-multiline is-mobile is-centered"
          style={{ textAlign: 'center', margin: '0 auto', display:"flex"}}
    >

    <div className="box">
              <img style={{alignItems:'center'}} src={bed} width="200px" height="200px" onClick={toggleModal} /> 
              <h1 id='TitleRoom1' style={{alignItems:'center', marginRight:'15%', marginLeft:'15%'}}>ROOM 1</h1>
    </div>
    <div className="box">
              <img style={{alignItems:'center'}} src={bed} width="200px" height="200px" onClick={toggleModal} /> 
              <h1 id='TitleRoom1' style={{alignItems:'center', marginRight:'15%', marginLeft:'15%'}}>ROOM 2</h1>
    </div>
    <div className="box">
              <img style={{alignItems:'center'}} src={fridge} width="200px" height="200px" onClick={toggleModal} /> 
              <h1 id='TitleRoom1' style={{alignItems:'center', marginRight:'15%', marginLeft:'15%'}}>KITCHEN</h1>
    </div>
    </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>What would you like to change?</h2>
            <div id="settingsFirstName">
                <label for="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" />
            </div>
            <div id="settingsLastName">
                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" />
            </div>
            <div id="settingsEmail">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" />
            </div>
            <i class='bx bx-arrow-back' style={{fontSize:'30px', cursor:'pointer'}} onClick={toggleModal}></i>
          </div>
        </div>
      )}

                        {/* <div id="settingsFirstName">
                            <label for="firstname">First Name</label>
                            <input type="text" id="firstname" name="firstname" />
                        </div>
                        <div id="settingsLastName">
                            <label for="lastname">Last Name</label>
                            <input type="text" id="lastname" name="lastname" />
                        </div>
                        <div id="settingsEmail">
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" />
                        </div>
                        <div id="settingsPhone">
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" name="phone" />
                        </div> */}

                        {/* <button className='SettingsProfile'>Submit</button> */}

                        </div>
 
                    </div>
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default MyRooms;