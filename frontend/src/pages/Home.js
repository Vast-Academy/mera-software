import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      
      <BannerProduct/>
      <CategoryList/>
      
      
      <VerticalCardProduct category={"static"} heading={"Static Websites"}/>
      <VerticalCardProduct category={"standard"} heading={"Standard Websites"}/>
      <VerticalCardProduct category={"dynamic"} heading={"Dynamic Websites"}/>
    </div>
  )
}

export default Home
