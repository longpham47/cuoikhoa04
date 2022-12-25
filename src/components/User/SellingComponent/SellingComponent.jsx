import React, { useState } from 'react';
import './selling.css';
import imgSelling from '../../../assets/User/images/img-selling-1jpg.webp'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function SellingComponent(props) {

    const [lgShow, setLgShow] = useState(false);

    return (
        <div className='selling'>
            <div className='container'>
                <div className="row selling-product">
                    <div className="col-12 col-lg-6 selling-left">
                        <h2>A whole world of freelance talent at your fingertips</h2>
                        <ul className='selling-option'>
                            <li className='selling-item'>
                                <h4 className='selling-item-title'>
                                    <i className="fa-regular fa-circle-check"></i>
                                    The best for every budget
                                </h4>
                                <p>Find high-quality services at every price point. No <br />
                                    hourly rates, just project-based pricing.</p>
                            </li>

                            <li className='selling-item'>
                                <h4 className='selling-item-title'>
                                    <i className="fa-regular fa-circle-check"></i>
                                    Quality work done quickly
                                </h4>
                                <p>Find the right freelancer to begin working on your <br />
                                    project within minutes.</p>
                            </li>

                            <li className='selling-item'>
                                <h4 className='selling-item-title'>
                                    <i className="fa-regular fa-circle-check"></i>
                                    Protected payments, every time
                                </h4>
                                <p>Always know what you'll pay upfront. Your payment isn't <br />
                                    released until you approve the work.</p>
                            </li>

                            <li className='selling-item'>
                                <h4 className='selling-item-title'>
                                    <i className="fa-regular fa-circle-check"></i>
                                    24/7 support
                                </h4>
                                <p>Questions? Our round-the-clock support team is <br />
                                    available to help anytime, anywhere.</p>
                            </li>

                        </ul>
                    </div>
                    <div className="col-12 col-lg-6 selling-right">
                        <img className='img-selling' src={imgSelling} alt="" />

                        <Button className='button-play' onClick={() => setLgShow(true)}></Button>
                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg">

                            <Modal.Body closeButton>
                             <video className="orca-video" autoPlay controls poster preload="metadata" crossOrigin="anonymous"><source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7" type="video/mp4" /><track label="EN" srcLang="en-US" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_en-US.00c8c11.vtt" default kind="subtitles" /><track label="DE" srcLang="de-DE" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_de-DE.479343e.vtt" kind="subtitles" /><track label="ES" srcLang="es" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_es.0e7d9ce.vtt" kind="subtitles" /><track label="FR" srcLang="fr-FR" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_fr-FR.62936b3.vtt" kind="subtitles" /><track label="IT" srcLang="it-IT" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_it-IT.15d2b21.vtt" kind="subtitles" /><track label="NL" srcLang="nl-NL" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_nl-NL.23e247e.vtt" kind="subtitles" /><track label="PT" srcLang="pt-BR" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/fiverr_lohp_video_pt-BR.b8ba68e.vtt" kind="subtitles"/></video>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>
        </div>
    )
}
