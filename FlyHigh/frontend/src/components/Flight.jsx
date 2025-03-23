import { useState, useEffect, useCallback } from "react";
import {
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  PlaneLanding,
  PlaneTakeoff,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import { PiAirplaneInFlight } from "react-icons/pi";
import FlightFilters from "./FlightFilter";

const STATUS_VARIANTS = {
  onTime: "bg-green-100 text-green-800",
  delayed: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  boarding: "bg-blue-100 text-blue-800",
  landed: "bg-purple-100 text-purple-800"
};

const Badge = ({ children, variant = "onTime" }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      STATUS_VARIANTS[variant] || STATUS_VARIANTS.onTime
    }`}
  >
    {children}
  </span>
);

const FlightTimetable = () => {
  const [activeView, setActiveView] = useState("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);

  // Fetch flight data
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8081/api/flights");
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        setFlights(data);
        setFilteredFlights(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setError("Unable to load flight data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFlights();
  }, []);

  // Handle search/filtering
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFlights(flights);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const results = flights.filter(flight => 
      flight?.flightNumber?.toLowerCase().includes(lowercasedSearch) ||
      flight?.airline?.airlineName?.toLowerCase().includes(lowercasedSearch) ||
      flight?.route?.originAirport?.airportName?.toLowerCase().includes(lowercasedSearch) ||
      flight?.route?.destinationAirport?.airportName?.toLowerCase().includes(lowercasedSearch)
    );
    
    setFilteredFlights(results);
    
    // Reset carousel index if needed
    if (currentIndex >= results.length && results.length > 0) {
      setCurrentIndex(0);
    }
  }, [searchTerm, flights, currentIndex]);

  // Carousel auto-rotation
  useEffect(() => {
    if (!autoPlay || filteredFlights.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % filteredFlights.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [autoPlay, filteredFlights.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (filteredFlights.length <= 1) return;
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredFlights.length);
  }, [filteredFlights.length]);

  const goToPrevious = useCallback(() => {
    if (filteredFlights.length <= 1) return;
    setCurrentIndex(prevIndex => (prevIndex - 1 + filteredFlights.length) % filteredFlights.length);
  }, [filteredFlights.length]);

  // Format date helper
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Flight status helper (simulated - would be part of actual data)
  const getFlightStatus = (flight) => {
    // This would normally come from the API
    const statuses = ["onTime", "delayed", "boarding", "landed", "cancelled"];
    const randomIndex = flight?.flightId % statuses.length;
    return statuses[randomIndex];
  };

  const FlightCard = ({ flight }) => {
    if (!flight) return <div className="p-6 text-center">No flight selected</div>;
    
    const status = getFlightStatus(flight);
    const statusText = {
      onTime: "On Time",
      delayed: "Delayed",
      boarding: "Boarding",
      landed: "Landed",
      cancelled: "Cancelled"
    }[status];

    return (
      
      
      <div className="bg-white rounded-lg border p-6 shadow-lg transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
              <PiAirplaneInFlight size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{flight?.flightNumber || "N/A"}</h3>
              <p className="text-sm text-gray-500">{flight?.airline?.airlineName || "Unknown Airline"}</p>
            </div>
          </div>
          <Badge variant={status}>{statusText}</Badge>
        </div>
    
        <div className="flex flex-col md:flex-row gap-8 my-6">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="min-w-8 pt-1">
                <PlaneTakeoff className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium text-lg">
                  {flight?.route?.originAirport?.city || "Unknown Airport"}
                </p>
                <p className="text-sm font-medium">
                  {formatDateTime(flight?.departureTime)}
                </p>
              </div>
            </div>
            
            <div className="mx-8 my-4 border-l-2 border-dashed border-gray-300 h-10" />
            
            <div className="flex items-start gap-4">
              <div className="min-w-8 pt-1">
                <PlaneLanding className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium text-lg">
                  {flight?.route?.destinationAirport?.city || "Unknown Airport"}
                </p>
                <p className="text-sm font-medium">
                  {formatDateTime(flight?.arrivalTime)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-gray-500">Flight Duration</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="font-medium">
                    {flight?.route?.flightTime ? `${flight.route.flightTime} min` : "N/A"}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Available Seats</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="font-medium">{flight?.availableSeats || 0}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium text-lg text-blue-600">
                  ₹{flight?.ticketPrice?.toLocaleString() || "N/A"}
                </p>
              </div>
              
              <div className="flex items-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TimeTable = () => (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrival</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => {
              const status = getFlightStatus(flight);
              return (
                <tr key={flight.flightId} className="hover:bg-gray-50">+
                  <td className="px-6 py-4 font-medium">{flight.flightNumber}</td>
                  <td className="px-6 py-4">{flight.airline?.airlineName}</td>
                  <td className="px-6 py-4">{flight.route?.originAirport?.city}</td>
                  <td className="px-6 py-4">{flight.route?.destinationAirport?.city}</td>
                  <td className="px-6 py-4">{formatDateTime(flight.departureTime)}</td>
                  <td className="px-6 py-4">{formatDateTime(flight.arrivalTime)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={status}>
                      {status === "onTime" ? "On Time" : 
                       status === "delayed" ? "Delayed" :
                       status === "boarding" ? "Boarding" :
                       status === "landed" ? "Landed" : "Cancelled"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{flight.availableSeats}</td>
                  <td className="px-6 py-4 font-medium">₹{flight.ticketPrice?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded transition-colors">
                      Book
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                No flights match your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-4 max-w-6xl mx-auto flex justify-center items-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading flight information...</p>
        </div>
      </div>
    );
  }
    <FlightFilters/>
  // Error state
  if (error) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">
          Flight Information</h2>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative">
          
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
          
          <div className="flex rounded-lg border divide-x">
            <button
              onClick={() => setActiveView("carousel")}
              className={`px-4 py-2 ${activeView === "carousel" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              Card View
            </button>
            <button
              onClick={() => setActiveView("timetable")}
              className={`px-4 py-2 ${activeView === "timetable" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>
      <FlightFilters/>
      {activeView === "carousel" ? (
        <>
          {filteredFlights.length > 0 ? (
            <div className="relative">
              <FlightCard flight={filteredFlights[currentIndex]} />
              
              {filteredFlights.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevious} 
                    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous flight"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-500" />
                  </button>
                  
                  <button 
                    onClick={goToNext} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next flight"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-500" />
                  </button>
                  
                  <div className="flex justify-center mt-4 gap-2">
                    {filteredFlights.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full ${
                          currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        aria-label={`Go to flight ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`text-sm ${
                        autoPlay ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {autoPlay ? "Pause Autoplay" : "Start Autoplay"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 shadow-lg text-center">
              <p className="text-gray-500">No flights match your search criteria</p>
            </div>
          )}
        </>
      ) : (
        <TimeTable />
      )}
      
    </div>
  );
};

export default FlightTimetable;