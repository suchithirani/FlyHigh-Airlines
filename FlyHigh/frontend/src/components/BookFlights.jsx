import React, { useState } from "react";
import { FaPlane, FaInfoCircle, FaLock, FaCreditCard, FaTimes, FaCalendarAlt } from "react-icons/fa";
import PaymentPage from './PaymentPage';

const BookFlights = ({ flight, onClose }) => {
  const [passengerDetails, setPassengerDetails] = useState({
    title: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    seatPreference: "",
    mealPreference: "",
    email: "",
    phone: "",
    priorityBoarding: false,
    travelInsurance: false,
    airportPickup: false,
    baggageWeight: 15, // Default baggage weight
    journeyDate: "", // Added journey date field
  });

  const [currentStep, setCurrentStep] = useState(1); // 1: Passenger Details, 2: Contact & Add-ons
  const [animating, setAnimating] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPassengerDetails({
      ...passengerDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        passengerDetails.title &&
        passengerDetails.firstName &&
        passengerDetails.lastName &&
        passengerDetails.age &&
        passengerDetails.gender &&
        passengerDetails.journeyDate // Added validation for journey date
      );
    } else if (currentStep === 2) {
      return passengerDetails.email && passengerDetails.phone;
    }
    return false;
  };

  const handleNextStep = () => {
  if (currentStep === 1) {
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(2);
      setAnimating(false);
    }, 300);
  } else {
    // Show payment page instead of the alert
    setShowPaymentPage(true);
  }
};
  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep(1);
        setAnimating(false);
      }, 300);
    }
  };

  const calculateAdditionalTax = () => {
    const baseWeight = 15; // Included baggage weight
    const additionalWeight = Math.max(passengerDetails.baggageWeight - baseWeight, 0);
    const taxPerKg = 100; // Tax per additional kg
    return additionalWeight * taxPerKg;
  };

  const totalPrice = () => {
    const basePrice = flight?.ticketPrice || 5465; // Default price from screenshot if flight not provided
    const addOns = (passengerDetails.priorityBoarding ? 500 : 0) +
      (passengerDetails.travelInsurance ? 299 : 0) +
      (passengerDetails.airportPickup ? 750 : 0);
    const baggageTax = calculateAdditionalTax();
    return basePrice + addOns + baggageTax;
  };

  if (!flight) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative transform transition-all duration-300 ease-in-out hover:scale-102">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        {/* Header (Fixed) */}
        <div className="p-6 pb-0">
          {/* Step Indicator */}
          <div className="flex items-center mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${currentStep === 1 ? "bg-blue-100 text-blue-800" : "bg-indigo-600 text-white"}`}>
              1
            </div>
            <div className="text-xs font-medium mx-2">Passenger Details</div>
            <div className="h-1 w-10 bg-indigo-600"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${currentStep === 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}>
              2
            </div>
            <div className="text-xs font-medium mx-2">Contact & Add-ons</div>
          </div>

          {/* Flight Info - Show on both steps */}
          <div className="flex items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  flight.airline?.airlineName === "FlyHigh"
                    ? "bg-blue-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <FaPlane className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{flight.airline?.airlineName || "FlyHigh"}</div>
                <div className="text-xs text-gray-500">{flight.flightNumber || "FH101"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-sm font-medium">
                  {flight.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "09:00"}
                </div>
                <div className="text-xs text-gray-500">
                  {flight.route?.originAirport?.airportCode || "DEL"}
                </div>
              </div>

              <div className="flex flex-col items-center mx-2">
                <div className="text-xs text-gray-500">
                  {flight.route?.flightTime || "120"} mins
                </div>
                <div className="relative w-16 h-px bg-gray-300 my-1">
                  <div className="absolute -top-1 right-0 text-xs">✈</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium">
                  {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "11:00"}
                </div>
                <div className="text-xs text-gray-500">
                  {flight.route?.destinationAirport?.airportCode || "BOM"}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium">
                ₹{flight.ticketPrice?.toLocaleString() || "5,465"}
              </div>
              <div className="text-xs text-gray-500">Base fare</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="max-h-96 overflow-y-auto px-6 py-4">
          {/* Content with animation */}
          <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 1 ? (
              <>
                {/* Passenger Details Section */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Passenger Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {/* Date of Journey Field - Added as requested */}
                    <div className="mb-4">
                      <label className="text-xs text-gray-600 block mb-1">
                        <div className="flex items-center">
                          <FaCalendarAlt className="w-3 h-3 text-indigo-600 mr-1" />
                          Date of Journey
                        </div>
                      </label>
                      <input
                        type="date"
                        name="journeyDate"
                        value={passengerDetails.journeyDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="text-xs text-gray-600 block mb-1">Title</label>
                        <select
                          name="title"
                          value={passengerDetails.title}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="text-xs text-gray-600 block mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={passengerDetails.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-xs text-gray-600 block mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={passengerDetails.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-xs text-gray-600 block mb-1">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={passengerDetails.age}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                          placeholder="Age"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-600 block mb-1">Gender</label>
                        <select
                          name="gender"
                          value={passengerDetails.gender}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Seat Preference, Meal Preference, and Baggage Options */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Seat Preference</label>
                        <div className="flex gap-4 mt-1">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="seatPreference"
                              value="Window"
                              checked={passengerDetails.seatPreference === "Window"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Window</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="seatPreference"
                              value="Middle"
                              checked={passengerDetails.seatPreference === "Middle"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Middle</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="seatPreference"
                              value="Aisle"
                              checked={passengerDetails.seatPreference === "Aisle"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Aisle</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Meal Preference</label>
                        <div className="flex gap-4 mt-1">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="mealPreference"
                              value="Regular"
                              checked={passengerDetails.mealPreference === "Regular"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Regular</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="mealPreference"
                              value="Vegetarian"
                              checked={passengerDetails.mealPreference === "Vegetarian"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Vegetarian</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="mealPreference"
                              value="Vegan"
                              checked={passengerDetails.mealPreference === "Vegan"}
                              onChange={handleInputChange}
                            />
                            <span className="text-sm">Vegan</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label className="text-xs text-gray-600 block mb-1">Baggage Weight (kg)</label>
                        <input
                          type="number"
                          name="baggageWeight"
                          value={passengerDetails.baggageWeight}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm transition-colors duration-200 hover:border-blue-500"
                          placeholder="Baggage Weight"
                        />
                        <div className="mt-1 text-xs text-gray-700">
                          15kg included (₹100 per additional kg)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Contact & Add-ons Section */}
                <div>
                  {/* Contact Information */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-indigo-600 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h4 className="text-sm font-semibold">Contact Information</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 text-indigo-600 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <label className="text-xs text-gray-600">Email</label>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={passengerDetails.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                          placeholder="Email for e-ticket"
                        />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 text-indigo-600 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <label className="text-xs text-gray-600">Phone</label>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={passengerDetails.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                          placeholder="Mobile number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-indigo-600 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <h4 className="text-sm font-semibold">Add-ons</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border border-gray-200 rounded-lg p-3 bg-blue-50">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="priorityBoarding"
                            checked={passengerDetails.priorityBoarding}
                            onChange={handleInputChange}
                            className="mt-1 mr-2"
                          />
                          <div className="text-sm">
                            <div className="font-medium">Priority Boarding</div>
                            <div className="text-xs text-gray-600">Board first and choose your seat. +₹500</div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-3">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="travelInsurance"
                            checked={passengerDetails.travelInsurance}
                            onChange={handleInputChange}
                            className="mt-1 mr-2"
                          />
                          <div className="text-sm">
                            <div className="font-medium">Travel Insurance</div>
                            <div className="text-xs text-gray-600">Coverage for trip cancellation and medical emergencies. +₹299</div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-3">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="airportPickup"
                            checked={passengerDetails.airportPickup}
                            onChange={handleInputChange}
                            className="mt-1 mr-2"
                          />
                          <div className="text-sm">
                            <div className="font-medium">Airport Pickup</div>
                            <div className="text-xs text-gray-600">Convenient pickup from the airport to your destination. +₹750</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <h4 className="text-sm font-semibold mb-2">Price Summary</h4>
                    <div className="flex justify-between mb-1 text-sm">
                      <div>Base Fare</div>
                      <div>₹{flight?.ticketPrice?.toLocaleString() || "5,465"}</div>
                    </div>
                    {calculateAdditionalTax() > 0 && (
                      <div className="flex justify-between mb-1 text-sm">
                        <div>Additional Baggage Tax</div>
                        <div>₹{calculateAdditionalTax().toLocaleString()}</div>
                      </div>
                    )}
                    {(passengerDetails.priorityBoarding || passengerDetails.travelInsurance || passengerDetails.airportPickup) && (
                      <>
                        {passengerDetails.priorityBoarding && (
                          <div className="flex justify-between mb-1 text-sm">
                            <div>Priority Boarding</div>
                            <div>₹500</div>
                          </div>
                        )}
                        {passengerDetails.travelInsurance && (
                          <div className="flex justify-between mb-1 text-sm">
                            <div>Travel Insurance</div>
                            <div>₹299</div>
                          </div>
                        )}
                        {passengerDetails.airportPickup && (
                          <div className="flex justify-between mb-1 text-sm">
                            <div>Airport Pickup</div>
                            <div>₹750</div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300 text-sm">
                      <div>Total</div>
                      <div>₹{totalPrice().toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer with buttons (Fixed) */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          {currentStep === 2 && (
            <button
              onClick={handlePreviousStep}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200 text-sm"
            >
              Back
            </button>
          )}
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
              isFormValid()
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } ${currentStep === 1 ? "ml-auto" : ""}`}
            disabled={!isFormValid()}
            onClick={handleNextStep}
          >
            {currentStep === 1 ? "Continue" : "Proceed to Payment"}
          </button>
        </div>
      </div>
      {showPaymentPage && (
  <PaymentPage
    flightData={flight}
    passengerDetails={passengerDetails}
    totalAmount={totalPrice()}
    onGoBack={() => setShowPaymentPage(false)}
    onPaymentComplete={() => {
      setShowPaymentPage(false);
      onClose(); // Close the entire booking flow
    }}
  />
)}
    </div>
  );
};

export default BookFlights;