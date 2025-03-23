"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { X, User, Mail, Phone, Shield, Luggage, Coffee } from "lucide-react"

interface Flight {
  id: number
  airline: string
  flightNumber: string
  departureTime: string
  departureCode: string
  arrivalTime: string
  arrivalCode: string
  duration: string
  stops: string
  price: number
  extraFee: number
}

interface PassengerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  flightDetails: Flight
}

export function PassengerDetailsModal({ isOpen, onClose, flightDetails }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    passengers: [
      {
        title: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        seatPreference: "window",
        mealPreference: "regular",
        baggage: "15kg",
      },
    ],
    contactEmail: "",
    contactPhone: "",
    addons: {
      priorityBoarding: false,
      travelInsurance: false,
      airportPickup: false,
    },
  })

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedPassengers = [...formData.passengers]
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      passengers: updatedPassengers,
    })
  }

  const handleContactChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleAddonChange = (addon: string, checked: boolean) => {
    setFormData({
      ...formData,
      addons: {
        ...formData.addons,
        [addon]: checked,
      },
    })
  }

  const validateStep1 = () => {
    const passenger = formData.passengers[0]
    return passenger.title && passenger.firstName && passenger.lastName && passenger.age && passenger.gender
  }

  const validateStep2 = () => {
    return formData.contactEmail && formData.contactPhone
  }

  const handleContinue = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      router.push("/payment")
      onClose()
    }
  }

  const calculateTotal = () => {
    let total = flightDetails.price

    // Add addon costs
    if (formData.addons.priorityBoarding) total += 500
    if (formData.addons.travelInsurance) total += 299
    if (formData.addons.airportPickup) total += 750

    // Extra baggage if not standard
    if (formData.passengers[0].baggage === "25kg") total += 500
    if (formData.passengers[0].baggage === "30kg") total += 1000

    return total
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Passenger Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {currentStep === 1
              ? "Please enter passenger information"
              : "Please enter contact details and select add-ons"}
          </DialogDescription>
        </DialogHeader>

        {/* Flight summary */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-md mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">
                {flightDetails.airline} - {flightDetails.flightNumber}
              </div>
              <div className="text-sm text-gray-500">
                {flightDetails.departureCode} {flightDetails.departureTime} → {flightDetails.arrivalCode}{" "}
                {flightDetails.arrivalTime} • {flightDetails.duration}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">₹{flightDetails.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Base fare</div>
            </div>
          </div>
        </motion.div>

        {/* Step indicator */}
        <div className="flex mb-6">
          <div className="flex-1">
            <div className="flex items-center">
              <motion.div
                animate={{
                  scale: currentStep === 1 ? [1, 1.1, 1] : 1,
                  backgroundColor: currentStep === 1 ? "#4f46e5" : "#e0e7ff",
                  color: currentStep === 1 ? "#ffffff" : "#4f46e5",
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
              >
                1
              </motion.div>
              <div className="ml-2">
                <div className="font-medium text-sm">Passenger Details</div>
              </div>
            </div>
          </div>
          <div className="w-12 flex items-center justify-center">
            <motion.div
              animate={{
                backgroundColor: currentStep === 2 ? "#4f46e5" : "#e5e7eb",
              }}
              transition={{ duration: 0.3 }}
              className="h-1 w-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <motion.div
                animate={{
                  scale: currentStep === 2 ? [1, 1.1, 1] : 1,
                  backgroundColor: currentStep === 2 ? "#4f46e5" : "#e0e7ff",
                  color: currentStep === 2 ? "#ffffff" : "#4f46e5",
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
              >
                2
              </motion.div>
              <div className="ml-2">
                <div className="font-medium text-sm">Contact & Add-ons</div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title" className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-indigo-600" />
                    Title
                  </Label>
                  <Select
                    value={formData.passengers[0].title}
                    onValueChange={(value) => handleInputChange(0, "title", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                      <SelectItem value="dr">Dr.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.passengers[0].firstName}
                    onChange={(e) => handleInputChange(0, "firstName", e.target.value)}
                    placeholder="First Name"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.passengers[0].lastName}
                    onChange={(e) => handleInputChange(0, "lastName", e.target.value)}
                    placeholder="Last Name"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.passengers[0].age}
                    onChange={(e) => handleInputChange(0, "age", e.target.value)}
                    placeholder="Age"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.passengers[0].gender}
                    onValueChange={(value) => handleInputChange(0, "gender", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Seat Preference</Label>
                <RadioGroup
                  value={formData.passengers[0].seatPreference}
                  onValueChange={(value) => handleInputChange(0, "seatPreference", value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="window" id="window" className="text-indigo-600" />
                    <Label htmlFor="window" className="cursor-pointer">
                      Window
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="middle" id="middle" className="text-indigo-600" />
                    <Label htmlFor="middle" className="cursor-pointer">
                      Middle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aisle" id="aisle" className="text-indigo-600" />
                    <Label htmlFor="aisle" className="cursor-pointer">
                      Aisle
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="flex items-center">
                  <Coffee className="h-4 w-4 mr-1 text-indigo-600" />
                  Meal Preference
                </Label>
                <RadioGroup
                  value={formData.passengers[0].mealPreference}
                  onValueChange={(value) => handleInputChange(0, "mealPreference", value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" className="text-indigo-600" />
                    <Label htmlFor="regular" className="cursor-pointer">
                      Regular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegetarian" id="vegetarian" className="text-indigo-600" />
                    <Label htmlFor="vegetarian" className="cursor-pointer">
                      Vegetarian
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vegan" id="vegan" className="text-indigo-600" />
                    <Label htmlFor="vegan" className="cursor-pointer">
                      Vegan
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="flex items-center">
                  <Luggage className="h-4 w-4 mr-1 text-indigo-600" />
                  Baggage Options
                </Label>
                <Select
                  value={formData.passengers[0].baggage}
                  onValueChange={(value) => handleInputChange(0, "baggage", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15kg">15kg (Included)</SelectItem>
                    <SelectItem value="25kg">25kg (+₹500)</SelectItem>
                    <SelectItem value="30kg">30kg (+₹1000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <User className="h-4 w-4 mr-1 text-indigo-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-indigo-600" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleContactChange("contactEmail", e.target.value)}
                      placeholder="Email for e-ticket"
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-indigo-600" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleContactChange("contactPhone", e.target.value)}
                      placeholder="Mobile number"
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-indigo-600" />
                  Add-ons
                </h3>
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Checkbox
                      id="priorityBoarding"
                      checked={formData.addons.priorityBoarding}
                      onCheckedChange={(checked) => handleAddonChange("priorityBoarding", checked as boolean)}
                      className="mt-1 text-indigo-600"
                    />
                    <div>
                      <Label htmlFor="priorityBoarding" className="font-medium cursor-pointer">
                        Priority Boarding
                      </Label>
                      <p className="text-sm text-gray-500">Board first and choose your seat. +₹500</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Checkbox
                      id="travelInsurance"
                      checked={formData.addons.travelInsurance}
                      onCheckedChange={(checked) => handleAddonChange("travelInsurance", checked as boolean)}
                      className="mt-1 text-indigo-600"
                    />
                    <div>
                      <Label htmlFor="travelInsurance" className="font-medium cursor-pointer">
                        Travel Insurance
                      </Label>
                      <p className="text-sm text-gray-500">
                        Coverage for trip cancellation and medical emergencies. +₹299
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Checkbox
                      id="airportPickup"
                      checked={formData.addons.airportPickup}
                      onCheckedChange={(checked) => handleAddonChange("airportPickup", checked as boolean)}
                      className="mt-1 text-indigo-600"
                    />
                    <div>
                      <Label htmlFor="airportPickup" className="font-medium cursor-pointer">
                        Airport Pickup
                      </Label>
                      <p className="text-sm text-gray-500">
                        Convenient pickup from the airport to your destination. +₹750
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-md"
              >
                <h3 className="font-medium mb-2">Price Summary</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Base Fare</span>
                    <span>₹{flightDetails.price.toLocaleString()}</span>
                  </div>
                  {formData.addons.priorityBoarding && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between"
                    >
                      <span>Priority Boarding</span>
                      <span>₹500</span>
                    </motion.div>
                  )}
                  {formData.addons.travelInsurance && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between"
                    >
                      <span>Travel Insurance</span>
                      <span>₹299</span>
                    </motion.div>
                  )}
                  {formData.addons.airportPickup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between"
                    >
                      <span>Airport Pickup</span>
                      <span>₹750</span>
                    </motion.div>
                  )}
                  {formData.passengers[0].baggage === "25kg" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between"
                    >
                      <span>Extra Baggage (25kg)</span>
                      <span>₹500</span>
                    </motion.div>
                  )}
                  {formData.passengers[0].baggage === "30kg" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between"
                    >
                      <span>Extra Baggage (30kg)</span>
                      <span>₹1000</span>
                    </motion.div>
                  )}
                  <motion.div
                    className="border-t pt-1 mt-2"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter>
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="mr-auto">
                Back
              </Button>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleContinue}
              disabled={(currentStep === 1 && !validateStep1()) || (currentStep === 2 && !validateStep2())}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {currentStep === 1 ? "Continue" : "Proceed to Payment"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

