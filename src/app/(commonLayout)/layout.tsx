import Footer from "@/src/components/shared/Footer/Footer";
import NavBar from "@/src/components/shared/Navbar/Navbar";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <NavBar/>
             <main className="min-h-[75vh]">{children}</main>
            <Footer/>
        </>
    );
};

export default CommonLayout;