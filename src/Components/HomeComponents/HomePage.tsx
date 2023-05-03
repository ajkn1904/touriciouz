import NavBar from "@/pages/NavBar";
import Banner from "./Banner";
import SearchTour from "./SearchTour";
import AboutUs from "./AboutUs";
import StatCounter from "./StatCounter";
import Offer from "./Offer";
import TourType from "./TourType";
import Testimonials from "./Testimonials";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <SearchTour />
            <TourType />
            <Offer />
            <StatCounter />
            <Testimonials/>
            <AboutUs />
        </>
    );
};

export default HomePage;