import React from 'react';
import phoneImage from '../../img/i-6.png';
import twitter from '../../img/twitter.png';
import facebook from '../../img/facebook.png';
import appStore from '../../img/appstore-button.png';

const AppPromo = () => (
  <div className='appPromo'>
    <img src={phoneImage}  />
    <img src={appStore} />
    <div className='social'>
      <img src={facebook} />
      <img src={twitter} />
     </div>

  </div>
);

export default AppPromo;
