import { useEffect, useState } from 'react';
import { NavbarMenu } from "../mockData/data";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Flight from './Flight';
import Contact from './Contact';
import About from './About';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Check localStorage for login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const signUpStatus = localStorage.getItem('isSignIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      console.log('User is logged in (from localStorage)'); // Debugging
    }
    if (signUpStatus === 'true') {
      setIsSignIn(true);
      console.log('User is signed in (from localStorage)'); // Debugging
    }
  }, []);

  // Handle successful login
  const handleSuccessfulLogin = () => {
    console.log('Login successful'); // Debugging
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state
    setShowLogin(false); // Close login modal after login
  };

  const handleSuccessfulSignup = () => {
    console.log('sign successful'); // Debugging
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state
    setShowLogin(false); // Close login modal after login
  };

  // Handle login button click
  const handleLoginClick = () => {
    console.log('Login button clicked'); // Debugging
    setShowLogin(true);
    setShowSignup(false);
  };

  // Handle signup button click
  const handleSignupClick = () => {
    console.log('Signup button clicked'); // Debugging
    setShowLogin(false);
    setShowSignup(true);
  };

  // Handle logout button click
  const handleLogoutClick = () => {
    console.log('Logout button clicked'); // Debugging
    setIsLoggedIn(false); // Reset login state
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
    alert("You have successfully logged out!");
  };

  // Handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      if (window.innerWidth >= 600) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu

  console.log('Navbar re-rendered, isLoggedIn:', isLoggedIn); // Debugging

  return (
    <>
      <Router>
        <nav className="relative w-full">
          <div className="container flex justify-between items-center py-8">
            {/* Logo section */}
            <div className="text-2xl flex items-center gap-2 font-bold uppercase">
              <PiAirplaneInFlightDuotone className="size-10 -mt-3" />
              <p className="text-cyan-600">Fly</p>
              <p className="text-secondar">High</p>
            </div>

            {/* Menu section */}
            <div className={`${isMobile ? 'hidden' : 'flex space-x-8'}`}>
              <ul className="flex items-center gap-6 text-gray-600">
                {NavbarMenu.map((item) => (
                  <li key={item.id}> {/* Ensure `item.id` is unique */}
                    <Link
                      to={
                        item.link === `/machinaries/src/components/${item.name}.jsx`
                          ? `/${item.name.toLowerCase().replace(' ', '')}`
                          : '/'
                      }
                      className="inline-block py-1 px-3 duration-300 hover:text-cyan-600 font-semibold text-gray-500 decoration-transparent hover:-translate-y-1"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Login/Logout Button */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="transition ease-in-out hover:-translate-y-1 text-2xl hover:bg-red-500 text-white bg-red-600 font-semibold rounded-md px-6 py-2 md:block duration-300 hover:shadow-lg hover:shadow-red-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="transition ease-in-out hover:-translate-y-1 text-2xl hover:bg-cyan-600 text-cyan-600 font-semibold rounded-md hover:text-white border-cyan-600 border-2 px-6 py-2 md:block duration-300 hover:shadow-lg hover:shadow-blue-600"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Login modal */}
          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onLoginSuccess={handleSuccessfulLogin}
              onSignupClick={handleSignupClick}
            />
          )}

          {/* Signup modal */}
          {showSignup && (
            <Signup
              onSignUpSuccess={handleSuccessfulSignup}
              onClose={() => setShowSignup(false)}
              onLoginClick={handleLoginClick}
            />
          )}
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" index element={<Home />} />
            <Route path="/flights" element={<Flight />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default Navbar;