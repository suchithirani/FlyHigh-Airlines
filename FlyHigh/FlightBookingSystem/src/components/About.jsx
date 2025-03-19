import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaPlane, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const values = [
    { title: "Safety", description: "Your safety is our top priority." },
    { title: "Innovation", description: "Constantly evolving to offer you the best experience." },
    { title: "Customer Service", description: "Friendly and approachable staff to serve you." },
    { title: "Sustainability", description: "Committed to reducing our carbon footprint." },
  ];

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Slider {...carouselSettings}>
          <div className="relative h-80 bg-blue-600 text-white flex justify-center items-center">
            <img
              src=""
              alt="FlyHigh Plane"
              className="object-cover absolute inset-0 w-full h-full opacity-40"
            />
            <motion.h1
              className="text-4xl font-bold z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to FlyHigh Airlines
            </motion.h1>
          </div>
          <div className="relative h-80 bg-blue-700 text-white flex justify-center items-center">
            <img
              src="https://media.cntraveler.com/photos/607f3c487774091e06dd5d21/16:9/w_2560%2Cc_limit/Breeze%2520Airways_166655077_303814634409055_8038496796049085212_n.jpeg"
              alt="FlyHigh Plane"
              className="object-cover absolute inset-0 w-full h-full opacity-40"
            />
            <motion.h1
              className="text-4xl font-bold z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              A Journey Above the Clouds
            </motion.h1>
          </div>
        </Slider>
      </section>

      {/* Our Story Section */}
      <section className="py-16 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="mt-4 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          FlyHigh Airlines was founded in 2000 with a vision to provide luxurious, yet affordable, air travel experiences. 
          Over the years, we have grown into one of the most trusted airline brands globally, offering world-class service to 
          millions of passengers each year.
        </motion.p>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-200 py-16 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Values
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 * index }}
            >
              <div className="text-4xl text-blue-600 mb-4">
                <FaPlane />
              </div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 text-lg">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Fleet Section with Carousel */}
      <section className="py-16 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Fleet
        </motion.h2>
        <Slider {...carouselSettings} className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/aircraft1.jpg" alt="Aircraft 1" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Boeing 737</h3>
            <p className="mt-2 text-lg">A versatile aircraft for short to medium-haul flights.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/aircraft2.jpg" alt="Aircraft 2" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Airbus A320</h3>
            <p className="mt-2 text-lg">Comfort and efficiency for both passengers and crew.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/aircraft3.jpg" alt="Aircraft 3" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Boeing 777</h3>
            <p className="mt-2 text-lg">Long-haul flights with maximum comfort and minimal noise.</p>
          </div>
        </Slider>
      </section>

      {/* Our Destinations Section with Carousel */}
      <section className="bg-blue-100 py-16 text-center">
        <motion.h2
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Destinations
        </motion.h2>
        <Slider {...carouselSettings} className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/destination1.jpg" alt="Destination 1" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Paris, France</h3>
            <p className="mt-2 text-lg">Experience the romance and culture of the City of Lights.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/destination2.jpg" alt="Destination 2" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Tokyo, Japan</h3>
            <p className="mt-2 text-lg">Explore the fusion of tradition and innovation in Tokyo.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://example.com/destination3.jpg" alt="Destination 3" className="w-full h-64 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-semibold">Sydney, Australia</h3>
            <p className="mt-2 text-lg">Enjoy stunning beaches and iconic landmarks.</p>
          </div>
        </Slider>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 text-center bg-white">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <IoIosRocket className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Premium Comfort</h3>
            <p className="mt-2 text-lg">Enjoy spacious seating and world-class in-flight services.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <FaPlane className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Modern Fleet</h3>
            <p className="mt-2 text-lg">Fly in our fleet of modern, efficient, and luxurious aircraft.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <FaMapMarkerAlt className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Global Reach</h3>
            <p className="mt-2 text-lg">We fly to over 50 destinations worldwide.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h2>
        <p className="mt-4 text-lg">Have questions or need assistance? We&apos;re here to help!</p>
        <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
          Get in Touch
        </button>
      </section>
    </div>
  );
};

export default About;