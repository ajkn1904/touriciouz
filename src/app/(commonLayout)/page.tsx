import Banner from "../../components/modules/Home/Banner";
import SearchTour from "../../components/modules/Home/SearchTour";
import TourType from "../../components/modules/Home/TourType";
import Offer from "../../components/modules/Home/Offer";
import AboutUs from "../../components/modules/Home/AboutUs";
import StatCounter from "../../components/modules/Home/StatCounter";
import OurStory from "../../components/modules/Home/OurStory";
import Testimonials from "../../components/modules/Home/Testimonials";
import FindUs from "../../components/modules/Home/FindUs";
import Subscriptions from "../../components/modules/Home/Subscriptions";

const HomePage = () =>{
  return (
    <>
      <Banner />
      <SearchTour />
      <TourType />
      <Offer />
      <AboutUs />
      <StatCounter />
      <OurStory />
      <Testimonials />
      <FindUs />
      <Subscriptions />
    </>
  )
}

export default HomePage;
