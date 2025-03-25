-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: flyhigh
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airlines`
--

DROP TABLE IF EXISTS `airlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airlines` (
  `airline_id` bigint NOT NULL AUTO_INCREMENT,
  `airline_code` varchar(255) NOT NULL,
  `airline_name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`airline_id`),
  UNIQUE KEY `UKjp64ksdlotq3g20ghvedyr1do` (`airline_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airlines`
--

LOCK TABLES `airlines` WRITE;
/*!40000 ALTER TABLE `airlines` DISABLE KEYS */;
INSERT INTO `airlines` VALUES (1,'6E','IndiGo','India'),(2,'5E','SpiceJet','India');
/*!40000 ALTER TABLE `airlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `airport_id` bigint NOT NULL AUTO_INCREMENT,
  `airport_code` varchar(255) NOT NULL,
  `airport_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`airport_id`),
  UNIQUE KEY `UK4ekl2417ug6m1bm05a33a6r9i` (`airport_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (1,'HYD','Rajiv Gandhi International Airport','Hyderabad','India',17.2403,78.4294),(2,'DEL','Indira Gandhi International Airport','Delhi','India',28.5562,77.1),(3,'BOM','Chhatrapati Shivaji Maharaj International Airport','Mumbai','India',19.0896,72.8656),(4,'BLR','Kempegowda International Airport','Bangalore','India',13.1986,77.7066),(5,'MAA','Chennai International Airport','Chennai','India',12.9941,80.1709),(6,'AMD','Gujrat  Airport','Ahmedabad','India',12.9941,80.1709),(9,'COK','Cochin International Airport','Kochi','India',10.152,76.4019);
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_date` datetime(6) NOT NULL,
  `number_of_seats` int NOT NULL,
  `status` enum('CANCELED','CONFIRMED','PENDING') NOT NULL,
  `total_amount` double NOT NULL,
  `flight_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id`),
  KEY `fk_flight_id` (`flight_id`),
  CONSTRAINT `fk_flight_id` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`) ON DELETE CASCADE,
  CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKidcytqkgq0ve4x1elcnbmdy8a` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2025-03-19 10:00:00.000000',2,'PENDING',15000,2,1),(2,'2025-03-19 10:00:00.000000',4,'CONFIRMED',30000,1,2),(3,'2025-03-19 10:00:00.000000',3,'PENDING',30000,1,1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `flight_id` bigint NOT NULL AUTO_INCREMENT,
  `arrival_time` datetime(6) NOT NULL,
  `available_seats` int NOT NULL,
  `departure_time` datetime(6) NOT NULL,
  `flight_number` varchar(255) NOT NULL,
  `ticket_price` double NOT NULL,
  `airline_id` bigint NOT NULL,
  `route_id` bigint NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `FKieor4j3ivp3xu584qenhfh0gd` (`airline_id`),
  KEY `FKggm6k4h1glfes1nsg0wesanvy` (`route_id`),
  CONSTRAINT `FKggm6k4h1glfes1nsg0wesanvy` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`),
  CONSTRAINT `FKieor4j3ivp3xu584qenhfh0gd` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`airline_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'2025-03-20 12:30:00.000000',150,'2025-03-20 10:00:00.000000','AI123',15000.99,2,1),(2,'2025-03-20 12:30:00.000000',150,'2025-03-20 10:00:00.000000','AI143',4999.99,1,2),(3,'2025-03-20 12:30:00.000000',100,'2025-03-20 10:00:00.000000','AI193',4999.99,1,2),(4,'2025-03-20 23:30:00.000000',150,'2025-03-20 20:00:00.000000','AI143',4999.99,2,1),(5,'2025-03-20 06:30:00.000000',87,'2025-03-20 01:00:00.000000','AI243',9999.99,2,4),(6,'2025-03-20 10:30:00.000000',87,'2025-03-20 09:00:00.000000','AI293',9999.99,1,3),(7,'2025-03-20 10:30:00.000000',85,'2025-03-20 09:00:00.000000','AI293',5999.99,2,5);
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `payment_date` datetime(6) NOT NULL,
  `status` enum('COMPLETED','FAILED','PENDING','REFUNDED') NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `booking_id` bigint NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FKc52o2b1jkxttngufqp3t7jr3h` (`booking_id`),
  CONSTRAINT `FKc52o2b1jkxttngufqp3t7jr3h` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,15000,'2025-03-19 23:25:36.795053','COMPLETED','TXN123456789',1),(2,35000,'2025-03-19 23:26:24.852361','COMPLETED','TXN12456789',2),(3,34500,'2025-03-20 10:59:58.746162','COMPLETED','TXN12456790',2);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) NOT NULL,
  `rating` int NOT NULL,
  `review_date` datetime(6) NOT NULL,
  `flight_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKc0ikrxc3c5qg5v486378guyl0` (`flight_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKc0ikrxc3c5qg5v486378guyl0` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Great flight experience!',5,'2025-03-19 23:33:35.665584',2,1),(2,'Great flight experience!',4,'2025-03-20 03:04:31.519960',2,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `route_id` bigint NOT NULL AUTO_INCREMENT,
  `distance` int NOT NULL,
  `flight_time` int NOT NULL,
  `destination_airport_id` bigint NOT NULL,
  `origin_airport_id` bigint NOT NULL,
  PRIMARY KEY (`route_id`),
  KEY `FK6k6q1y8yi39rfkr32ceuprjqu` (`destination_airport_id`),
  KEY `FKkngoqmkva461ywbruj6wlydhd` (`origin_airport_id`),
  CONSTRAINT `FK6k6q1y8yi39rfkr32ceuprjqu` FOREIGN KEY (`destination_airport_id`) REFERENCES `airports` (`airport_id`),
  CONSTRAINT `FKkngoqmkva461ywbruj6wlydhd` FOREIGN KEY (`origin_airport_id`) REFERENCES `airports` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,500,60,2,1),(2,800,90,5,3),(3,800,90,3,5),(4,900,90,2,1),(5,900,90,1,2);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@example.com','password123','USER',''),(2,'heet@example.com','password123','USER',''),(4,'suchit@example.com','password123','ADMIN',''),(5,'zeel@example.com','password123','ADMIN',''),(6,'krish@example.com','password123','ADMIN',''),(8,'krish1@example.com','password123','ADMIN','krish'),(9,'john@example.com','Secure@pass123!','USER','John Doe'),(10,'jaimin@example.com','Pass@pass123','USER','Jaimin'),(11,'suchit@gmail.com','Pass@123','USER',''),(12,'tej1@gmail.com','Pass@123','USER',''),(13,'jay@gmail.com','Pass@123','USER','jay'),(14,'anmol@gmail.com','Pass@123','USER','anmol'),(16,'suchit1@gmail.com','Pass@123','USER','Suchit-123'),(17,'camron@example.com','Pass@123','USER','camron'),(18,'dhoni@example.com','Pass@123','USER','dhoni'),(19,'jaimin1@example.com','Pass@123','USER','jaimin'),(20,'kholi@gmail.com','Pass@123','USER','kholi'),(21,'rachin@gmail.com','Pass@123','USER','rachin'),(22,'utsav@gmail.com','Pass@123','USER','utsav'),(26,'suchit2@example.com','password123','USER','suchit');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-25 12:10:28
