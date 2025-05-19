import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import EcoRetreat from '../../components/eco-retreat-odisha/eco-retreat'
import { useParams } from 'react-router-dom'

const EcoRetreatPage = () => {
  const { location } = useParams(); // Fetch location from route params

  const locationTitle = location ? `Eco Retreat - ${location.charAt(0).toUpperCase() + location.slice(1)}` : 'Eco Retreat Locations - Eco Retreat Odisha';
  const locationDescription = location 
    ? `Discover the beautiful eco retreat location in ${location.charAt(0).toUpperCase() + location.slice(1)}. Plan your nature retreat today.` 
    : 'Discover the beautiful eco retreat locations in Odisha including Konark, Satkosia, Hirakud, Bhitarkanika, Putsil, Daringbadi, and Sonapur. Plan your nature retreat today.';

  return (
    <>
      <Helmet>
        <title>{locationTitle}</title>
        <meta name="description" content={locationDescription} />
        <meta name="keywords" content="Eco retreat Odisha, eco retreat Konark, eco retreat Satkosia, eco retreat Hirakud, eco retreat Bhitarkanika, eco retreat Putsil, eco retreat Daringbadi, eco retreat Sonapur, Odisha eco tourism" />
        <link rel="canonical" href={`https://ecoretreatodisha.in/eco-retreat/${location}`} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": locationTitle,
            "url": `https://ecoretreatodisha.in/eco-retreat/${location}`,
            "description": locationDescription,
            "keywords": "Eco retreat Odisha, eco retreat Konark, eco retreat Satkosia, eco retreat Hirakud, eco retreat Bhitarkanika, eco retreat Putsil, eco retreat Daringbadi, eco retreat Sonapur, Odisha eco tourism"
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <EcoRetreat />
      <Footer />
    </>
  )
}

export default EcoRetreatPage;
