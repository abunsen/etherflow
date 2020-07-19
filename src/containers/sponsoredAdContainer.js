import React, { useState, useEffect } from 'react';
import { SponsoredAd } from '../components';

const SponsoredAdContainer = () => {
  // should we be showing the sponsor?
  const [sponsorVisible, setSponsorVisible] = useState(false);
  useEffect(() => {
    let to = setTimeout(() => {
      setSponsorVisible(true);
    }, 130000);

    return () => {
      clearTimeout(to);
    };
  }, []);

  return (
    <SponsoredAd
      visible={sponsorVisible}
      setSponsorVisible={setSponsorVisible}
    />
  );
};

export { SponsoredAdContainer };
