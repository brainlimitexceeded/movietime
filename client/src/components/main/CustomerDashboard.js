import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Movies from './Movies';
import Home from './Home';

function CustomerDashboard() {
  const [display, setDisplay] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#movies') {
        setDisplay('movies');
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
      <Footer />
    </div>
  );
}

export default CustomerDashboard;
