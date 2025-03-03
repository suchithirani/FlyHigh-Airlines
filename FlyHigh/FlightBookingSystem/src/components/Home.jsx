import React, { useState } from 'react';
import { Search, Plane, MapPin, Calendar, ChevronRight, Star, ArrowRightCircle } from 'lucide-react';
import { Card, CardContent, TextField, Button, MenuItem, Select, InputLabel, FormControl, Rating, Slider } from '@mui/material';
import { cyan } from '@mui/material/colors';
const Home = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [sortOption, setSortOption] = useState('price');
  const [priceRange, setPriceRange] = useState([100, 1000]);

  const featuredDestinations = [
    { 
      name: 'Paris, France', 
      price: 599,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      rating: 4.5
    },
    { 
      name: 'Tokyo, Japan', 
      price: 899,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      rating: 4.7
    },
    { 
      name: 'New York, USA', 
      price: 399,
      image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620',
      rating: 4.2
    },
    {
      name: 'Agra, India', 
      price: 199,
      image: 'https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.3
    },
    {
      name: 'Moscow, Russia', 
      price: 999,
      image: 'https://plus.unsplash.com/premium_photo-1697729939290-40a6275148cd?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.6
    },
    {
      name: 'Dubai, UAE', 
      price: 899,
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8
    }
  ];

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Sort destinations based on the selected sort option
  const sortedDestinations = [...featuredDestinations].sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-cyan-600 p-8 text-white">
        <div className="container mx-auto">
          <div className="h-12 w-36 bg-white/20 rounded mb-6"></div>
          <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl text-blue-100">Fly to over 100+ destinations worldwide</p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-16">
        <Card className="p-6 mb-12 shadow-xl">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <TextField
                  label="Departure City"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: <MapPin className="mr-2 text-gray-400" />
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Arrival City"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: <MapPin className="mr-2 text-gray-400" />
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Departure"
                  type="date"
                  variant="outlined"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <Calendar className="mr-2 text-gray-400" />
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Return"
                  type="date"
                  variant="outlined"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <Calendar className="mr-2 text-gray-400" />
                  }}
                />
              </div>
            </div>

            <div className="mt-6 text-center ">
              <Button variant="contained" className="px-8 py-3" style={{ background: "#00acc1" }}>
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </Button>
            </div>

            <FormControl fullWidth className="mt-6">
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                label="Currency"
                style={{ fontSize: '1.25rem' }} // Increased font size
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>

            <div className="mt-6">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                label="Sort By"
                fullWidth
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </div>

            <div className="mt-6">
              <InputLabel>Price Range</InputLabel>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={100}
                max={2000}
              />
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedDestinations.map((dest, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer animate-floating">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100"></div>
                  <div
                    className="w-full h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${dest.image})` }}
                    role="img"
                    aria-label={dest.name}
                  ></div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">From ${dest.price}</span>
                    <div className="flex items-center">
                      <Rating value={dest.rating} readOnly size="small" />
                      <span className="ml-2 text-gray-600">({dest.rating})</span>
                    </div>
                    <Button variant="outlined" size="small">
                      <Plane className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-blue-50 rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose FlyHigh?</h2>
            <p className="text-gray-600 mb-8">
              Experience premium service, competitive prices, and unforgettable journeys 
              with our award-winning airline. re committed to making your travel 
              dreams come true.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['24/7 Support', 'Best Prices', 'Safe Travel'].map((feature, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FlyHigh Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;