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
      
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
    </div>
  )
}

export default Home
