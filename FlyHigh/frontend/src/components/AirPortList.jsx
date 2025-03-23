import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AirportList() {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]); // To store filtered results
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/airports');
        if (!response.ok) {
          throw new Error('Failed to fetch airports');
        }
        const data = await response.json();
        setAirports(data);
        setFilteredAirports(data); // Set initial filtered data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  // Handle input change and filter results
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(query) || airport.airportCode.toLowerCase().includes(query)
    );
    setFilteredAirports(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold animate-pulse text-blue-500">Loading airports...</p>
      </div>
    );
  }
  
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">List of Airports</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by city name or airport code"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg focus:ring focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display filtered airports */}
      {filteredAirports.length === 0 ? (
        <p className="text-center text-gray-500">No airports found for your search.</p>
      ) : (
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredAirports.map((airport) => (
            <motion.li
              key={airport.airportId}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{airport.airportName}</h2>
              <p className="text-gray-700">{airport.city}, {airport.country}</p>
              <p className="text-sm text-gray-500">Code: {airport.airportCode}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default AirportList;
