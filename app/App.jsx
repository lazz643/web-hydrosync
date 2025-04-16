import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/page';
import RegisterPage from './Register/page';
import UserDashboard from './UserDashboard/page';
import Buy from './UserDashboard/BuyToken/page';
import Layout from './UserDashboard/layout';
import RootLayout from './layout'; // Import RootLayout
import HistoryBuy from './UserDashboard/HistoryBuy/page';
import InvoicePembelian from './UserDashboard/BuyToken/[invoice]/page';
import Homepage from './page';
import Pengaturan from './UserDashboard/Pengaturan/page';
import Bantuan from './UserDashboard/Bantuan/page';
//import LoginPageAdmin from './LoginAdmin/page';
//import RegisterPageAdmin from './RegisterAdmin/page';

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path= "/" element={<Homepage/>}/>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/UserDashboard" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/Register" element={<RegisterPage/>}/>
          <Route path="/UserDashboard/BuyToken" element={<Layout><Buy/></Layout>}/>
          <Route path="/UserDashboard/BuyToken/Pembayaran" element={<Layout><InvoicePembelian /></Layout>} />
          <Route path="/UserDashboard/HistoryBuy" element={<Layout><HistoryBuy/></Layout>}/>
          <Route path="/UserDashboard/Bantuan" element={<Layout><Bantuan/></Layout>}/>
          <Route path="/UserDashboard/Pengaturan" element={<Layout><Pengaturan/></Layout>}/>
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
