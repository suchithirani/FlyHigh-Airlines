import { useState } from 'react';
import { SlidersHorizontal, X, Check, Clock } from 'lucide-react';

const FilterSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const timeRanges = [
    { id: 'all', label: 'All Times' },
    { id: 'morning', label: 'Morning (6AM-12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM-6PM)' },
    { id: 'evening', label: 'Evening (6PM-12AM)' },
    { id: 'night', label: 'Night (12AM-6AM)' }
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    if (filterType !== "all") count++;
    if (timeFilter !== "all") count++;
    if (statusFilter !== "all") count++;
    
    return count;
  };
  const FilterButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 rounded-lg mr-2 transition-all duration-300 
        ${active ? 
          "bg-blue-500 text-white shadow-lg scale-105" : 
          "bg-gray-100 hover:bg-gray-200 hover:scale-102"
        } flex items-center gap-2 pointer-events-none`}
    >
      {active && <Check className="w-4 h-4" />}
      {children}
    </button>
  );

  return (
    <div className="absolute inline-block z-1">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 
          transition-all duration-300 hover:shadow-md ml-36 mt-2"
      >
        <SlidersHorizontal className={`w-3 h-4 transition-transform duration-300 
          ${showFilters ? 'rotate-180' : ''}`} />
        Filters
        {getActiveFilterCount() > 0 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full -ml-1 
            animate-bounce">
            {getActiveFilterCount()}
          </span>
        )}
      </button>
      
      <div className={`mt-2 rounded-lg border bg-white shadow-lg transition-all duration-300 
        ${showFilters ? 
          'opacity-100 transform translate-y-0' : 
          'opacity-0 transform -translate-y-4'}`}
      >
        <div className="p-4 space-y-4">
          {/* Flight Type Filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">Flight Type</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton 
                active={filterType === "all"} 
                onClick={() => setFilterType("all")}
              >
                All Flights
              </FilterButton>
              <FilterButton 
                active={filterType === "departure"} 
                onClick={() => setFilterType("departure")}
              >
                Departures
              </FilterButton>
              <FilterButton 
                active={filterType === "arrival"} 
                onClick={() => setFilterType("arrival")}
              >
                Arrivals
              </FilterButton>
            </div>
          </div>

          {/* Time Range Filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">Time Range</h3>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map(range => (
                <FilterButton
                  key={range.id}
                  active={timeFilter === range.id}
                  onClick={() => setTimeFilter(range.id)}
                >
                  <Clock className="w-4 h-4" />
                  {range.label}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">Flight Status</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton 
                active={statusFilter === "all"} 
                onClick={() => setStatusFilter("all")}
              >
                All Status
              </FilterButton>
              <FilterButton 
                active={statusFilter === "ontime"} 
                onClick={() => setStatusFilter("ontime")}
              >
                On Time
              </FilterButton>
              <FilterButton 
                active={statusFilter === "delayed"} 
                onClick={() => setStatusFilter("delayed")}
              >
                Delayed
              </FilterButton>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-2 border-t">
            <button
              onClick={() => {
                setFilterType("all");
                setTimeFilter("all");
                setStatusFilter("all");
              }}
              className="text-sm text-red-500 hover:text-red-600 transition-colors duration-300 
                flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;