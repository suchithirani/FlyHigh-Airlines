import { useState, useEffect } from "react";
import { FaSearch, FaExchangeAlt, FaCaretDown, FaAngleLeft, FaAngleRight, FaPlane, FaLock, FaInfoCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "./Filter";
import BookFlights from "./BookFlights";

const Home = () => {
  // State for form data
  const [formData, setFormData] = useState({
    from: "DEL - New Delhi",
    to: "BOM - Mumbai",
    departureDate: new Date(),
    returnDate: null,
    travellers: "1 Traveller, Economy",
  });

  // State for trip type
  const [tripType, setTripType] = useState("oneWay");

  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

  // State for date tabs
  const [sortBy, setSortBy] = useState("price");
  const [showDropdown, setShowDropdown] = useState(false);

  // State for search
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState({
    from: "DEL - New Delhi",
    to: "BOM - Mumbai",
  });

  // State for travellers & class modal
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  // Airport options
  const airports = [
    "DEL - New Delhi",
    "BOM - Mumbai",
    "BLR - Bangalore",
    "HYD - Hyderabad",
    "CCU - Kolkata",
    "MAA - Chennai",
    "AMD - Ahmedabad",
    "PNQ - Pune",
    "GOI - Goa",
    "JAI - Jaipur",
  ];

  // State for flights fetched from the backend
  const [allFlights, setAllFlights] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Fetch flights from the backend API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/flights");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        setAllFlights(data);
        setDisplayedFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // State for filters
  const [timeFilters, setTimeFilters] = useState({
    earlyMorning: false,
    morning: false,
    midDay: false,
    night: false,
  });

  const [stops, setStops] = useState({
    nonStop: false,
    oneStop: false,
  });

  const [priceRange, setPriceRange] = useState({
    min: 5273,
    max: 17712,
    current: 10000,
  });

  const [airlines, setAirlines] = useState([
    { id: 1, name: "Air India", price: "₹5,465", selected: false },
    { id: 2, name: "Air India Express", price: "₹7,083", selected: false },
    { id: 3, name: "FlyHigh", price: "₹5,273", selected: false },
    { id: 4, name: "IndiGo", price: "₹5,499", selected: false },
    { id: 5, name: "SpiceJet", price: "₹6,201", selected: false },
    { id: 6, name: "Vistara", price: "₹5,872", selected: false },
    { id: 7, name: "Go Air", price: "₹5,399", selected: false },
  ]);

  // Handle time filter selection
  const toggleTimeFilter = (filterName) => {
    setTimeFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
    filterFlights(allFlights);
  };

  // Handle airline filter selection
  const toggleAirline = (airlineId) => {
    setAirlines((prev) =>
      prev.map((airline) =>
        airline.id === airlineId
          ? { ...airline, selected: !airline.selected }
          : airline
      )
    );
    filterFlights(allFlights);
  };

  // Handle stop filter selection
  const toggleStop = (stopType) => {
    setStops((prev) => ({
      ...prev,
      [stopType]: !prev[stopType],
    }));
    filterFlights(allFlights);
  };

  // Handle price range change
  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    filterFlights(allFlights);
  };

  // Filter flights based on active filters
  const filterFlights = (flights) => {
    let filteredFlights = flights;

    // Filter by time
    const activeTimeFilters = Object.entries(timeFilters)
      .filter(([, isActive]) => isActive)
      .map(([filter]) => filter);

    if (activeTimeFilters.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        activeTimeFilters.includes(flight.timeFilter)
      );
    }

    // Filter by stops
    if (stops.nonStop) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.type === "Non stop"
      );
    }
    if (stops.oneStop) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.type === "1 Stop"
      );
    }

    // Filter by price
    filteredFlights = filteredFlights.filter(
      (flight) => parseFloat(flight.ticketPrice) <= priceRange.current
    );

    // Filter by airlines
    const selectedAirlines = airlines
      .filter((airline) => airline.selected)
      .map((airline) => airline.name);

    if (selectedAirlines.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        selectedAirlines.includes(flight.airline.airlineName)
      );
    }

    setDisplayedFlights(filteredFlights);
  };

  // Handle form submission (search)
  const handleSearch = () => {
    setHasSearched(true);
    setSearchResults({
      from: formData.from,
      to: formData.to,
    });
  };

  // Swap origin and destination
  const swapLocations = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from,
    });
  };

  // Handle travellers & class change
  const handleTravellersChange = (type, value) => {
    if (type === "travellers") {
      setTravellers(value);
    } else if (type === "class") {
      setTravelClass(value);
    }
  };

  // Update form data with travellers & class
  const updateTravellers = () => {
    setFormData({
      ...formData,
      travellers: `${travellers} Traveller${
        travellers > 1 ? "s" : ""
      }, ${travelClass}`,
    });
    setShowDropdown(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-4">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6">
        {/* Trip Type Selector */}
        <div className="flex mb-4 border border-gray-300 rounded-lg overflow-hidden w-fit">
          <button
            className={`px-4 py-2 text-sm md:text-base ${
              tripType === "oneWay" ? "bg-orange-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTripType("oneWay")}
          >
            One Way
          </button>
          <button
            className={`px-4 py-2 text-sm md:text-base ${
              tripType === "roundTrip"
                ? "bg-orange-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setTripType("roundTrip")}
          >
            Round Trip
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-4">
          {/* From-To Fields */}
          <div className="flex items-center gap-2 flex-grow">
            <div className="flex flex-col flex-grow">
              <label className="text-xs text-gray-500 mb-1">From</label>
              <select
                className="border border-gray-300 rounded p-2 text-sm"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
              >
                {airports.map((airport, index) => (
                  <option key={index} value={airport}>
                    {airport}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={swapLocations}
            >
              <FaExchangeAlt className="text-gray-500" />
            </button>

            <div className="flex flex-col flex-grow">
              <label className="text-xs text-gray-500 mb-1">To</label>
              <select
                className="border border-gray-300 rounded p-2 text-sm"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
              >
                {airports.map((airport, index) => (
                  <option key={index} value={airport}>
                    {airport}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex flex-col w-full md:w-auto md:flex-grow">
            <label className="text-xs text-gray-500 mb-1">Departure</label>
            <DatePicker
              selected={formData.departureDate}
              onChange={(date) =>
                setFormData({ ...formData, departureDate: date })
              }
              className="border border-gray-300 rounded p-2 text-sm w-full"
              minDate={new Date()}
            />
          </div>

          {/* Return Date - Only shown for Round Trip */}
          {tripType === "roundTrip" && (
            <div className="flex flex-col w-full md:w-auto md:flex-grow">
              <label className="text-xs text-gray-500 mb-1">Return</label>
              <DatePicker
                selected={formData.returnDate}
                onChange={(date) =>
                  setFormData({ ...formData, returnDate: date })
                }
                className="border border-gray-300 rounded p-2 text-sm w-full"
                minDate={formData.departureDate}
                placeholderText="Select Return Date"
              />
            </div>
          )}

          {/* Travellers & Class Section */}
          <div className="flex flex-col w-full md:w-auto md:flex-grow relative">
            <label className="text-xs text-gray-500 mb-1">
              Travellers & Class
            </label>
            <button
              className="border border-gray-300 rounded p-2 text-sm text-left flex items-center justify-between"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{formData.travellers}</span>
              <FaCaretDown className="text-gray-500" />
            </button>

            {/* Dropdown for Travellers & Class */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4">
                  {/* Travellers */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-2">
                      Travellers
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          handleTravellersChange("travellers", travellers - 1)
                        }
                        disabled={travellers === 1}
                      >
                        -
                      </button>
                      <span>{travellers}</span>
                      <button
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          handleTravellersChange("travellers", travellers + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Class */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-2">Class</label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="class"
                          value="Economy"
                          checked={travelClass === "Economy"}
                          onChange={() =>
                            handleTravellersChange("class", "Economy")
                          }
                        />
                        Economy
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="class"
                          value="Business"
                          checked={travelClass === "Business"}
                          onChange={() =>
                            handleTravellersChange("class", "Business")
                          }
                        />
                        Business
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="class"
                          value="First Class"
                          checked={travelClass === "First Class"}
                          onChange={() =>
                            handleTravellersChange("class", "First Class")
                          }
                        />
                        First Class
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                      onClick={updateTravellers}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            className="bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 w-full md:w-auto"
            onClick={handleSearch}
          >
            Search <FaSearch />
          </button>
        </div>

        {/* Special Fares */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <span className="text-sm text-gray-700">
            Special Fares (Optional):
          </span>
          <div className="flex flex-wrap gap-2">
            <button className="border border-gray-300 rounded-full px-3 py-1 text-xs md:text-sm">
              Student
            </button>
            <button className="border border-gray-300 rounded-full px-3 py-1 text-xs md:text-sm">
              Senior Citizen
            </button>
            <button className="border border-gray-300 rounded-full px-3 py-1 text-xs md:text-sm">
              Armed Forces
            </button>
          </div>
        </div>
      </div>

      {/* Search results notification */}
      {hasSearched && (
        <div className="text-sm font-medium mb-3">
          Showing flights from {searchResults.from.split(" - ")[1]} to{" "}
          {searchResults.to.split(" - ")[1]}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Filters Sidebar */}
        <Filters
          timeFilters={timeFilters}
          toggleTimeFilter={toggleTimeFilter}
          airlines={airlines}
          toggleAirline={toggleAirline}
          stops={stops}
          toggleStop={toggleStop}
          priceRange={priceRange}
          setPriceRange={handlePriceRangeChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Flight Results */}
        <div className="flex-1">
          {/* Date Tabs */}
          <div className="flex bg-white rounded-t-lg overflow-hidden overflow-x-auto">
            <button className="px-2 bg-gray-100 flex items-center">
              <FaAngleLeft />
            </button>

            <button className="px-2 bg-gray-100 flex items-center">
              <FaAngleRight />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap items-center bg-white border-t border-gray-200 p-3">
            <span className="text-sm text-gray-600 mr-4 w-full md:w-auto mb-2 md:mb-0">
              Sort by
            </span>

            <div className="flex flex-1 overflow-x-auto">
              <button
                className={`flex-1 text-center py-2 ${
                  sortBy === "price"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : ""
                }`}
                onClick={() => setSortBy("price")}
              >
                <div className="whitespace-nowrap">Price</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  Low to High
                </div>
              </button>

              <button
                className={`flex-1 text-center py-2 ${
                  sortBy === "fastest"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : ""
                }`}
                onClick={() => setSortBy("fastest")}
              >
                <div className="whitespace-nowrap">Fastest</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  Shortest First
                </div>
              </button>

              <button
                className={`flex-1 text-center py-2 ${
                  sortBy === "departure"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : ""
                }`}
                onClick={() => setSortBy("departure")}
              >
                <div className="whitespace-nowrap">Departure</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  Earliest First
                </div>
              </button>

              <button
                className={`flex-1 text-center py-2 ${
                  sortBy === "smart"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : ""
                }`}
                onClick={() => setSortBy("smart")}
              >
                <div className="whitespace-nowrap">Smart</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  Recommended
                </div>
              </button>
            </div>
          </div>

          {/* Flight Cards */}
          <div className="bg-gray-100 p-4 rounded-b-lg">
            <div className="text-sm text-gray-600 mb-4">
              {displayedFlights.length} Flights Available
            </div>

            {displayedFlights.length > 0 ? (
              displayedFlights.map((flight) => (
                <div
                  key={flight.flightId}
                  className="bg-white rounded-lg mb-4 p-3 relative"
                >
                  {/* Tags */}
                  {flight.cheapest && (
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-tl-lg">
                      Cheapest
                    </div>
                  )}

                  {flight.bestSeller && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-tl-lg">
                      Best Seller
                    </div>
                  )}

                  {flight.freeMeal && (
                    <div className="absolute top-4 left-0 bg-amber-100 text-amber-800 text-xs px-2 py-1">
                      🍽 Free Meal
                    </div>
                  )}

                  {/* Flight Details */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    {/* Airline Info */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          flight.airline.airlineName === "FlyHigh"
                            ? "bg-blue-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {flight.airline.airlineName === "FlyHigh" ? (
                          <FaPlane />
                        ) : (
                          flight.airline.airlineName.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {flight.airline.airlineName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.flightNumber}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 justify-between items-center">
                      {/* Departure */}
                      <div className="text-center">
                        <div className="text-lg font-medium">
                          {new Date(flight.departureTime).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.route.originAirport.airportCode}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col items-center">
                        <div className="text-sm text-gray-500">
                          {flight.route.flightTime} mins
                        </div>
                        <div className="relative w-16 md:w-24 h-px bg-gray-300 my-1">
                          <div className="absolute -top-1 right-0 text-xs">
                            ✈
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.route.distance} km
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <div className="text-lg font-medium">
                          {new Date(flight.arrivalTime).toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.route.destinationAirport.airportCode}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-medium">
                        ₹{flight.ticketPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-600">
                        Extra ₹{Math.floor(Math.random() * 300)} Off
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between border-t border-gray-200 pt-3 gap-2">
                    <div className="text-xs flex items-center gap-1">
                      <FaLock className="text-gray-500" />
                      <span>Lock Price @₹299</span>
                    </div>

                    <button
                      className="bg-blue-600 text-white py-2 px-4 md:px-6 rounded order-last md:order-none w-full md:w-auto"
                      onClick={() => setSelectedFlight(flight)}
                    >
                      Book
                    </button>

                    <div className="text-xs flex items-center gap-1 text-blue-500 cursor-pointer">
                      <span>Flight Details</span>
                      <FaInfoCircle />
                    </div>
                  </div>

                  {/* Render BookFlights component inline */}
                  <div>
      {/* Render flight list or other content */}
      {selectedFlight && (
        <BookFlights flight={selectedFlight} onClose={handleCloseModal} />
      )}
    </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-lg text-gray-600 mb-2">
                  No flights found matching your filters
                </p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}

            {/* Promo Banner */}
            <div className="bg-orange-500 text-white rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold mb-1">
                  Unlock exclusive 12% Off on your first booking.
                </h3>
                <p>Code: NEW</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPlane className="text-2xl hidden md:block" />
                <button className="bg-white text-orange-500 px-4 py-2 rounded w-full md:w-auto">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;