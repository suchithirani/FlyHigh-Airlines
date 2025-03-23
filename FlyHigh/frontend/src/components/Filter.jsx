import React from 'react';
import { FaSun, FaMoon, FaClock } from 'react-icons/fa';
const Filters = ({ 
  timeFilters, 
  toggleTimeFilter, 
  airlines, 
  toggleAirline,
  stops,
  toggleStop,
  priceRange,
  setPriceRange,
  sortBy, 
  setSortBy 
}) => 
  {
  
  return (
    <div className="w-full lg:w-52 bg-white rounded-lg shadow-md p-4 h-fit">
      <h3 className="font-medium text-lg mb-4">Filters</h3>
      
      {/* Stops Filter */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h4 className="font-medium mb-2">Stops</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4" 
              checked={stops.nonStop}
              onChange={() => toggleStop('nonStop')}
            />
            Non-Stop
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4" 
              checked={stops.oneStop}
              onChange={() => toggleStop('oneStop')}
            />
            1 Stop
          </label>
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h4 className="font-medium mb-2">Flight Price</h4>
        <div className="mt-4">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={priceRange.current}
            onChange={(e) => setPriceRange({
              ...priceRange,
              current: parseInt(e.target.value)
            })}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₹{priceRange.min.toLocaleString('en-IN')}</span>
            <span>₹{priceRange.current.toLocaleString('en-IN')}</span>
            <span>₹{priceRange.max.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      
      {/* Departure Time Filter */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h4 className="font-medium mb-2">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className={`flex flex-col items-center p-2 border rounded ${timeFilters.earlyMorning ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
            onClick={() => toggleTimeFilter('earlyMorning')}
          >
            <FaMoon className="text-orange-500 mb-1" />
            <span className="text-xs">Early Morning</span>
            <span className="text-xs text-gray-500">12AM - 6AM</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 border rounded ${timeFilters.morning ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
            onClick={() => toggleTimeFilter('morning')}
          >
            <FaSun className="text-orange-500 mb-1" />
            <span className="text-xs">Morning</span>
            <span className="text-xs text-gray-500">6AM - 12PM</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 border rounded ${timeFilters.midDay ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
            onClick={() => toggleTimeFilter('midDay')}
          >
            <FaClock className="text-orange-500 mb-1" />
            <span className="text-xs">Mid Day</span>
            <span className="text-xs text-gray-500">12PM - 6PM</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 border rounded ${timeFilters.night ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
            onClick={() => toggleTimeFilter('night')}
          >
            <FaMoon className="text-orange-500 mb-1" />
            <span className="text-xs">Night</span>
            <span className="text-xs text-gray-500">6PM - 12AM</span>
          </button>
        </div>
      </div>
      
      {/* Airlines Filter */}
      <div>
        <h4 className="font-medium mb-2">Popular Airlines</h4>
        <div className="space-y-3">
          {airlines.map((airline) => (
            <label key={airline.id} className="flex items-center justify-between text-sm cursor-pointer">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  checked={airline.selected}
                  onChange={() => toggleAirline(airline.id)}
                />
                <span>{airline.name}</span>
              </div>
              <span className="text-gray-600">{airline.price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;