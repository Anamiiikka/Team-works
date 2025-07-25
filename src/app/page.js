// src/app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '@/components/AboutUs';
import WhoWeAre from '@/components/WhoWeAre';
import Services from '@/components/Services';
import Trusted from '@/components/Trusted';
import Opportunity from '@/components/Opportunity';
import Footer from '@/components/Footer';
import ContactUs from '@/components/ContactUs';


export default function Home() {
  return (
    <>
    
      <Hero />
      <Trusted />
      <AboutUs />
      <WhoWeAre />
      <Services />
      <Opportunity />
      <ContactUs />
      <Footer/>

     
    </>
  );
}
