import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane, Calendar, Clock, CreditCard, User, MapPin } from 'lucide-react';

const FlightBookingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample data for carousel slides
  const carouselSlides = [
    {
      id: 1,
      image: "/api/placeholder/1200/400",
      title: "Best Flight Deals",
      description: "Explore our limited-time offers on international flights"
    },
    {
      id: 2,
      image: "/api/placeholder/1200/400",
      title: "Vacation Packages",
      description: "Bundle your flight and hotel for extra savings"
    },
    {
      id: 3,
      image: "/api/placeholder/1200/400",
      title: "Business Class Upgrades",
      description: "Treat yourself to premium travel at special rates"
    }
  ];

  // Sample flight data
  const flightData = {
    bookingId: "BK78945231",
    status: "Confirmed",
    outbound: {
      flightNumber: "UA1234",
      airline: "United Airlines",
      departureDate: "March 25, 2025",
      departureTime: "08:45 AM",
      departureAirport: "JFK - New York",
      arrivalTime: "11:30 AM",
      arrivalAirport: "LAX - Los Angeles",
      duration: "5h 45m",
      aircraft: "Boeing 787",
      cabin: "Economy",
      terminal: "Terminal 4, Gate B12"
    },
    inbound: {
      flightNumber: "UA2468",
      airline: "United Airlines",
      departureDate: "April 01, 2025",
      departureTime: "02:15 PM",
      departureAirport: "LAX - Los Angeles",
      arrivalTime: "10:40 PM",
      arrivalAirport: "JFK - New York",
      duration: "5h 25m",
      aircraft: "Boeing 787",
      cabin: "Economy",
      terminal: "Terminal 5, Gate C22"
    },
    price: {
      base: 540,
      taxes: 78.50,
      fees: 25,
      total: 643.50
    },
    passenger: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567"
    }
  };
  useEffect(() => {console.log("booking page")}, []);
  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  // Flight card component
  const FlightCard = ({ flight, direction }) => (
    
   
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-2 text-indigo-600">
          <Plane className="h-5 w-5" />
          <span className="font-medium">{direction} Flight</span>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">
          {flight.flightNumber}
        </div>
      </div>
      
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-2xl font-bold">{flight.departureTime}</div>
          <div className="text-gray-500 text-sm">{flight.departureAirport}</div>
        </div>
        
        <div className="flex flex-col items-center px-4">
          <div className="text-gray-400 text-xs">{flight.duration}</div>
          <div className="w-32 h-0.5 bg-gray-300 my-2 relative">
            <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-blue-600"></div>
            <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
          <div className="text-xs text-gray-500">Direct</div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">{flight.arrivalTime}</div>
          <div className="text-gray-500 text-sm">{flight.arrivalAirport}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-dashed border-gray-200">
        <div>
          <div className="text-gray-500 text-xs">Date</div>
          <div className="font-medium">{flight.departureDate}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Airline</div>
          <div className="font-medium">{flight.airline}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Aircraft</div>
          <div className="font-medium">{flight.aircraft}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Class</div>
          <div className="font-medium">{flight.cabin}</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{flight.terminal}</span>
        </div>
      </div>
    </div>
  );

  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Flight Booking Details</h1>
          <p className="text-gray-500">Your journey is just a few clicks away</p>
        </header>
        
        {/* Carousel */}
        <div className="relative h-56 md:h-64 lg:h-80 mb-8 overflow-hidden rounded-xl shadow-md">
          <div 
            className="flex h-full transition-transform duration-500 ease-out" 
            style={`{ transform: translateX(-${currentSlide * 100}%) }`}
          >
            {carouselSlides.map((slide) => (
              <div 
                key={slide.id} 
                className="min-w-full h-full relative"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white p-4 max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-sm md:text-base">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-gray-800 transition-all duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-gray-800 transition-all duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Booking Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Booking Reference</h2>
            <div className="flex items-center mt-1">
              <span className="text-indigo-600 font-mono font-bold text-lg">{flightData.bookingId}</span>
              <span className="ml-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {flightData.status}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Booking
            </button>
            <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </button>
          </div>
        </div>
        
        {/* Passenger Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            Passenger Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Passenger Name</div>
              <div className="font-medium">{flightData.passenger.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="font-medium">{flightData.passenger.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Phone</div>
              <div className="font-medium">{flightData.passenger.phone}</div>
            </div>
          </div>
        </div>
        
        {/* Flight Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Flight Details</h3>
          
          {/* Outbound Flight */}
          <div>
            <div className="flex items-center mb-4 text-indigo-600">
              <Plane className="w-5 h-5 mr-2 rotate-45" />
              <span className="font-medium">Outbound Journey</span>
            </div>
            <FlightCard flight={flightData.outbound} direction="Outbound" />
          </div>
          
          {/* Inbound Flight */}
          <div>
            <div className="flex items-center mb-4 text-indigo-600">
              <Plane className="w-5 h-5 mr-2 -rotate-45" />
              <span className="font-medium">Return Journey</span>
            </div>
            <FlightCard flight={flightData.inbound} direction="Return" />
          </div>
        </div>
        
        {/* Price Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
              Price Details
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base fare</span>
                <span>${flightData.price.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>${flightData.price.taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fees & surcharges</span>
                <span>${flightData.price.fees.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-indigo-600">${flightData.price.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with call to action */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Need help with your booking?</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
        
  );
};

export default FlightBookingPage;