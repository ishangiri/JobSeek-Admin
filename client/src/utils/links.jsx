import React from 'react';

import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


const links = [
    { text: 'add job', path: '.', icon: <FaWpforms /> },
    { text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
    { text: 'profile', path: 'profile', icon: <ImProfile /> },
  ];

  export default links;