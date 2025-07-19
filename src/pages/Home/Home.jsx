import React from "react";
import Hero from "../../pages/Hero/Hero";
import NewArrivel from "../MainNavBar/NewArrivel";
import Topsaleing from "../TopSale/Topsaleing";
import Dress from "../DressStyle/Dress";
import Testimoni from "../Testimoni/Testimoni";
import Slider from "../BrandSlider/Slider";
import EmailSection from "../Email/EmailSection";

function Home() {
  return (
   <>
   <Hero/>
   <Slider/>
   <NewArrivel/>
   <Topsaleing/>
   <Dress/>
   <Testimoni/>
   <EmailSection/>
    
   </>
  );
}

export default Home;
