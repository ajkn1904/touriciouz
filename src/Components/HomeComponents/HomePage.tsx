import NavBar from "@/pages/NavBar";
import Banner from "./Banner";
import SearchTour from "./SearchTour";
import AboutUs from "./AboutUs";
import StatCounter from "./StatCounter";
import Offer from "./Offer";
import TourType from "./TourType";
import Testimonials from "./Testimonials";
import FindUs from "./FindUs";


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
            <FindUs/>
        </>
    );
};

export default HomePage;