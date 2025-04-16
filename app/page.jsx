import Hero from "./component/Hero"
import Navbar from "./component/Navbar"

const Homepage = () => {
    return (
      <div>
        <Navbar/>
        <Hero Heading="HydroSync" Message="Smart Water Meter"/>
      </div>
    )
  }
  
  export default Homepage