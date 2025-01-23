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
                        <p>
                        At KejaPrime, we take pride in providing unmatched value to our clients. <br /> Renting a home should be more than just finding a place to live—it’s about peace of mind, convenience, and long-term satisfaction. 
                        </p>
                    </div>
                    <div className='accordion mt-5 ' id='valuesAccordion'>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-1'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-1' aria-expanded='true'
                                aria-controls='value-1'> Lifetime Warranty</button>
                            </h2>
                            <div id='value-1' className='accordion-collapse collapse show'
                            aria-labelledby='heading-1' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                        We offer a lifetime warranty on all our rented properties through our platform. <br /> This ensures you always have peace of mind when renting with us.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*Accordion part 2*/}
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-2'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-2' aria-expanded='false'
                                aria-controls='value-2'> Cheapest rates</button>
                            </h2>
                            <div id='value-2' className='accordion-collapse collapse'
                            aria-labelledby='heading-2' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    Our rental prices are guaranteed to be the lowest in the market. We value affordability without compromising on quality and service. <br /> This ensures you always have peace of mind when renting with us.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-3'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-3' aria-expanded='false'
                                aria-controls='value-3'> Strategic Location</button>
                            </h2>
                            <div id='value-3' className='accordion-collapse collapse'
                            aria-labelledby='heading-3' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    All our properties are situated in prime locations, ensuring easy access to essential services and transportation. <br /> This ensures you always have peace of mind when renting with us.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='heading-4'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse'
                                data-bs-target='#value-4' aria-expanded='false'
                                aria-controls='value-4'> Lower Tax Rates</button>
                            </h2>
                            <div id='value-4' className='accordion-collapse collapse'
                            aria-labelledby='heading-4' data-bs-parent='#valuesAccordion'>
                                <div className='accordion-body'>
                                    <p>
                                    All our properties are situated in prime locations, ensuring easy access to essential services and transportation. <br /> This ensures you always have peace of mind when renting with us.
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
