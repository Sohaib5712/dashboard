/**
 * The Hero component is a React functional component that renders a header with a NavBar component.
 * @returns The Hero component is returning a JSX element. It includes a NavBar component and a header
 * element with a className of "masthead". Inside the header element, there is a div element with a
 * className of "ms-5". The div element is currently commented out, so it does not render any content.
 */
import React from 'react'
import { NavBar } from '../components'
const Hero = () => {
    return (
        <div>
            <NavBar />
            <header className="masthead">
                <div className="ms-5">
                    {/* <div className="masthead-subheading">Welcome To Our Studio!</div>
                    <div className="masthead-heading text-uppercase">It's Nice To Meet You</div> */}
                    {/* <a className="btn btn-primary text-uppercase hero-btn" href="#services">Tell Me More</a> */}
                </div>
            </header>

        </div>
    )
}

export default Hero
