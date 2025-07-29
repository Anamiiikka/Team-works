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
import FAQ from '@/components/FAQ';

import Testimonials from '@/components/Testimonials';


export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <Trusted />
      <section id="about">
        <AboutUs />
        <WhoWeAre />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="testimonials">
        <Testimonials/>
      </section>
      <FAQ />
      <section id="career">
        <Opportunity />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer/>
    </>
  );
}
