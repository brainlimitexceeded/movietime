// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomerDashboard from './components/main/CustomerDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', // Bronze color
    },
    secondary: {
      main: '#c0ca33', // Bronze color
    },
  },
});


function App() {
  return (
    <Router>
 <ThemeProvider theme={theme}>    
         {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          {/* Add more Routes for different components here */}
        </Routes>
        </ThemeProvider>
    </Router>
  );
}

export default App;

