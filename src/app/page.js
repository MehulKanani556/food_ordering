import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";
import React from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeader subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto flex flex-col gap-4 mt-4 ">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            error quisquam dolores expedita ex praesentium. Explicabo, sunt eius
            quidem optio cupiditate, nobis fuga laudantium, placeat in
            perspiciatis distinctio. Perferendis, consequatur.
          </p>
          <p>
            Possimus soluta illo sit dicta illum quam a. Consequatur explicabo
            illum rerum deserunt, numquam debitis nihil, molestiae quibusdam
            maiores, nesciunt recusandae dolore?
          </p>
          <p>
            Laborum molestias negue nulla obcaecati odio guia quod reprehenderit
            sit vitae voluntates? Eos, tenetur.
          </p>
        </div>
      </section>
      <section className="text-center my-16" id="contact">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact us"} />
        <div className="mt-8">
          <a href="tel:+919638462249" className="text-4xl underline text-gray-500">
            +91 963 846 2249
          </a>
        </div>
      </section>
      
    </>
  );
}
