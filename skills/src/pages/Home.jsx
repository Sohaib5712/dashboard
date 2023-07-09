/* The code is importing various components from different files and using them to create a home page
component. */
import React from 'react'
import { Hero, Service, Course, About, Partern, Contact, Footer } from '../container'
import { Gallery } from '../components'

const Home = () => {
    return (
        <div>
            <Hero />
            <Gallery />
            <Course />
            <Service />
            <About />
            <Partern />
            <Contact />
            <Footer />

        </div>
    )
}

export default Home
