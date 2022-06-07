import React, {useState} from 'react';
import './MyRooms.css';
import SideBar from '../../components/SideBar/SideBar'
import { MainContext } from '../../App';
import Bulb from '../../components/Bulb/Bulb'
import bed from '../../bed.svg'; 

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

   {/*  <button className="btn-modal" style={{width:'30%'}} onClick={toggleModal}>
                            ROOM 1
    </button> */}

    <div className="box">
              <img style={{alignItems:'center', marginLeft:'10%'}} src={bed} width="200px" height="200px" onClick={toggleModal} /> 
              <h1 id='TitleRoom1' style={{alignItems:'center', marginRight:'15%', marginLeft:'15%'}}>ROOM ONE</h1>
    </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
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

                        <button className='SettingsProfile'>Submit</button>

                        </div>
 
                    </div>
                </MainContext.Provider>
                <Bulb />
            </div>
        )
}
export default MyRooms;