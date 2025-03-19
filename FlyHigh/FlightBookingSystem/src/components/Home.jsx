import React, { useState, useRef, useEffect } from 'react';
import { Search, Plane, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, TextField, Button, MenuItem, Select, InputLabel, FormControl, Rating } from '@mui/material';
import destinations from '../mockData/Destination';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination === selectedDestination ? null : destination);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 120; // Approximate width of one item plus margin
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  function bookFlight() {
    navigate('/booking');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-blue-900 p-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-xl text-blue-300">Fly to over 100+ destinations worldwide</p>
      </header>

      <main className="container mx-auto px-4 mt-8">
        <Card className="bg-blue-800 text-white p-8 shadow-xl rounded-lg">
          <CardContent>
            <h2 className="text-3xl font-semibold mb-4 text-center">Search Flights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextField label="Departure City" variant="outlined" fullWidth InputProps={{ startAdornment: <MapPin className="mr-2 text-gray-400" /> }} />
              <TextField label="Arrival City" variant="outlined" fullWidth InputProps={{ startAdornment: <MapPin className="mr-2 text-gray-400" /> }} />
              <TextField label="Departure" type="date" variant="outlined" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
              <TextField label="Return" type="date" variant="outlined" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </div>
            <div className="mt-6 text-center">
              <Button variant="contained" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500">
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </Button>
            </div>
            <FormControl fullWidth className="mt-6">
              <InputLabel>Currency</InputLabel>
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)} label="Currency">
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Replaced Featured Destinations with Instagram Story-like carousel */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Destinations</h2>
          
          {/* Instagram Story-like Carousel */}
          <div className="relative px-8">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-4 space-x-4 hide-scrollbar scroll-smooth snap-x"
            >
              {destinations.map((dest) => (
                <div 
                  key={dest.code} 
                  className="flex-shrink-0 cursor-pointer transition-all duration-300 snap-center"
                  onClick={() => handleDestinationClick(dest)}
                >
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-4 flex items-center justify-center relative ${selectedDestination === dest ? 'border-cyan-400 scale-110' : 'border-blue-500'}`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-70"></div>
                    <div className="relative z-10 text-white font-bold text-xl">{dest.code}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Left/Right navigation arrows */}
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-white transition-all duration-200 shadow-lg"
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-white transition-all duration-200 shadow-lg"
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Expanded destination view */}
          {selectedDestination && (
            <div className="mt-8 bg-blue-700 rounded-lg overflow-hidden transition-all duration-500 transform animate-fadeIn shadow-xl">
              <div className="relative">
                <div className="w-full h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${selectedDestination.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white">{selectedDestination.name}</h3>
                  <p className="text-xl text-blue-200">From ${selectedDestination.price}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="contained" 
                    className="bg-blue-500 hover:bg-blue-400"
                    onClick={bookFlight}
                  >
                    <Plane className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white">Experience the beauty and charm of {selectedDestination.name}. Book your flight today and enjoy special discounts!</p>
                <div className="mt-2 flex items-center">
                  <Rating value={4.5} readOnly size="small" />
                  <span className="ml-2 text-blue-300">(4.5)</span>
                </div>
                
                {/* Image carousel for selected destination */}
                <div className="mt-6">
                  <h4 className="text-xl font-semibold mb-3">Gallery</h4>
                  <div className="relative">
                    <div className="flex space-x-3 overflow-x-auto pb-4 hide-scrollbar">
                      {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-blue-400">
                            {/* Placeholder for destination images */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Quick info section */}

              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-blue-950 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>FAQs</li>
                <li>Contact Us</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* CSS for hiding scrollbar but allowing scroll */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;