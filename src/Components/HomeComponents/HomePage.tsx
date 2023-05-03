import NavBar from "@/pages/NavBar";
import Banner from "./Banner";
import SearchTour from "./SearchTour";
import AboutUs from "./AboutUs";
import StatCounter from "./StatCounter";
import Offer from "./Offer";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <SearchTour />
            <AboutUs />
            <StatCounter/>

            <Offer/>
        </>
    );
};

export default HomePage;