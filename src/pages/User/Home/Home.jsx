import React from 'react';
import CarouselComponent from '../../../components/User/CarouselComponent/Carousel';
import ExploreComponent from '../../../components/User/ExploreComponent/ExploreComponent';
import SellingComponent from '../../../components/User/SellingComponent/SellingComponent';
import ServicesComponent from '../../../components/User/ServicesComponent/ServicesComponent';
import { BackTop } from 'antd';
import './home.css';

export default function Home(props) {

  document.title = 'Fiverr - Freelance Services Marketplaces'

  return (
    <div>

      <CarouselComponent />

      <div className='bg-tructed-by'>
        <div className='tructed-by container'>
          <span className='tructed'> Trusted by :</span>
          <ul className='tructed-img'>
            <li className='tructed-img-item'>
              <picture>
                <source media="(max-width: 899px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.543cf10.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.2eb3efa.png 2x" /><source media="(min-width: 900px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png 2x" />
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png" alt="facebook" />
              </picture>
            </li>
            <li className='tructed-img-item'>
              <picture><source media="(max-width: 899px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.aaaa0ad.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.b5c24c4.png 2x" /><source media="(min-width: 900px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png 2x" /><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png" alt="Google" /></picture>
            </li>
            <li className='tructed-img-item'>
              <picture><source media="(max-width: 899px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.3cb353a.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.02746a2.png 2x" /><source media="(min-width: 900px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png 2x" /><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png" alt="NETFLIX" /></picture>
            </li>
            <li className='tructed-img-item'>
              <picture><source media="(max-width: 899px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.128c0d9.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.259884d.png 2x" /><source media="(min-width: 900px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png 2x" /><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png" alt="P&G" /></picture>
            </li>
            <li className='tructed-img-item item-none'>
              <picture><source media="(max-width: 899px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.9e4defc.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.e48e2b0.png 2x" /><source media="(min-width: 900px)" srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png 2x" /><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png" alt="PayPal" /></picture>
            </li>
          </ul>
        </div>
      </div>
      <ServicesComponent />
      <SellingComponent />
      <ExploreComponent />

      <BackTop>
        <div className="backTopStyle">
          <i className="fa-solid fa-angles-up backTopStyle"></i>
        </div>
      </BackTop>
    </div>
  )
}