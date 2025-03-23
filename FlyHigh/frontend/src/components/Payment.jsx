"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Landmark, Smartphone, CheckCircle2, AlertCircle } from "lucide-react"
import confetti from "canvas-confetti"

export default function PaymentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    upiId: "",
    bankName: "",
  })
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const validateCreditCardForm = () => {
    return (
      formData.cardNumber.length === 16 &&
      formData.cardName &&
      formData.expiryMonth &&
      formData.expiryYear &&
      formData.cvv.length === 3
    )
  }

  const validateUpiForm = () => {
    return formData.upiId.includes("@")
  }

  const validateNetBankingForm = () => {
    return formData.bankName !== ""
  }

  const isFormValid = () => {
    if (paymentMethod === "credit-card") return validateCreditCardForm()
    if (paymentMethod === "upi") return validateUpiForm()
    if (paymentMethod === "net-banking") return validateNetBankingForm()
    return false
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "NEW") {
      setPromoApplied(true)
      setPromoDiscount(Math.round(flightDetails.total * 0.12)) // 12% discount
    } else {
      setPromoApplied(false)
      setPromoDiscount(0)
    }
  }

  const handlePayment = () => {
    if (!isFormValid()) return

    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Trigger confetti animation
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#7c3aed", "#8b5cf6"],
      })

      // Redirect to home after showing success
      setTimeout(() => {
        router.push("/")
      }, 5000)
    }, 2000)
  }

  // Flight details (would normally come from context or state management)
  const flightDetails = {
    airline: "Air India",
    flightNumber: "AI2575",
    departureCode: "DEL",
    departureCity: "New Delhi",
    departureTime: "06:15",
    arrivalCode: "BOM",
    arrivalCity: "Mumbai",
    arrivalTime: "08:25",
    date: "Sat, 29 Mar",
    passenger: "John Doe",
    price: 5465,
    taxes: 1200,
    addons: 500,
    total: 7165,
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="h-20 w-20 text-green-500" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-2xl font-bold mb-2"
              >
                Payment Successful!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-gray-600 mb-6"
              >
                Your booking has been confirmed. Your e-ticket has been sent to your email.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-md mb-6 inline-block mx-auto"
              >
                <div className="text-left">
                  <div className="mb-2">
                    <span className="font-medium">Booking Reference:</span> AI2575DEL29MAR
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Flight:</span> {flightDetails.airline} {flightDetails.flightNumber}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Route:</span> {flightDetails.departureCity} to{" "}
                    {flightDetails.arrivalCity}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Date:</span> {flightDetails.date}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Passenger:</span> {flightDetails.passenger}
                  </div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Return to Home
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Complete your booking by making a payment</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger
                          value="credit-card"
                          className="flex items-center data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger
                          value="upi"
                          className="flex items-center data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          UPI
                        </TabsTrigger>
                        <TabsTrigger
                          value="net-banking"
                          className="flex items-center data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                        >
                          <Landmark className="h-4 w-4 mr-2" />
                          Net Banking
                        </TabsTrigger>
                      </TabsList>

                      <AnimatePresence mode="wait">
                        <TabsContent value="credit-card" className="space-y-4 mt-4">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={(e) =>
                                  handleInputChange("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))
                                }
                                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                id="cardName"
                                placeholder="John Doe"
                                value={formData.cardName}
                                onChange={(e) => handleInputChange("cardName", e.target.value)}
                                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="expiryMonth">Expiry Month</Label>
                                <select
                                  id="expiryMonth"
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300"
                                  value={formData.expiryMonth}
                                  onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <option key={month} value={month.toString().padStart(2, "0")}>
                                      {month.toString().padStart(2, "0")}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="expiryYear">Expiry Year</Label>
                                <select
                                  id="expiryYear"
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300"
                                  value={formData.expiryYear}
                                  onChange={(e) => handleInputChange("expiryYear", e.target.value)}
                                >
                                  <option value="">Year</option>
                                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                    <option key={year} value={year.toString()}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={(e) =>
                                    handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))
                                  }
                                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                              </div>
                            </div>
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="upi" className="space-y-4 mt-4">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div>
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input
                                id="upiId"
                                placeholder="name@upi"
                                value={formData.upiId}
                                onChange={(e) => handleInputChange("upiId", e.target.value)}
                                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-md mt-4">
                              <p className="text-sm text-gray-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-indigo-600" />
                                Enter your UPI ID and click on Pay Now. You will receive a payment request on your UPI
                                app.
                              </p>
                            </div>
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="net-banking" className="space-y-4 mt-4">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div>
                              <Label>Select Bank</Label>
                              <RadioGroup
                                value={formData.bankName}
                                onValueChange={(value) => handleInputChange("bankName", value)}
                                className="grid grid-cols-2 gap-4 mt-2"
                              >
                                {[
                                  "HDFC Bank",
                                  "ICICI Bank",
                                  "State Bank of India",
                                  "Axis Bank",
                                  "Kotak Mahindra Bank",
                                  "Yes Bank",
                                ].map((bank) => (
                                  <motion.div
                                    key={bank}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center space-x-2 border p-3 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                                  >
                                    <RadioGroupItem
                                      value={bank}
                                      id={bank.replace(/\s+/g, "-").toLowerCase()}
                                      className="text-indigo-600"
                                    />
                                    <Label htmlFor={bank.replace(/\s+/g, "-").toLowerCase()} className="cursor-pointer">
                                      {bank}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </div>
                          </motion.div>
                        </TabsContent>
                      </AnimatePresence>

                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: showPromoCode ? 1 : 0,
                          height: showPromoCode ? "auto" : 0,
                        }}
                        className="mt-6 overflow-hidden"
                      >
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <Button
                            onClick={applyPromoCode}
                            variant="outline"
                            className="border-indigo-300 hover:bg-indigo-50 text-indigo-600"
                          >
                            Apply
                          </Button>
                        </div>
                        {promoApplied && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-600 text-sm mt-2 flex items-center"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Promo code applied! You saved ₹{promoDiscount}
                          </motion.div>
                        )}
                      </motion.div>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="w-full flex justify-between items-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setShowPromoCode(!showPromoCode)}
                        className="text-indigo-600 p-0"
                      >
                        {showPromoCode ? "Hide promo code" : "Have a promo code?"}
                      </Button>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-1/2">
                        <Button
                          onClick={handlePayment}
                          disabled={isLoading || !isFormValid()}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing Payment...
                            </div>
                          ) : (
                            `Pay ₹${promoApplied ? (flightDetails.total - promoDiscount).toLocaleString() : flightDetails.total.toLocaleString()}`
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{flightDetails.airline}</span>
                          <span>{flightDetails.flightNumber}</span>
                        </div>
                        <div className="text-sm text-gray-500">{flightDetails.date}</div>
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            <div className="font-bold">{flightDetails.departureTime}</div>
                            <div className="text-sm text-gray-500">{flightDetails.departureCode}</div>
                          </div>
                          <div className="flex-1 border-t border-dashed mx-2 h-0 relative">
                            <motion.div
                              initial={{ left: 0 }}
                              animate={{ left: "100%" }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              className="absolute -top-1 w-2 h-2 bg-indigo-600 rounded-full"
                            />
                          </div>
                          <div>
                            <div className="font-bold">{flightDetails.arrivalTime}</div>
                            <div className="text-sm text-gray-500">{flightDetails.arrivalCode}</div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="text-sm font-medium mb-2">Passenger</div>
                        <div>{flightDetails.passenger}</div>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="text-sm font-medium mb-2">Price Details</div>
                        <div className="flex justify-between">
                          <span>Base Fare</span>
                          <span>₹{flightDetails.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes & Fees</span>
                          <span>₹{flightDetails.taxes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Add-ons</span>
                          <span>₹{flightDetails.addons.toLocaleString()}</span>
                        </div>
                        {promoApplied && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex justify-between text-green-600"
                          >
                            <span>Promo Discount</span>
                            <span>-₹{promoDiscount.toLocaleString()}</span>
                          </motion.div>
                        )}
                        <motion.div
                          className="flex justify-between font-bold border-t pt-2 mt-2"
                          animate={promoApplied ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <span>Total</span>
                          <span>
                            ₹
                            {promoApplied
                              ? (flightDetails.total - promoDiscount).toLocaleString()
                              : flightDetails.total.toLocaleString()}
                          </span>
                        </motion.div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-md text-sm">
                        <div className="flex items-start">
                          <div className="mr-2 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-indigo-600"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </div>
                          <p className="text-gray-600">
                            By proceeding with the payment, you agree to our terms and conditions and cancellation
                            policy.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

