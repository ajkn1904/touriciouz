import Footer from "@/src/components/shared/Footer/Footer";
import NavBar from "@/src/components/shared/Navbar/Navbar";
import { Suspense } from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<p>Loading page...</p>}>
                <main className="min-h-[75vh]">{children}</main>
            </Suspense>
            <Footer />
        </>
    );
};

export default CommonLayout;