import Footer from "@/src/components/shared/Footer/Footer";
import NavBar from "@/src/components/shared/Navbar/Navbar";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <NavBar/>
            {children}
            <Footer/>
        </>
    );
};

export default CommonLayout;