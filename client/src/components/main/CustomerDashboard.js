import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Movies from './Movies';
import Home from './Home';
import Detail from './Detail';
import Book from './Book';
import Allocate from './Allocate';
import Payment from './Payment';


function CustomerDashboard() {
  const [display, setDisplay] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#movies') {
        setDisplay('movies');
      }
      else if (window.location.hash.startsWith('#details?')) {
        setDisplay('details');
      }
      else if (window.location.hash.startsWith('#book?')) {
        setDisplay('book');
      }
      else if (window.location.hash.startsWith('#allocate?')) {
        setDisplay('allocate');
      }
      else if (window.location.hash.startsWith('#payment?')) {
        setDisplay('payment');
      } else {
        setDisplay('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check the initial hash value

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div>
      <Header />
      {display === 'movies' && (
          <Movies />
      )}
      {display === 'home' && (
          <Home />
      )}
      {display === 'details' && (
          <Detail />
      )}
      {display === 'book' && (
          <Book/>
      )}
      {display === 'allocate' && (
          <Allocate/>
      )}
      {display === 'payment' && (
          <Payment/>
      )}
      <Footer />
    </div>
  );
}

export default CustomerDashboard;
