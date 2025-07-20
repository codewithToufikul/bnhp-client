import React from 'react'
import HeroSection from '../../component/HeroSection'
import Features from './Features'
import SliderSection from './SliderSection'
import CurrentEvents from './CurrentEvents'
import NewsSection from './NewsSection'
import ProgramAndBlog from './programAndBlog'
import JoinBanner from './JoinBanner'
import ContactPreview from './ContactPreview'
import Footer from '../../component/Footer'

const Home = () => {
    return (
        <div>
            <HeroSection />
            <NewsSection />
            <JoinBanner />
            <CurrentEvents />
            <SliderSection />
            <ProgramAndBlog />
            <ContactPreview />
            <Footer />
        </div>
    )
}

export default Home