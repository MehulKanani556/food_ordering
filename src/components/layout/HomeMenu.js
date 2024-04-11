/* eslint-disable react/jsx-key */
'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers,setBestSellers] = useState([]);
  
  useEffect(() =>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(menuItems =>{
          setBestSellers(menuItems.slice(-3)); 
      });
    });
  },[]);
  return (
    <section>
      <div className="absolute left-0 right-0 w-full">
        <div className="absolute left-0 -top-[100px] -z-10">
          <Image
            src={"/sallad1.png"}
            width={109}
            height={189}
            alt={"sallad"}
          ></Image>
        </div>
        <div className="absolute right-0 -top-[100px] -z-10">
          <Image
            src={"/sallad2 copy.png"}
            width={107}
            height={195}
            alt={"sallad"}
          ></Image>
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeader 
          subHeader={"check out"} 
          mainHeader={"Our best sellers"} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item =>(
          <MenuItem key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
}
