import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import MenuPreview from "./MenuPreview";
import StorySection from "./StorySection";
import ContactReservation from "./ContactReservation";
import "./index.css";

// Main App Component
const App = () => {
  return (
   <>

   
      <Header />
      <HeroSection name={"user1"} id={50}/>
     <MenuPreview />
     <StorySection />
     <ContactReservation />
    <Footer />
 

    </>
  );
};

export default App;