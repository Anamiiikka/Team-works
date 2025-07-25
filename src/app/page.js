// src/app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Trusted from '@/components/Trusted';
import Opportunity from '@/components/Opportunity';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <>
    
      <Hero />
      <Trusted />
      <AboutUs />
      <Services />
      <Opportunity />
      <Footer/>
     
    </>
  );
}
