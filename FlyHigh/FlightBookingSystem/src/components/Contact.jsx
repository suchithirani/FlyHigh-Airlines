// Contact.jsx
import React, { useState } from 'react';
import { Map, Mail, Phone, Clock, MessageSquare, Send, MapPin, Globe, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    bookingRef: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally would submit to server here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        bookingRef: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  const contactOptions = [
    {
      title: "Customer Service",
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      content: [
        "Toll-Free: 1-800-FLY-HIGH",
        "International: +1 (555) 123-4567",
        "Available 24/7 for your assistance"
      ]
    },
    {
      title: "Email Support",
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      content: [
        "General Inquiries: info@flyhigh.com",
        "Bookings: reservations@flyhigh.com",
        "Customer Support: help@flyhigh.com"
      ]
    },
    {
      title: "Office Hours",
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      content: [
        "Monday - Friday: 8:00 AM - 8:00 PM",
        "Saturday: 9:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 4:00 PM"
      ]
    },
    {
      title: "Headquarter Address",
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      content: [
        "FlyHigh Airways Tower",
        "123 Aviation Boulevard",
        "Skyway City, SC 54321, USA"
      ]
    }
  ];
  
  const faqItems = [
    {
      question: "How do I check my flight status?",
      answer: "You can check your flight status on our website by entering your flight number or route details on the homepage, or by visiting the 'Flight Status' section."
    },
    {
      question: "What is your baggage allowance policy?",
      answer: "Our baggage allowance varies by route and fare class. Generally, economy passengers are allowed one carry-on bag (max 7kg) and one checked bag (max 23kg). Premium and business class passengers receive additional allowance."
    },
    {
      question: "How can I request special assistance?",
      answer: "Special assistance requests should be made during booking or at least 48 hours before your flight. You can also contact our customer service team to add this to an existing booking."
    },
    {
      question: "What is your flight cancellation policy?",
      answer: "Cancellation policies vary by fare type. Flexible fares offer full refunds while economy fares may have cancellation fees. Check your fare conditions or contact customer service for specific details."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact FlyHigh Airways</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              We're here to help make your journey smoother. Reach out to us anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {option.icon}
                <h3 className="ml-3 text-lg font-semibold text-gray-800">{option.title}</h3>
              </div>
              <ul className="space-y-2">
                {option.content.map((item, i) => (
                  <li key={i} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map and Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Map className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Our Global Presence</h3>
            </div>
            <div className="p-4">
              <div className="relative h-64 lg:h-96 bg-gray-200 rounded">
                <img src="/api/placeholder/800/600" alt="Map location" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <div className="text-center">
                    <Globe className="w-10 h-10 mx-auto mb-2" />
                    <p className="font-medium">FlyHigh serves over 120 destinations worldwide</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex">
                  <div className="mr-3 p-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Global Headquarters</h4>
                    <p className="text-gray-600 text-sm">
                      123 Aviation Boulevard, Skyway City, SC 54321, USA
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 p-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Regional Office - Europe</h4>
                    <p className="text-gray-600 text-sm">
                      45 Sky Avenue, London, UK, EC2V 7EX
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 p-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Regional Office - Asia</h4>
                    <p className="text-gray-600 text-sm">
                      88 Skyline Tower, Singapore, 018956
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feedback Form */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Send Us a Message</h3>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your message has been sent successfully. A member of our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bookingRef" className="block text-sm font-medium text-gray-700 mb-1">
                        Booking Reference (if applicable)
                      </label>
                      <input
                        type="text"
                        id="bookingRef"
                        name="bookingRef"
                        value={formData.bookingRef}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject*
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="Booking">Booking Inquiry</option>
                      <option value="Baggage">Baggage Question</option>
                      <option value="Flight">Flight Information</option>
                      <option value="Refund">Refund Request</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Feedback">General Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      I agree to the privacy policy and consent to having my data processed.
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">{item.question}</h4>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Can't find what you're looking for? 
            <a href="#" className="text-blue-600 font-medium ml-1 hover:underline">
              Check our full FAQ section
            </a>
          </p>
        </div>
      </div>
      
      {/* Social Media Banner */}
      <div className="bg-blue-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
          <p className="mb-6">Follow FlyHigh Airways on social media for updates, offers, and travel inspiration</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
              <span className="text-xl font-bold">f</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
              <span className="text-xl font-bold">t</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
              <span className="text-xl font-bold">ig</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
              <span className="text-xl font-bold">yt</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="font-bold text-xl mb-4">FlyHigh Airways</div>
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} FlyHigh Airways. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;