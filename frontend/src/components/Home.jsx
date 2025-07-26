// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Creator from "../Home/Creator";
import Coding from "../Home/Coding";
import Entertainment from "../Home/Entertainment";
import Business from "../Home/Business";
import Sports from "../Home/Sports";
import Search from "../Home/Search";





function Home() {
  
  return (
    <div>
      <Search />
      <Hero />
      <Trending />
      <Entertainment />
      <Sports />
      <Coding />      
      <Business />
      <Devotional />
      <Creator />
    </div>
  );
}

export default Home;
