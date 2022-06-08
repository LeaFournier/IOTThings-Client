import React, {useEffect, useState} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import SubscriptionForm from './Pages/SubscriptionForm';
import Main from './Pages/Main';
import HomeConfirmation from './Pages/HomeConfirmation';
import SubscriptionAddress from './Pages/SubscriptionAddress';
import NotFound from '../src/components/NotFound/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import Forgot from './Pages/Forgot';
import Reset from './Pages/Reset';
import IntermediatePage from './Pages/IntermediatePage';
import SensorConfirmation from './Pages/SensorConfirmation';
import SubscriptionForm2 from './Pages/SubscriptionForm2';
import MyHome from '../src/components/MyHome/MyHome';
import MyRooms from '../src/components/MyRooms/MyRooms';
import MySensors from '../src/components/MySensors/MySensors';
import Settings from '../src/components/Settings/Settings';

export const MainContext = React.createContext({navbarOpen: false, setNavbarOpen: () => {} });

function App() {

  var userHomeId = localStorage.getItem('userHomeId');
  var userId = localStorage.getItem('userId');
  var userSensorId = localStorage.getItem('userSensorId');
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={Main} />
        <Route path="/HomeID" exact component={HomeConfirmation} />
        <Route path={`/${userHomeId}/signupForm`} exact component={SubscriptionForm} /> 
        <Route path={`/${userSensorId}/addressForm`} exact component={SubscriptionAddress} />
        <Route path="/ForgottenPassword" exact component={Forgot} />
        <Route path={`/${userId}/ResetPassword`} exact component={Reset} />
        <Route path={"/SelectID"} exact component={IntermediatePage} />
        <Route path={"/SensorID"} exact component={SensorConfirmation} />
        <Route path={`/${userSensorId}/signupForm`} exact component={SubscriptionForm2} />
        <MainContext.Provider value= {{navbarOpen, setNavbarOpen}}>
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/myHome" exact component={MyHome} />
          <Route path="/myRooms" exact component={MyRooms} />
          <Route path="/mySensors" exact component={MySensors} />
          <Route path="/settings" exact component={Settings} />
        </MainContext.Provider>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}


export default App;
