import React from 'react'
import '../styles/Value.css';
import exterior from '../assets/images/exterior_5.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Value = () => {
  return (
    <section className='value-section py-5'>
        <div className='container-md'>
            <div className='row my-5 gap-5 justify-content-around align-items-center'>
                {/*left image */}
                <div className='col-6 col-lg-4'>
                    <div className='text-center'>
                        <h2> We Help You to Find Your <br /> Dream House</h2>
                    </div>
                    <img src={exterior} alt="My home"  className=' mt-5 img-fluid' />
                </div>
                {/*Accordion part 1*/}
                <div className='col-lg-6'>
                    <div>
                        <p className='lead'>
                        At KejaPrime, we are revolutionizing the rental experience by bridging the gap between renters and landlords. <br /> 
                        Whether you're searching for your next home or listing your property, we provide a trusted and transparent platform that puts people first.
                        </p>
                    </div>
                    <div className='accordion mt-5 ' id='valuesAccordion'>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-1'>
                                <button className='accordion-button fw-bold' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-1' aria-expanded='true'
                                aria-controls='value-1'> Verified Listings</button>
                            </h2>
                            <div id='value-1' className='accordion-collapse collapse show'
                            aria-labelledby='heading-1' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    All listings on KejaPrime are carefully verified to ensure accuracy and legitimacy, helping renters avoid scams and landlords connect with serious clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*Accordion part 2*/}
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-2'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-2' aria-expanded='false'
                                aria-controls='value-2'> Affordable Options </button>
                            </h2>
                            <div id='value-2' className='accordion-collapse collapse'
                            aria-labelledby='heading-2' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    We prioritize affordability for all our users. With a wide range of options to fit different budgets, KejaPrime makes it easy to find a housewithout breaking the bank.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-3'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-3' aria-expanded='false'
                                aria-controls='value-3'> Seamless Communication</button>
                            </h2>
                            <div id='value-3' className='accordion-collapse collapse'
                            aria-labelledby='heading-3' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    Our platform facilitates direct and secure messaging between landlords and potential tenants, streamlining the rental process and eliminating middlemen.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-4'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-4' aria-expanded='false'
                                aria-controls='value-4'> Trusted Support </button>
                            </h2>
                            <div id='value-4' className='accordion-collapse collapse'
                            aria-labelledby='heading-4' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    We’re here to support you throughout your rental journey. From search to signing, KejaPrime provides resources, customer support, and tools that make renting stress-free.
        
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Value
