"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Clock, Info, Star, Utensils } from "lucide-react";

// Replace the shadcn Button import with a custom button component
// since the @/components/ui/button path is not resolving
const Button = ({ children, className, onClick, variant }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variantStyles = variant === "outline" 
    ? "border border-gray-300 text-gray-700 hover:bg-gray-50" 
    : "bg-blue-500 text-white hover:bg-blue-600";
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Replace the cn utility with a simple implementation
// since @/lib/utils is not resolving
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Simplified PassengerDetailsModal component
const PassengerDetailsModal = ({ onClose, flightDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
        {flightDetails && (
          <div className="mb-4">
            <p className="font-semibold">{flightDetails.airline} {flightDetails.flightNumber}</p>
            <p className="text-sm text-gray-600">
              {flightDetails.departureCode} {flightDetails.departureTime} → {flightDetails.arrivalCode} {flightDetails.arrivalTime}
            </p>
            <p className="text-sm text-gray-600">Price: ₹{flightDetails.price}</p>
          </div>
        )}
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="mt-1 w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input type="tel" className="mt-1 w-full border rounded-md p-2" />
          </div>
        </form>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const flightData = [
  {
    id: 1,
    airline: "Akasa Air",
    flightNumber: "QP1544",
    departureTime: "02:40",
    departureCode: "DEL",
    arrivalTime: "05:05",
    arrivalCode: "BOM",
    duration: "2h 25m",
    stops: "Non stop",
    price: 5273,
    extraFee: 0,
    cheapest: true,
    freeMeal: false,
    bestValue: false,
    fastest: false,
  },
  {
    id: 2,
    airline: "Air India",
    flightNumber: "AI2575",
    departureTime: "06:15",
    departureCode: "DEL",
    arrivalTime: "08:25",
    arrivalCode: "BOM",
    duration: "2h 10m",
    stops: "Non stop",
    price: 5465,
    extraFee: 175,
    cheapest: false,
    freeMeal: true,
    bestValue: true,
    fastest: true,
  },
];

const dateTabs = [
  { date: "Fri, 28 Mar", price: "₹5,022" },
  { date: "Sat, 29 Mar", price: "₹5,273", selected: true },
  { date: "Sun, 30 Mar", price: "₹5,273" },
  { date: "Mon, 31 Mar", price: "₹5,499" },
];

const FlightResults = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [expandedFlights, setExpandedFlights] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Sat, 29 Mar");
  const [sortBy, setSortBy] = useState("price");
  const scrollRef = useRef(null);

  const toggleFlightDetails = (flightId) => {
    setExpandedFlights((prev) =>
      prev.includes(flightId) ? prev.filter((id) => id !== flightId) : [...prev, flightId]
    );
  };

  const handleBookClick = (flightId) => {
    setSelectedFlight(flightId);
    setShowPassengerModal(true);
  };

  const handleTabChange = (date) => {
    setSelectedTab(date);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const sortedFlights = [...flightData].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "fastest") {
      // Convert duration like "2h 25m" to minutes for comparison
      const getMinutes = (duration) => {
        const match = duration.match(/(\d+)h\s+(\d+)m/);
        if (match) {
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return 0;
      };
      return getMinutes(a.duration) - getMinutes(b.duration);
    }
    if (sortBy === "departure") return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Date Tabs */}
      <div className="border-b relative flex items-center">
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
        >
          <ArrowRight className="rotate-180 h-4 w-4" />
        </button>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto py-2 mx-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dateTabs.map((tab, index) => (
            <div
              key={index}
              className={cn(
                "px-4 py-2 cursor-pointer flex-shrink-0 text-center mx-1 rounded transition-colors",
                tab.date === selectedTab 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-blue-50"
              )}
              onClick={() => handleTabChange(tab.date)}
            >
              <div>{tab.date}</div>
              <div className="text-sm">{tab.price}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Sort Options */}
      <div className="border-b px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-medium">Sort by:</span>
        <div className="flex gap-2">
          {[
            { id: "price", label: "Price" },
            { id: "fastest", label: "Duration" },
            { id: "departure", label: "Departure" }
          ].map((option) => (
            <button
              key={option.id}
              className={cn(
                "px-3 py-1 text-sm border rounded transition-colors",
                sortBy === option.id 
                  ? "bg-blue-500 text-white border-blue-500" 
                  : "text-gray-700 hover:bg-gray-50 border-gray-300"
              )}
              onClick={() => setSortBy(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flight Results */}
      <div className="divide-y">
        {sortedFlights.map((flight) => (
          <div key={flight.id}>
            <motion.div
              className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <p className="font-medium">{flight.airline} <span className="text-sm text-gray-500">{flight.flightNumber}</span></p>
                <p className="text-sm text-gray-700">
                  {flight.departureTime} <span className="text-xs text-gray-500">{flight.departureCode}</span> - 
                  {flight.arrivalTime} <span className="text-xs text-gray-500">{flight.arrivalCode}</span>
                </p>
                <p className="text-xs text-gray-500">{flight.duration} • {flight.stops}</p>
                
                {flight.cheapest && (
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <Check className="h-3 w-3 mr-1" /> Cheapest
                  </div>
                )}
                {flight.fastest && (
                  <div className="flex items-center text-blue-600 text-xs mt-1">
                    <Clock className="h-3 w-3 mr-1" /> Fastest
                  </div>
                )}
                {flight.freeMeal && (
                  <div className="flex items-center text-amber-600 text-xs mt-1">
                    <Utensils className="h-3 w-3 mr-1" /> Free meal
                  </div>
                )}
              </div>

              <div className="text-right ml-auto">
                <p className="font-bold text-lg">₹{flight.price}</p>
                {flight.extraFee > 0 && (
                  <p className="text-xs text-gray-500">+₹{flight.extraFee} fee</p>
                )}
                <button
                  className="text-blue-500 text-xs mt-1 hover:underline flex items-center justify-end"
                  onClick={() => toggleFlightDetails(flight.id)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  {expandedFlights.includes(flight.id) ? "Hide" : "View"} Details
                </button>
              </div>

              <Button
                className="w-full sm:w-auto"
                onClick={() => handleBookClick(flight.id)}
              >
                Book Now
              </Button>
            </motion.div>

            {/* Expanded flight details */}
            <AnimatePresence>
              {expandedFlights.includes(flight.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 p-4 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">Flight Details</h4>
                      <p className="text-xs text-gray-600">Aircraft: Boeing 737-800</p>
                      <p className="text-xs text-gray-600">Baggage: 15kg check-in, 7kg cabin</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Departure</h4>
                      <p className="text-xs text-gray-600">Terminal: T1</p>
                      <p className="text-xs text-gray-600">Gate: Information available 2hrs before departure</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Arrival</h4>
                      <p className="text-xs text-gray-600">Terminal: T2</p>
                      <p className="text-xs text-gray-600">Baggage claim: Belt 3-7</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Passenger Modal */}
      <AnimatePresence>
        {showPassengerModal && (
          <PassengerDetailsModal
            onClose={() => setShowPassengerModal(false)}
            flightDetails={flightData.find((flight) => flight.id === selectedFlight)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FlightResults;