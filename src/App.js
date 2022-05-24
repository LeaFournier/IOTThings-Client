
import SubscriptionForm from './Pages/SubscriptionForm';
import Main from './Pages/Main';
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import HomeConfirmation from './Pages/HomeConfirmation';
import SubscriptionAddress from './Pages/SubscriptionAddress';
import NotFound from '../src/components/NotFound/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import Forgot from './Pages/Forgot';
import Reset from './Pages/Reset';
import IntermediatePage from './Pages/IntermediatePage';
import SensorConfirmation from './Pages/SensorConfirmation';
import SubscriptionForm2 from './Pages/SubscriptionForm2';


function App() {

  var userHomeId = localStorage.getItem('userHomeId');
  var userId = localStorage.getItem('userId');
  var userSensorId = localStorage.getItem('userSensorId');

  return (
    <div className="App">
      <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={Main} />
        <Route path="/HomeID" exact component={HomeConfirmation} />
        <Route path={`/${userHomeId}/signupForm`} exact component={SubscriptionForm} /> 
        <Route path={`/${userSensorId}/addressForm`} exact component={SubscriptionAddress} />
        <Route path="/Dashboard" exact component={Dashboard} />
        <Route path="/ForgottenPassword" exact component={Forgot} />
        <Route path={`/${userId}/ResetPassword`} exact component={Reset} />
        <Route path={"/SelectID"} exact component={IntermediatePage} />
        <Route path={"/SensorID"} exact component={SensorConfirmation} />
        <Route path={`/${userSensorId}/signupForm`} exact component={SubscriptionForm2} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}


export default App;
