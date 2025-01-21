import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      
      <BannerProduct/>
      <CategoryList/>
      
      <HorizontalCardProduct category={"websites"} heading={"Top's Websites"}/>
      <HorizontalCardProduct category={"website updates"} heading={"Website Updates"}/>
      <HorizontalCardProduct category={"website features"} heading={"Website Features"}/>


      
      <VerticalCardProduct category={"web apps"} heading={"Web Apps"}/>
      <VerticalCardProduct category={"gallery designs"} heading={"Gallery Designs"}/>
    </div>
  )
}

export default Home
