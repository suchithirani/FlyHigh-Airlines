"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeftRight, Plane, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const airports = [
  { code: "DEL", name: "New Delhi", country: "India" },
  { code: "BOM", name: "Mumbai", country: "India" },
  { code: "BLR", name: "Bengaluru", country: "India" },
  { code: "MAA", name: "Chennai", country: "India" },
  { code: "HYD", name: "Hyderabad", country: "India" },
  { code: "CCU", name: "Kolkata", country: "India" },
  { code: "GOI", name: "Goa", country: "India" },
  { code: "ATQ", name: "Amritsar", country: "India" },
  { code: "IXC", name: "Chandigarh", country: "India" },
  { code: "JAI", name: "Jaipur", country: "India" },
]

interface SearchFormProps {
  onSearch: () => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [fromAirport, setFromAirport] = useState({ code: "DEL", name: "New Delhi" })
  const [toAirport, setToAirport] = useState({ code: "BOM", name: "Mumbai" })
  const [departureDate, setDepartureDate] = useState<Date>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [isReturnTrip, setIsReturnTrip] = useState(false)
  const [openFromDropdown, setOpenFromDropdown] = useState(false)
  const [openToDropdown, setOpenToDropdown] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [travelClass, setTravelClass] = useState("Economy")
  const [openTravelers, setOpenTravelers] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAirports, setFilteredAirports] = useState(airports)

  const swapButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (searchQuery) {
      setFilteredAirports(
        airports.filter(
          (airport) =>
            airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            airport.code.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    } else {
      setFilteredAirports(airports)
    }
  }, [searchQuery])

  const swapAirports = () => {
    // Animate the swap button
    if (swapButtonRef.current) {
      swapButtonRef.current.classList.add("animate-spin")
      setTimeout(() => {
        swapButtonRef.current?.classList.remove("animate-spin")
      }, 500)
    }

    const temp = fromAirport
    setFromAirport(toAirport)
    setToAirport(temp)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  const totalPassengers = adults + children + infants

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-100 rounded-full opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-100 rounded-full opacity-50"></div>

      <form onSubmit={handleSearch} className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* From Airport */}
          <div className="relative">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <Popover open={openFromDropdown} onOpenChange={setOpenFromDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openFromDropdown}
                  className="w-full justify-between border-gray-300 bg-white hover:bg-gray-50 group transition-all duration-300"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {fromAirport.code} - {fromAirport.name}
                    </span>
                  </div>
                  <Plane className="h-4 w-4 opacity-50 group-hover:text-indigo-600 transition-colors duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search airport..."
                    className="h-9"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No airport found.</CommandEmpty>
                    <CommandGroup>
                      <AnimatePresence>
                        {filteredAirports.map((airport) => (
                          <motion.div
                            key={airport.code}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CommandItem
                              value={airport.code}
                              onSelect={() => {
                                setFromAirport(airport)
                                setOpenFromDropdown(false)
                                setSearchQuery("")
                              }}
                              className="flex justify-between items-center cursor-pointer hover:bg-indigo-50"
                            >
                              <div>
                                <span className="font-medium">{airport.code}</span> - {airport.name}
                              </div>
                              <span className="text-xs text-gray-500">{airport.country}</span>
                            </CommandItem>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-24 lg:static lg:transform-none">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={swapAirports}
                ref={swapButtonRef}
                className="rounded-full h-10 w-10 border border-gray-200 bg-white shadow-md hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              >
                <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
                <span className="sr-only">Swap airports</span>
              </Button>
            </motion.div>
          </div>

          {/* To Airport */}
          <div className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Popover open={openToDropdown} onOpenChange={setOpenToDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openToDropdown}
                  className="w-full justify-between border-gray-300 bg-white hover:bg-gray-50 group transition-all duration-300"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {toAirport.code} - {toAirport.name}
                    </span>
                  </div>
                  <Plane className="h-4 w-4 opacity-50 group-hover:text-indigo-600 transition-colors duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search airport..."
                    className="h-9"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No airport found.</CommandEmpty>
                    <CommandGroup>
                      <AnimatePresence>
                        {filteredAirports.map((airport) => (
                          <motion.div
                            key={airport.code}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CommandItem
                              value={airport.code}
                              onSelect={() => {
                                setToAirport(airport)
                                setOpenToDropdown(false)
                                setSearchQuery("")
                              }}
                              className="flex justify-between items-center cursor-pointer hover:bg-indigo-50"
                            >
                              <div>
                                <span className="font-medium">{airport.code}</span> - {airport.name}
                              </div>
                              <span className="text-xs text-gray-500">{airport.country}</span>
                            </CommandItem>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300 bg-white hover:bg-gray-50 group transition-all duration-300",
                    !departureDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 group-hover:text-indigo-600 transition-colors duration-300" />
                  {departureDate ? format(departureDate, "EEE, dd MMM") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={(date) => setDepartureDate(date as Date)}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300 bg-white hover:bg-gray-50 group transition-all duration-300",
                    !returnDate && "text-muted-foreground",
                  )}
                  onClick={() => !isReturnTrip && setIsReturnTrip(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 group-hover:text-indigo-600 transition-colors duration-300" />
                  {returnDate ? format(returnDate, "EEE, dd MMM") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={(date) => {
                    setReturnDate(date)
                    setIsReturnTrip(!!date)
                  }}
                  initialFocus
                  disabled={(date) => date < departureDate}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Travelers & Class */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Travellers & Class</label>
            <Popover open={openTravelers} onOpenChange={setOpenTravelers}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTravelers}
                  className="w-full justify-between border-gray-300 bg-white hover:bg-gray-50 group transition-all duration-300"
                >
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 group-hover:text-indigo-600 transition-colors duration-300" />
                    <span>
                      {totalPassengers} {totalPassengers === 1 ? "Traveller" : "Travellers"}, {travelClass}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 opacity-50"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Passengers</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Adults</div>
                          <div className="text-xs text-gray-500">12+ years</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            -
                          </motion.button>
                          <span className="w-8 text-center">{adults}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setAdults(Math.min(9, adults + 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Children</div>
                          <div className="text-xs text-gray-500">2-11 years</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            -
                          </motion.button>
                          <span className="w-8 text-center">{children}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setChildren(Math.min(6, children + 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Infants</div>
                          <div className="text-xs text-gray-500">Below 2 years</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            -
                          </motion.button>
                          <span className="w-8 text-center">{infants}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setInfants(Math.min(adults, infants + 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Cabin Class</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Economy", "Premium Economy", "Business", "First"].map((classType) => (
                        <motion.div
                          key={classType}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`p-2 border rounded-md cursor-pointer transition-colors ${
                            travelClass === classType
                              ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                              : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                          }`}
                          onClick={() => setTravelClass(classType)}
                        >
                          <div className="text-sm font-medium">{classType}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setOpenTravelers(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Special Fares */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Fares (Optional):</label>
            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs border-gray-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
                >
                  Student
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs border-gray-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
                >
                  Senior Citizen
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs border-gray-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
                >
                  Armed Forces
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1 flex items-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Search Flights
              </Button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

