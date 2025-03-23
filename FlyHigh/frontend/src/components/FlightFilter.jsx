import { useState } from "react";
import { Filter, X, ChevronDown, Check } from "lucide-react";

const FilterDropdown = ({ title, options, selected, onChange, clearFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white border rounded-md shadow-lg">
          <div className="p-2 border-b flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">{title} Options</span>
            {selected.length > 0 && (
              <button
                onClick={clearFilter}
                className="text-xs text-gray-500 hover:text-red-500"
              >
                Clear
              </button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={selected.includes(option.value)}
                  onChange={() => {
                    const newSelected = selected.includes(option.value)
                      ? selected.filter(item => item !== option.value)
                      : [...selected, option.value];
                    onChange(newSelected);
                  }}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RangeFilter = ({ title, min, max, value, onChange, clearFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasFilter = value[0] !== min || value[1] !== max;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          {title}
          {hasFilter && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-white border rounded-md shadow-lg">
          <div className="p-2 border-b flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">{title} Range</span>
            {hasFilter && (
              <button
                onClick={clearFilter}
                className="text-xs text-gray-500 hover:text-red-500"
              >
                Reset
              </button>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500">₹{value[0].toLocaleString()}</span>
              <span className="text-xs text-gray-500">₹{value[1].toLocaleString()}</span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                min={min}
                max={max}
                value={value[0]}
                onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
                className="w-full"
              />
              <input
                type="range"
                min={min}
                max={max}
                value={value[1]}
                onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FlightFilters = ({ onApplyFilters }) => {
  // Sample filter options - these would be generated from actual flight data
  const airlines = [
    { value: "indigo", label: "IndiGo" },
    { value: "airIndia", label: "Air India" },
    { value: "vistara", label: "Vistara" },
    { value: "spiceJet", label: "SpiceJet" },
    { value: "goFirst", label: "Go First" },
    { value: "airAsia", label: "Air Asia India" },
  ];

  const airports = [
    { value: "del", label: "Delhi (DEL)" },
    { value: "bom", label: "Mumbai (BOM)" },
    { value: "blr", label: "Bangalore (BLR)" },
    { value: "hyd", label: "Hyderabad (HYD)" },
    { value: "maa", label: "Chennai (MAA)" },
    { value: "ccu", label: "Kolkata (CCU)" },
  ];

  const statuses = [
    { value: "onTime", label: "On Time" },
    { value: "delayed", label: "Delayed" },
    { value: "boarding", label: "Boarding" },
    { value: "landed", label: "Landed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Filter states
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [priceRange, setPriceRange] = useState([2000, 20000]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleApplyFilters = () => {
    const filters = {
      airlines: selectedAirlines,
      origins: selectedOrigins,
      destinations: selectedDestinations,
      statuses: selectedStatuses,
      priceRange: priceRange
    };
    
    onApplyFilters(filters);
    setIsFiltersVisible(false);
  };

  const handleResetFilters = () => {
    setSelectedAirlines([]);
    setSelectedOrigins([]);
    setSelectedDestinations([]);
    setSelectedStatuses([]);
    setPriceRange([2000, 20000]);
    onApplyFilters({}); // Reset filters
  };

  const activeFilterCount = 
    (selectedAirlines.length > 0 ? 1 : 0) +
    (selectedOrigins.length > 0 ? 1 : 0) +
    (selectedDestinations.length > 0 ? 1 : 0) +
    (selectedStatuses.length > 0 ? 1 : 0) +
    (priceRange[0] !== 2000 || priceRange[1] !== 20000 ? 1 : 0);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 mb-3"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isFiltersVisible && (
        <div className="bg-white border rounded-lg p-4 shadow-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Flights</h3>
            <button
              onClick={() => setIsFiltersVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            <FilterDropdown
              title="Airlines"
              options={airlines}
              selected={selectedAirlines}
              onChange={setSelectedAirlines}
              clearFilter={() => setSelectedAirlines([])}
            />
            
            <FilterDropdown
              title="Origin"
              options={airports}
              selected={selectedOrigins}
              onChange={setSelectedOrigins}
              clearFilter={() => setSelectedOrigins([])}
            />
            
            <FilterDropdown
              title="Destination"
              options={airports}
              selected={selectedDestinations}
              onChange={setSelectedDestinations}
              clearFilter={() => setSelectedDestinations([])}
            />
            
            <FilterDropdown
              title="Status"
              options={statuses}
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
              clearFilter={() => setSelectedStatuses([])}
            />
            
            <RangeFilter
              title="Price"
              min={2000}
              max={20000}
              value={priceRange}
              onChange={setPriceRange}
              clearFilter={() => setPriceRange([2000, 20000])}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
            >
              Reset All
            </button>
            
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Apply Filters
            </button>
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-4 pt-3 border-t">
              <p className="text-sm text-gray-500 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedAirlines.length > 0 && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                    Airlines: {selectedAirlines.length}
                    <button
                      onClick={() => setSelectedAirlines([])}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {selectedOrigins.length > 0 && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                    Origins: {selectedOrigins.length}
                    <button
                      onClick={() => setSelectedOrigins([])}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {selectedDestinations.length > 0 && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                    Destinations: {selectedDestinations.length}
                    <button
                      onClick={() => setSelectedDestinations([])}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {selectedStatuses.length > 0 && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                    Statuses: {selectedStatuses.length}
                    <button
                      onClick={() => setSelectedStatuses([])}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {(priceRange[0] !== 2000 || priceRange[1] !== 20000) && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                    Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    <button
                      onClick={() => setPriceRange([2000, 20000])}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightFilters;