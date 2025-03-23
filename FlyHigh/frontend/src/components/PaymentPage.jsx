import React, { useState } from "react";
import { FaLock, FaCreditCard, FaMoneyBill, FaUniversity, FaCheck } from "react-icons/fa";

const PaymentPage = ({ flightData, passengerDetails, totalAmount, onGoBack, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return (
        cardDetails.cardNumber.length >= 16 &&
        cardDetails.nameOnCard.length > 3 &&
        cardDetails.expiryMonth &&
        cardDetails.expiryYear &&
        cardDetails.cvv.length >= 3
      );
    }
    return true;
  };

  const handleSubmitPayment = () => {
    if (!isFormValid()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);
      
      // Show success animation for 2 seconds before completing
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 1500);
  };

  // Default values when props are not provided
  const defaultFlight = {
    airline: { airlineName: "Air India" },
    flightNumber: "AI2575",
    date: "Sat, 29 Mar",
    departureTime: "06:15",
    arrivalTime: "08:25",
    route: {
      originAirport: { airportCode: "DEL" },
      destinationAirport: { airportCode: "BOM" }
    },
    ticketPrice: 5465
  };

  const flight = flightData || defaultFlight;
  const passenger = passengerDetails || { firstName: "John", lastName: "Doe" };
  const total = totalAmount || 7165;

  // Payment method components
  const renderPaymentMethodContent = () => {
    switch(paymentMethod) {
      case "card":
        return (
          <div className="animate-fadeIn">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                maxLength={16}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                value={cardDetails.nameOnCard}
                onChange={handleCardDetailsChange}
                placeholder="John Doe"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                <select
                  name="expiryMonth"
                  value={cardDetails.expiryMonth}
                  onChange={handleCardDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                <select
                  name="expiryYear"
                  value={cardDetails.expiryYear}
                  onChange={handleCardDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="123"
                  maxLength={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case "upi":
        return (
          <div className="p-4 bg-gray-50 rounded-lg text-center animate-fadeIn">
            <div className="mb-4">
              <img src="/api/placeholder/150/150" alt="UPI QR Code" className="mx-auto" />
            </div>
            <p className="text-gray-700 mb-2">Scan the QR code with any UPI app</p>
            <p className="text-sm text-gray-500">Or enter your UPI ID below</p>
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder="yourname@upibank"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-indigo-600 text-white px-3 rounded-r-lg hover:bg-indigo-700">
                Verify
              </button>
            </div>
          </div>
        );
      case "netbanking":
        return (
          <div className="p-4 bg-gray-50 rounded-lg animate-fadeIn">
            <p className="text-gray-700 mb-3">Select your bank</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {["SBI", "HDFC", "ICICI", "Axis", "PNB", "BOB"].map((bank) => (
                <div key={bank} className="border border-gray-300 rounded-lg p-2 text-center hover:bg-white hover:border-indigo-300 cursor-pointer transition-all">
                  {bank}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">
              You will be redirected to your bank's secure page
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl relative max-h-[90vh] overflow-hidden">
        {/* Success overlay with animation */}
        {isPaymentComplete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-pulse">
              <FaCheck className="text-green-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Your booking has been confirmed.</p>
            
            {/* Animated sparkles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main content with scrollable area */}
        <div className="grid grid-cols-1 md:grid-cols-5 max-h-[90vh]">
          {/* Payment section (3 columns) */}
          <div className="md:col-span-3 p-5 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-1">Payment</h2>
            <p className="text-gray-500 text-sm mb-4">Complete your booking by making a payment</p>
            
            {/* Payment method tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                className={`flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                  paymentMethod === "card" 
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <FaCreditCard className="mr-2" />
                <span>Card</span>
              </button>
              
              <button
                className={`flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                  paymentMethod === "upi" 
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <FaMoneyBill className="mr-2" />
                <span>UPI</span>
              </button>
              
              <button
                className={`flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                  paymentMethod === "netbanking" 
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("netbanking")}
              >
                <FaUniversity className="mr-2" />
                <span>Net Banking</span>
              </button>
            </div>
            
            {/* Dynamic payment method content */}
            {renderPaymentMethodContent()}
            
            {/* Promo code section */}
            <div className="mt-4">
              {showPromoInput ? (
                <div className="flex animate-fadeIn">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="bg-indigo-600 text-white px-3 rounded-r-lg hover:bg-indigo-700">
                    Apply
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPromoInput(true)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Have a promo code?
                </button>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="mt-5 flex space-x-3">
              <button
                onClick={onGoBack}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200"
              >
                Go Back
              </button>
              
              <button
                onClick={handleSubmitPayment}
                disabled={!isFormValid() || isProcessing}
                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isFormValid() && !isProcessing
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" /> Pay ₹{total.toLocaleString()}
                  </>
                )}
              </button>
            </div>
            
            {/* Secure payment notice */}
            <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
              <FaLock className="mr-1" />
              <span>Secure payment powered by bank-level security</span>
            </div>
          </div>
          
          {/* Booking Summary section (2 columns) */}
          <div className="md:col-span-2 bg-gray-50 p-5 border-l border-gray-200 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-3">Booking Summary</h2>
            
            {/* Flight details */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{flight.airline.airlineName}</span>
                <span className="text-gray-700">{flight.flightNumber}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {flight.date}
              </div>
              
              {/* Flight time with animation */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold">
                    {flight.departureTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    {flight.route.originAirport.airportCode}
                  </div>
                </div>
                
                <div className="flex-1 px-3 relative">
                  <div className="border-t border-gray-300 relative">
                    <div className="absolute top-0 left-0 transform -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <div className="absolute top-0 right-0 transform -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {flight.arrivalTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    {flight.route.destinationAirport.airportCode}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Passenger */}
            <div className="border-t border-gray-200 pt-3 mb-4">
              <h3 className="text-md font-medium mb-1">Passenger</h3>
              <div className="text-md">
                {`${passenger.title || ""} ${passenger.firstName} ${passenger.lastName}`}
              </div>
            </div>
            
            {/* Price details */}
            <div className="border-t border-gray-200 pt-3 mb-4">
              <h3 className="text-md font-medium mb-2">Price Details</h3>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Base Fare</span>
                  <span>₹{flight.ticketPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes & Fees</span>
                  <span>₹1,200</span>
                </div>
                {(passenger.priorityBoarding || 
                  passenger.travelInsurance || 
                  passenger.airportPickup) && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Add-ons</span>
                    <span>₹500</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                <span>Total</span>
                <span className="text-lg">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Terms and conditions */}
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <div className="flex">
                <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="ml-2 text-gray-700">
                  By proceeding with the payment, you agree to our terms and conditions and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add CSS animations to your tailwind.config.js or directly use these styles
// In a real app, you would add these to your tailwind config
const styles = `
@layer utilities {
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
`;

export default PaymentPage;