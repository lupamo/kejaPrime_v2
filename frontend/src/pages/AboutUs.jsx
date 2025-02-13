import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import hero from '../assets/images/hero.png';

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
        </div>
        </div>
    </section>
      
    </>
  )
}

export default AboutUs
