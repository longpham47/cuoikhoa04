import React, { useState } from 'react';
import './explore.css';
import exploreimg from '../../../assets/User/images/explore-img1.webp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ExploreComponent(props) {

    const [lgShow, setLgShow] = useState(false);

    return (
        <div className='container'>
            <div className='explore'>
                <div className="row explore-product">
                    <div className="col-12 col-lg-5">
                        <img className='explore-img' src={exploreimg} alt="" />
                        <Button className='button-play' onClick={() => setLgShow(true)}></Button>
                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg">

                            <Modal.Body closeButton>
                                <video className="orca-video" autoPlay controls poster preload="metadata" crossOrigin="anonymous"><source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw" type="video/mp4" /><track label="EN" srcLang="en-US" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_en-US.c5b4b90.vtt" default kind="subtitles" /><track label="DE" srcLang="de-DE" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_de-DE.1dc40ba.vtt" kind="subtitles" /><track label="ES" srcLang="es" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_es.f169ad9.vtt" kind="subtitles" /><track label="FR" srcLang="fr-FR" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_fr-FR.45af1b3.vtt" kind="subtitles" /><track label="IT" srcLang="it-IT" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_it-IT.36e1c17.vtt" kind="subtitles" /><track label="NL" srcLang="nl-NL" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_nl-NL.696566f.vtt" kind="subtitles" /><track label="PT" srcLang="pt-BR" src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/apps/Kim and Olivia - rooted_pt-BR.c3cb175.vtt" kind="subtitles" /></video>

                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="col-12 col-lg-7">
                        <p className='explore-title'>
                            Kay Kim, Co-Founder | <span className='explore-logo'>rooted</span>
                        </p>
                        <p className='explore-content'>
                            "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working."
                        </p>
                        <div className='explore-right'></div>
                    </div>
                </div>
            </div>
            <div className='explore-market'>
                <h2>Explore the marketplace</h2>
                <div className='explore-product-market'>
                    <div className='explore-item'>
                        <i className="fa-solid fa-palette" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-ranking-star" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-file-word" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-photo-film" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-volume-high" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-laptop-code" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-briefcase" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-mug-hot" />
                    </div>

                    <div className='explore-item'>
                        <i className="fa-solid fa-database" />
                    </div>
                </div>
            </div>
        </div>
    )
}












