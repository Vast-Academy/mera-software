import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import AppConvertingBanner from '../components/AppConvertingBanner'
import HomeSecondBanner from '../components/HomeSecondBanner'
import WhyChooseSection from '../components/WhyChooseSection'
import WhatDoYouNeedSection from '../components/WhatDoYouNeedSection'
import CompleteBusinessSolutions from '../components/CompleteBusinessSolutions'
// import OurReadySolutions from '../components/OurReadySolutions'

const Home = () => {
  return (
    <div>

      <AppConvertingBanner/>
      <CategoryList/>
      <WhyChooseSection/>
      <WhatDoYouNeedSection/>
      <CompleteBusinessSolutions/>
      {/* <OurReadySolutions/> */}
      {/* <VerticalCardProduct category={"standard_websites"} heading={"Standard Websites"}/> */}
      {/* <VerticalCardProduct category={"dynamic_websites"} heading={"Dynamic Websites"}/> */}
      
      {/* <BannerProduct serviceName="home"/> */}
      {/* <VerticalCardProduct category={"app_development"} heading={"Mobile Apps"}/> */}
      {/* <VerticalCardProduct category={"cloud_software_development"} heading={"Cloud Softwares"}/> */}
      {/* <VerticalCardProduct category={"feature_upgrades"} heading={"Feature Upgrades"}/> */}

      <HomeSecondBanner/>
    
    </div>
  )
}

export default Home;
