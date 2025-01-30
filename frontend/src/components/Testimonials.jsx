import React, {useRef} from 'react'
import Carousel from 'react-bootstrap/Carousel';

import '../styles/Testimonials.css';
import testimonial_1 from '../assets/images/testimonial_1.jpg';
import testimonial_2 from '../assets/images/testimonial_2.jpg';
import testimonial_3 from '../assets/images/testimonial_3.jpg';
import testimonial_4 from '../assets/images/testimonial_4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Testimonials = () => {
    const carouselRef = useRef(null);
    const handlePrev = () => {
        carouselRef.current.prev();
    };
    const handleNext = () => {
        carouselRef.current.next();
    };
    return (
        <section className='Testimonials-section py-5'>
            <div className='container-md text-center position-relative'>
                {/* Arrows */}
                <button
                className='arrow-btn prev-arrow'
                onClick={handlePrev}
                aria-label='Previous'
                >
                    &#8592;
                </button>
                <button
                className="arrow-btn next-arrow"
                onClick={handleNext}
                aria-label="Next"
                >
                    &#8594;
                </button>

                <div className='text-center mb-4'>
                    <h2>What Our Clients Say....</h2>
                    <p className='lead text-muted'> Hear from our happy clients who found their dream homes with us</p>
                < Carousel ref={carouselRef} className='testimonials-carousel'>
                    {/*Testimonial 1 */}
                    <Carousel.Item>
                        <div className='testimonial-card mx-auto'>
                            <img src={testimonial_1} alt="client 1"  className='rounded-circle mb-3 image-fluid mx-auto' style={{ width: '140px', height: '140px' }} />
                            <p> "KejaPrime made finding my dream apartment so easy! Highly recommended."</p>
                            <strong> Lisa Aiko</strong>
                        </div>
                    </Carousel.Item>
                    {/*Testimonial 2 */}
                    <Carousel.Item>
                        <div className='testimonial-card mx-auto'>
                            <img src={testimonial_2} alt="client 2"  className='rounded-circle mb-3 image-fluid mx-auto' style={{ width: '140px', height: '140px' }} />
                            <p> "The lifetime warranty gave me peace of mind. Fantastic service!"</p>
                            <strong> Carolyne Wangui</strong>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='testimonial-card mx-auto'>
                            <img src={testimonial_4} alt="client 3"  className='rounded-circle mb-3 image-fluid mx-auto' style={{ width: '140px', height: '140px' }} />
                            <p> "Affordable prices and prime locations. I couldn't be happier!"</p>
                            <strong> Alex Mworia</strong>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='testimonial-card mx-auto'>
                            <img src={testimonial_3} alt="client 4"  className='rounded-circle mb-3 image-fluid mx-auto' style={{ width: '140px', height: '140px' }} />
                            <p> "The support team at KejaPrime is top-notch. I love my new home!"</p>
                            <strong> Jhene Aiko </strong>
                        </div>
                    </Carousel.Item>
                </Carousel>
    
            </div>
        </div>
    </section>
  )
}

export default Testimonials
