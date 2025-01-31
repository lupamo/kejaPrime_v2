import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import exterior_1 from '../assets/images/exterior_1.jpg';
import exterior_2 from '../assets/images/exterior_2.jpg';
import exterior_3 from '../assets/images/exterior_3.jpg';
import exterior_4 from '../assets/images/exterior_4.jpg';
import interior_2 from '../assets/images/interior_2.jpg';
import interior_3 from '../assets/images/interior_3.jpg';
import interior_4 from '../assets/images/interior_4.jpg';
import interior_1 from '../assets/images/interior_1.jpg';
import location_icon from '../assets/images/location_icon.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Dummy data
const listings = [
	{
		id: 2,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Single Room",
		name: "Beach House",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Westlands, Nairobi",
		price: "Ksh 35,000",
	},
	{
		id: 3,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Double Room",
		name: "Country Cottage",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi Kilimani, Nairobi",
		price: "Ksh 50,000",
	},
	{
		id: 4,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Bedsitter",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 5,
		image: [exterior_4],
		number_rooms: "Double Room",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 6,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Double",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 7,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "1 Bedroom",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 8,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Double Room",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 9,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Double Room",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 10,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "3 Bedroom",
		name: "City Apartment",
		description: "Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 11,
		image: [exterior_2, interior_1, interior_2, interior_3],
		number_rooms: "Single Room",
		name: "City Apartment",
		description:"Welcome to this wonderful infill located in the highly desirable North Park neighbourhood featuring a LEGAL one-bedroom suite! This property boasts an abundance of large windows and natural light both on the main floor and 2nd floor. On the main floor you can enjoy open concept living with a nice sized kitchen, large island, Stainless steel appliances and separate pantry. On the 2nd floor there are three bedrooms, the primary bedroom offers a walk-in closet and a 5-piece en suite with his and her sinks. There is also another full sized 4-piece bathroom and second-floor laundry, The fully developed basement features a 1-bedroom legal suite with its own separate entry, same quality finishes as the upstairs and laundry. The suite is perfect for generating income or entertaining guests. Main floor suite has been completely painted and has new carpet throughout the 2nd floor and stairs. The basement unit has all new flooring, baseboards and fresh paint. The yard is fully fenced and there is a double concrete parking pad at the back. Don't miss the chance to own this nicely designed home in a prime location. (id:55581)",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	}
];

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(null);

    // Find the listing based on the ID
    const listing = listings.find((listing) => listing.id === parseInt(id));

    // Set the main image to the first image in the array if not already set
    useEffect(() => {
        if (listing && listing.image && listing.image.length > 0) {
            setMainImage(listing.image[0]);
        }
    }, [listing]);

    // If the listing is not found, show an error message
    if (!listing) {
        return (
            <div style={{margin:"20px"}}>
                <h1 style={{color:"#203856"}}>Listing not found</h1>
                <button className="btn" style={{color:"#fff"}} onClick={() => navigate('/listings')}>Go back to listings</button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="m-2 d-flex justify-content-between" style={{ alignItems: "center" }}>
                <div>
                    <h3>{listing.name}</h3>
                    <p>
                        <img
                            src={location_icon}
                            alt="Location Icon"
                            style={{ width: "16px", height: "16px" }}
                            className="me-2"
                        />
                        {listing.location}
                    </p>
                </div>
                <div>
                    <button className="btn btn-secondary mb-3" onClick={() => navigate("/listings")}>Back to Listings</button>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                {/* Main image */}
                <div className="card mb-3" style={{ width: "100%", maxWidth: "85%", height: "auto" }}>
                    <img
                        src={mainImage}
                        alt={listing.name}
                        className="card-img-top"
                        style={{ width: "100%", height: "500px", objectFit: "cover" }}
                    />
                </div>

                {/* Thumbnail images in a Swiper carousel */}
                {listing.image && listing.image.length > 0 && (
                    <div style={{ width: "100%", maxWidth: "85%", margin: "0 auto" }}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]} // Add modules here
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {listing.image.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="card"
                                        style={{ width: "80%", height: "150px", cursor: "pointer" }}
                                        onClick={() => setMainImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className="card-img-top h-100"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>

            <div className="descriptions" style={{marginTop: "20px" }}> 
				<div style={{flex:"2", minWidth: "300px", padding: "10px"}}>
					<h3 style={{color: "#203856"}}>Description</h3>
					<p style={{background:"#f0f3f3", padding:"20px", borderRadius:"5px"}}>{listing.description}</p>
				</div>

            </div>
        </>
    );
};

export default ListingDetail;