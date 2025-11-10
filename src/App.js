import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import Services from './OurServices/Services';
import ExamPatners from './ExamPatners/ExamPatners';
import CareGivers from './OurCareGivers/CareGivers';
import About from './About/About';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ZoomMeeting from './ZoomMeeting/ZoomMeeting';
import BookService from './BookService/BookService'
import RazorpayPayment from './RazorpayPayment/RazorpayPayment';
import PaymentSuccess from './PaymentSucess/PaymentSucess';
import Header1 from './Header1/Header1';
import Dashboard from './Dashboard/Dashboard';
import MyBookings from './MyBookings/MyBookings';
import CaregiverLogin from './CaregiverLogin/CaregiverLogin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element ={<Header1/>}/>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/services" element={   <ProtectedRoute>   <Services />    </ProtectedRoute> } />
        <Route path="/caregivers" element={ <ProtectedRoute>   <CareGivers />  </ProtectedRoute> } />
        <Route path="/partners" element={   <ProtectedRoute>   <ExamPatners /> </ProtectedRoute> }/>
        <Route path="/mybookings" element={      <ProtectedRoute>   <MyBookings />       </ProtectedRoute> } />
        <Route path ="/zoom-meeting" element = {<ProtectedRoute> <ZoomMeeting/> </ProtectedRoute> }/>
        <Route path ="/book-service" element = {<ProtectedRoute> <BookService/> </ProtectedRoute> }/>
        <Route path ="/payment" element = {<ProtectedRoute>       <RazorpayPayment  amount={500} />  </ProtectedRoute>}/>
        <Route path="/payment-success/:orderId" element={<ProtectedRoute> <PaymentSuccess /> </ProtectedRoute> } />

        <Route path ="/dashboard" element ={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>


        <Route path = "/caregiver-Login" element ={<CaregiverLogin/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
