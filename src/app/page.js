// src/app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
     
    </>
  );
}
