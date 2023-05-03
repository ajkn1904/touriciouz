import NavBar from "@/pages/NavBar";
import Banner from "./Banner";
import SearchTour from "./SearchTour";
import AboutUs from "./AboutUs";
import StatCounter from "./StatCounter";
import Offer from "./Offer";
import TourType from "../TourType";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <SearchTour />
            <AboutUs />
            <StatCounter />
            <TourType />
            <Offer />
        </>
    );
};

export default HomePage;