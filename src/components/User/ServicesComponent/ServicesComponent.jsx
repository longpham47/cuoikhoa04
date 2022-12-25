import React from 'react';
import Slider from "react-slick";
import './services.css';
import imgSlides1 from '../../../assets/User/images/small-carousel-1.png'
import imgSlides2 from '../../../assets/User/images/small-carousel-2.png'
import imgSlides3 from '../../../assets/User/images/small-carousel-3.png'
import imgSlides4 from '../../../assets/User/images/small-carousel-4.png'
import imgSlides5 from '../../../assets/User/images/small-carousel-5.png'
import imgSlides6 from '../../../assets/User/images/small-carousel-6.png'
import imgSlides7 from '../../../assets/User/images/small-carousel-7.png'
import imgSlides8 from '../../../assets/User/images/small-carousel-8.png'
import imgSlides9 from '../../../assets/User/images/small-carousel-9.png'
import imgSlides10 from '../../../assets/User/images/small-carousel-10.png'


export default function ServicesComponent(props) {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: 0,
        slidesToShow: 5,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1194,
                settings: {
                    slidesToShow: 3,
                    rows: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    rows: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    return (
        <div className='services-title'>
            <h3 className='container'>Popular professional services</h3>
            <div className='container-fluid'>
                <Slider className='slider' {...settings}>
                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides1} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Build your brand</span>
                                <p className='text-item-logo'>Logo Design</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides2} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Customize your site</span>
                                <p className='text-item-logo'>WordPress</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides3} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Share your message</span>
                                <p className='text-item-logo'>Voice Over</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides4} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Engage your audience</span>
                                <p className='text-item-logo'>Video Explainer</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides5} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Reach more customers</span>
                                <p className='text-item-logo'>Social Media</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides6} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Unlock growth online</span>
                                <p className='text-item-logo'>SEO</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides7} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Color your dreams</span>
                                <p className='text-item-logo'>Illustration</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides8} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Go global</span>
                                <p className='text-item-logo'>Translation</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides9} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Learn your business</span>
                                <p className='text-item-logo'>Data Entry</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='slides-item-bg'>
                            <img className='slides-item' src={imgSlides10} alt="" />
                            <div className='slides-item-content'>
                                <span className='text-item-title'>Showcase your story</span>
                                <p className='text-item-logo'>Book Covers</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
