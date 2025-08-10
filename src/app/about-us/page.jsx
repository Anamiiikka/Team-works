import AboutUs from "@/components/AboutUs"
import Services from "@/components/Services"
import WhoWeAre from "@/components/WhoWeAre"
import Testimonials from "@/components/Testimonials"
import ContactUs from "@/components/ContactUs"
import Footer from "@/components/Footer"
import Top from "@/components/Top"

export default function AboutPage() {
    return(
        <>
            <Top 
            title="About Us"
        locationTitle="Home >> About Us"
            />
            <AboutUs showFounders={false} />
            <WhoWeAre />
            <Services />
            <Testimonials />
            <ContactUs />
            <Footer />
        </>
    )
}