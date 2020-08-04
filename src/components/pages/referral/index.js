import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import Referral from './Referral';

import { useUser } from '../../../context/UserContext';

export default () => {
  const user = useUser();
  const [referrals, setReferrals] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    console.log('here');

    const getUserReferrals = async () => {
      const response = await axios.get('http://localhost:9000/referrals/' + 'test');

      console.log(response);

      setReferrals(response.data.referrals);
    };

    getUserReferrals();

    // intervalRef.current = setInterval(async () => {
    //   const referralCode = 'test1';
    //   const usedReferral = 'test';

    //   await axios.post('http://localhost:9000/referrals', {
    //     referralCode,
    //     usedReferral,
    //   });
    // }, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className='referral-page'>
      <h2>My referrals:</h2>
      <div className='referrals'>
        {referrals.map((referral, idx) => (
          <Referral key={referral._id} referral={referral} idx={idx} />
        ))}
      </div>
    </div>
  );
};
