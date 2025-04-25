import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import hero from '../assets/images/hero.png';
import test_1 from '../assets/images/testimonial_1.jpg';
import test_2 from '../assets/images/testimonial_2.jpg';
import test_3 from '../assets/images/momi.jpg'

function AboutUs() {
  return (
    <>
    <Navbar />
    <section className='hero-about-section container-fluid py-5'>
        <div className='row align-items-center'>
            <div className="col-md-5 text-center text-md-start ps-md-5">
                <h2 className="f h3 text-muted"> About Keja Prime</h2>
                <h1 className='display-4 fw-bold'>Bringing You More than Just a Home</h1>
                <p className='lead'>
                Connecting buyers and sellers with ease. Discover how we make finding your perfect home seamless and stress-free.
                </p>
            </div>
            <div className="col-md-7">
                <img src={hero} alt="about us"  className="img-fluid w-100 rounded" style={{ height: "400px", objectFit: "cover" }}/>
            </div>
        </div>
    </section>
    <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold">Who We Are</h2>
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            We are a dedicated real estate platform connecting buyers, sellers, and renters with their perfect homes. Our mission is to make property transactions seamless and stress-free.
          </p>
        </div>
    </section>
    <section className='py-5'>
        <div className='container'>
        <h2 className="text-center fw-bold mb-4">Our Mission & Values</h2>
        <div className='row text-center'>
            <div className='col-md-4'>
                <div className='p-4 border rounded shadow-sm'>
                <i className="bi bi-shield-check display-4 text-primary"></i>
                <h4 className="mt-3 text-warning fw-bold">Transparency</h4>
                <p>We provide accurate and honest property listings to help you make informed decisions.</p>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='p-4 border rounded shadow-sm'>
                <i className="bi bi-speedometer display-4 text-success"></i>
                <h4 className="mt-3 text-warning fw-bold">Efficiency</h4>
                <p>We streamline the buying and renting process, saving you time and effort.</p>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='p-4 border rounded shadow-sm'>
                <i className="bi bi-people display-4 text-primary"></i>
                <h4 className="mt-3 text-warning fw-bold">Community</h4>
                <p>We foster connections between buyers, sellers, and agents for better experiences.</p>
                </div>
            </div>
        </div>
        </div>
    </section>
    {/*What we offer section */}
    <section className='py-5 bg-light'>
      <div className='container'>
        <h2 className='text-center fw-bold mb-4'> What we offer</h2>
        <div className='row text-center'>
          <div className='col-md-3'>
            <i className='bi bi-house-door display-4 text-primary'></i>
            <h5 className='mt-2'>Verified properties</h5>
          </div>
          <div className='col-md-3'>
            <i className='bi bi-block display-4 text-success'></i>
            <h5 className='mt-2'>Secure transactions</h5>
          </div>
          <div className='col-md-3'>
            <i className='bi bi-lightning display-4 text-danger'></i>
            <h5 className='mt-2'>Fast Listings</h5>
          </div>
          <div className='col-md-3'>
            <i className='bi bi-headset display-4 text-warning'></i>
            <h5 className='mt-2'>24/7 Support</h5>
          </div>
        </div>
      </div>
    </section>
    {/* Meet the team section */}
    <section className='py-5'>
      <div className='container'>
        <h2 className='text-center fw-bold mb-4'> Meet the Awesome team behind KejaPrime</h2>
        <div className='row text-center'>
          <div className='col-md-4'>
            <img src={test_1} className='rounded-circle mb-3 mx-auto image-fluid ' alt='team member' style={{ width: '140px', height: '140px' }} />
            <h5>Pascal Ndumbi</h5>
            <p>Backend</p>
          </div>
          <div className='col-md-4'>
            <img src={test_2} className='rounded-circle mb-3 mx-auto image-fluid ' alt='team member' style={{ width: '140px', height: '140px' }} />
            <h5>Arnold Lupamo</h5>
            <p>Frontend</p>
          </div>
          <div className='col-md-4'>
            <img src={test_3} className='rounded-circle mb-3 mx-auto image-fluid ' alt='team member' style={{ width: '140px', height: '140px' }} />
            <h5>Monica Eshihanda</h5>
            <p>Frontend</p>
          </div>
        </div>
      </div>
    </section>
    <section className='py-5 text-center bg-dark  text-white'>
      <div className='container'>
        <h3>Ready to Find your dream house?</h3>
        <p>Explore our listings and find the perfect house today</p>
        <a href="/listings" className='btn btn-primary me-2'>Browse listings</a>
        <a href="/contact" className='btn btn-light'> Get in touch</a>
      </div>
    </section>
      
    </>
  )
}

export default AboutUs
