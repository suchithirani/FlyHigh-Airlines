import {useEffect,useState ,useRef} from 'react'
import { NavbarMenu } from "../mockData/data";
import { BiSearchAlt2 } from "react-icons/bi";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';
import Login from './Login'
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  Home  from './Home';
import Flight from './Flight';
import Contact from './Contact'
import  About  from './About';
import App from '../App';
// import { Outlet } from 'react-router-dom';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  

  


  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      if (window.innerWidth >= 600) {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
    <Router>
    <nav className= 'relative  w-full'>
      <div className="container flex justify-between items-center py-8 ">
        {/* Logo section  */}
        <div className="text-2xl flex items-center gap-2 font-bold uppercase">
        

          <PiAirplaneInFlightDuotone  className='size-10 -mt-3'/>
          
          <p className="text-cyan-600">Fly</p>
          <p className="text-secondar">High</p>
        </div>
        
        {/* Menu section  */}
        <div className={`${isMobile ? 'hidden' : 'flex space-x-8'}`}>
          <ul className='flex items-center gap-6 text-gray-600'>
            {NavbarMenu.map((item) => {
              return (
                <li key={item.id}>
                  <Link 
                  to={item.link === `/machinaries/src/components/${item.name}.jsx`? `/${item.name.toLowerCase().replace(' ', '')}` : '/'}


                  className='inline-block py-1 px-3 duration-300 hover:text-cyan-600 font-semibold   text-gray-500 decoration-transparent hover:-translate-y-1'>
                    {item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Icon Section */}
        <div className='flex items-center gap-4'>
          {/* <button className='text-2xl hover:bg-cyan-600 hover:text-white rounded-full p-2 duration-300'>
            <BiSearchAlt2/>
          </button> */}

          {/* <button className='text-2xl hover:bg-cyan-600 hover:text-white rounded-full p-2 duration-300'>
            <FaShoppingCart/>
          </button> */}
          <button  
          className=' transition ease-in-out hover:-translate-y-1 text-2xl hover:bg-cyan-600 text-cyan-600 font-semibold rounded-md hover:text-white border-cyan-600 border-2 px-6 py-2  md:block duration-300 hover:shadow-lg hover:shadow-blue-600 'onClick={handleLoginClick}>
            Login
          </button>
        </div>
        {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onSignupClick={handleSignupClick}
        />
      )}
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)} 
          onLoginClick={handleLoginClick}
        />
      )}
         {/* hamburger menu section */}
        {isMobile && (
            <ResponsiveMenu isOpen={isOpen} onClick={toggleMenu} />
          )}
      </div>
      
    

    {isMobile && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in
              ${isOpen ? 'max-h-48 max-w- opacity-100' : 'max-h-0  opacity-0'}`}
          >
            <div className=" py-10  space-y-4 flex flex-col items-center bg-slate-400  rounded-lg border  border-separate border-slate-500">
            <ul className=''>
            {NavbarMenu.map((item) => {
              return (
                <li key={item.id}>
                  <Link 
                  to={item.link === `/machinaries/src/components/${item.name}.jsx`? `/${item.name.toLowerCase().replace(' ', '')}` : '/'}


                  className='inline-block py-1 px-3 duration-300 hover:text-primar font-semibold   text-gray-500 decoration-transparent hover:-translate-y-2'>
                    {item.title}</Link>
                </li>
              );
            })}
          </ul>
            </div>
          </div>
        )}
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
          <Route  path='/home' index element={<Home/>}/>
          <Route path='/flights' element={<Flight/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>

          </Routes>
        </main>
        </Router>
    </>
  );
}

export default Navbar;
