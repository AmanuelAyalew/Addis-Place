import React from "react";
import HeroSection from "./HeroSection";
import MenuPreview from "./MenuPreview";
import StorySection from "./StorySection";
import ContactReservation from "./ContactReservation";

const Home = () => {
  return (
    <div>
      <HeroSection name={"user1"} id={50} />
      <MenuPreview />
      <StorySection />
      <ContactReservation />
    </div>
  );
};

export default Home;
