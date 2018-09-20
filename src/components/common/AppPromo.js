import React from 'react';
import phoneImage from '../../img/i-6.png';
import twitter from '../../img/twitter.png';
import facebook from '../../img/facebook.png';
import appStore from '../../img/appstore-button.png';
import play from '../../img/play.png';

const AppPromo = () => (
  <div className="appPromo">
    <div className="phone" >
      <img className="play" alt="play" src={play} />
      <img alt="phone" src={phoneImage} />
    </div>
    <img alt="appStore" src={appStore} />
    <div className='social'>
      <img alt="fb" src={facebook} />
      <img alt="tw" src={twitter} />
    </div>

  </div>
);

export default AppPromo;
