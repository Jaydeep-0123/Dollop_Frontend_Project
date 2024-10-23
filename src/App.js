import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Authenticate from './screens/Authenticate';
import LoginUser from './screens/LoginUser';
import ForgerPassword from './screens/ForgerPassword';
import Otp from './screens/Otp';
import NewPassword from './screens/NewPassword';
import Home from './screens/Home';
import ShowUser from './screens/ShowUser';
import MockTest2 from './screens/MockTest2'
import EmailFuncationality from './screens/EmailFuncationality';
import Coordinate from './screens/Coordinate';
import DashBoardCarousal from './screens/DashBoardCarousal';
import QuizMock from './screens/QuizMock';

function App() {
  return (
    <div className="App">

     <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login/>}></Route> */}
        <Route path="/Authenticate" element={<Authenticate/>}></Route>
        <Route path="/" element={<LoginUser/>}></Route>
        <Route path="/forgot_Password" element={<ForgerPassword/>}></Route>
        <Route path="/Verify_Otp" element={<Otp/>}></Route>
        <Route path="/new_Password" element={<NewPassword/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/showUser" element={<ShowUser/>}></Route>
        <Route path="/emailFuncationality" element={<EmailFuncationality/>}></Route>
        <Route path="/coordinate" element={<Coordinate/>}></Route>
        <Route path="/mock_test" element={<MockTest2/>}></Route>
        <Route path="/dashBoard" element={<DashBoardCarousal/>}></Route>
        <Route path="/quiz" element={<QuizMock/>}></Route>
        {/* <Route path="/responsive" element={<ReactResponsive/>}></Route> */}
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
