import React from 'react'
import Hero from '../components/Hero'
import NewsletterBox from '../components/NewsletterBox'
import OurPolicy from '../components/OurPolicy'
import LatestCollection from '../components/LatestCollection'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Testimonial />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
