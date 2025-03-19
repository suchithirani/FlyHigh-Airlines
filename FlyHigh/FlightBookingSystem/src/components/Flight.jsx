import { useState, useEffect } from "react";
import {
  Plane,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  PlaneLanding,
  PlaneTakeoff,
} from "lucide-react";
import { PiAirplaneInFlight } from "react-icons/pi";
import FlightFilter from "./FlightFilter";

const Badge = ({ children, variant = "default" }) => (
  <span
    className={`px-2 py-1 rounded-full text-sm font-medium 
    ${variant === "default" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
  >
    {children}
  </span>
);

const FlightTimetable = () => {
  const [activeView, setActiveView] = useState("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [flights] = useState([
    {
      id: 1,
      flightNumber: "FL123",
      origin: "New York (JFK)",
      destination: "London (LHR)",
      departureTime: "09:00",
      arrivalTime: "21:00",
      availableSeats: "45",
      terminal: "T1",
      status: "On Time",
      type: "Departure",
      aircraft: "Boeing 787",
      airline: "Global Airways",
      duration: "7h 30m",
      arrivalTerminal: "T5",
    },
    {
      id: 2,
      flightNumber: "FL456",
      origin: "Paris (CDG)",
      destination: "Tokyo (NRT)",
      departureTime: "11:30",
      arrivalTime: "14:30",
      availableSeats: "60",
      terminal: "T2",
      status: "Delayed",
      type: "Arrival",
      aircraft: "Airbus A350",
      airline: "Sky Connect",
      duration: "12h 0m",
      arrivalTerminal: "T3",
    },
    {
      id: 3,
      flightNumber: "FL789",
      origin: "Dubai (DXB)",
      destination: "Singapore (SIN)",
      departureTime: "15:45",
      arrivalTime: "04:30",
      availableSeats: "120",
      terminal: "T3",
      status: "On Time",
      type: "Departure",
      aircraft: "Boeing 777",
      airline: "Star Airlines",
      duration: "7h 45m",
      arrivalTerminal: "T4",
    },
    {
      id: 4,
      flightNumber: "FL018",
      origin: "Mumbai(BOM)",
      destination: "Agatti (AGX)",
      departureTime: "7:30",
      arrivalTime: "01:30",
      availableSeats: "30",
      terminal: "T2",
      status: "On Time",
      type: "Departure",
      aircraft: "FLY91",
      airline: "Indigo",
      duration: "5h 0m",
      arrivalTerminal: "T2",
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flights.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [flights.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flights.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flights.length) % flights.length);
  };

  const TerminalMap = ({ terminal }) => (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-4">
        <h3 className="font-semibold mb-2">Terminal {terminal}</h3>
        <div className="grid grid-cols-3 gap-2 h-full">
          <div className="bg-blue-100 p-2 text-sm">Gates A1-A5</div>
          <div className="bg-green-100 p-2 text-sm">Security</div>
          <div className="bg-yellow-100 p-2 text-sm">Gates B1-B5</div>
          <div className="bg-purple-100 p-2 text-sm">Restaurants</div>
          <div className="bg-red-100 p-2 text-sm">Shops</div>
          <div className="bg-orange-100 p-2 text-sm">Services</div>
        </div>
      </div>
    </div>
  );

  const FlightCard = ({ flight }) => (
    <div className="bg-white rounded-lg border p-6 shadow-lg transition-all transform hover:scale-105">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {flight.type === "Departure" ? (
            <PlaneTakeoff className="text-blue-500" />
          ) : flight.type === "Arrival" ? (
            <PlaneLanding className="text-green-500" />
          ) : (
            <PiAirplaneInFlight className="text-yellow-500 size-7" />
          )}

          <div>
            <h3 className="text-xl font-semibold">{`Flight ${flight.flightNumber}`}</h3>
            <p className="text-sm text-gray-500">{flight.airline}</p>
          </div>
        </div>
        <Badge variant={flight.status === "On Time" ? "default" : "secondary"}>{flight.status}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">From</p>
            <p className="font-medium">{flight.origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium">{flight.destination}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Departure</p>
              <p className="font-medium">{flight.departureTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Arrival</p>
              <p className="font-medium">{flight.arrivalTime}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Available Seats</p>
            <p className="font-medium">{flight.availableSeats}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Terminal</p>
            <p className="font-medium">{flight.terminal}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Aircraft</p>
            <p className="font-medium">{flight.aircraft}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TerminalMap terminal={flight.terminal} />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Flight Duration</p>
        <p className="font-medium">{flight.duration}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">Arrival Terminal</p>
        <p className="font-medium">{flight.arrivalTerminal}</p>
      </div>
    </div>
  );

  const TimeTable = () => (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrival</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available Seats</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td className="px-6 py-4">{flight.type === "Departure" ? <PlaneTakeoff className="text-blue-500" /> : flight.type === "Arrival" ? <PlaneLanding className="text-green-500" /> : <PiAirplaneInFlight className="text-yellow-500 size-7" />}</td>
              <td className="px-6 py-4 font-medium">{flight.flightNumber}</td>
              <td className="px-6 py-4">{flight.airline}</td>
              <td className="px-6 py-4">{flight.origin}</td>
              <td className="px-6 py-4">{flight.destination}</td>
              <td className="px-6 py-4">{flight.departureTime}</td>
              <td className="px-6 py-4">{flight.arrivalTime}</td>
              <td className="px-6 py-4">{flight.availableSeats}</td>
              <td className="px-6 py-4">
                <Badge variant={flight.status === "On Time" ? "default" : "secondary"}>{flight.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl font-bold mr-24">Flight Information</h2>
        <div className="flex gap-4 items-center">
          <div className="flex rounded-lg border divide-x">
            <button
              onClick={() => setActiveView("carousel")}
              className={`px-4 py-2 ${activeView === "carousel" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              Carousel View
            </button>
            <button
              onClick={() => setActiveView("timetable")}
              className={`px-4 py-2 ${activeView === "timetable" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              Timetable
            </button>
          </div>
        </div>
      </div>

      {activeView === "carousel" ? (
        <div className="relative">
          <div className="transition-opacity duration-500">
            {flights.length > 0 && <FlightCard flight={flights[currentIndex]} />}
          </div>

          {flights.length > 1 && (
            <>
              <button
                className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow-sm hover:bg-gray-50"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow-sm hover:bg-gray-50"
                onClick={goToNext}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="flex justify-center gap-2 mt-4">
            {flights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <TimeTable />
      )}
    </div>
  );
};

export default FlightTimetable;