import React from 'react'
import Header from '../component/Header';
import SpacialityMenu from '../component/SpacialityMenu';
import TopDoctors from '../component/TopDoctors';
import Banner from '../component/Banner';

const Home = () => {
  return (
    <div>
      <Header/>
      <SpacialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home;
