"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/lib/utils";

const SearchTour = () => {
    useEffect(() => {
        AOS.init({
            offset: 10,
            duration: 1000,
            easing: "ease-in-out",
            delay: 50,
            once: false,
        });

        setTimeout(() => {
            AOS.refresh();
        }, 200);
    }, []);

    return (
         <div className="relative flex justify-center w-[90%] max-w-7xl mx-auto font-serif -mt-14 lg:-mt-10">
            <div
                className="w-full sm:w-[90%] md:w-[90vw] font-serif border border-yellow-400 shadow-xl shadow-blue-200 rounded-lg p-5 bg-white relative"
                data-aos="flip-up"
            >
                <h3 className="text-center text-2xl text-green-600 italic font-semibold my-3">
                    Search Tours__
                </h3>

                <p className="text-center">Find your dream tour today from here!</p>

                {/* GRID */}
                <form className="grid md:grid-cols-2 lg:grid-cols-4 justify-items-center my-4 gap-y-4">

                    {/* DESTINATION */}
                    <div className="w-80 md:w-[95%]">
                        <Input
                            placeholder="Destination"
                            className={cn(
                                "h-11 rounded-md border border-slate-300 shadow-sm focus-visible:ring-green-400"
                            )}
                        />
                    </div>

                    {/* TOUR TYPE */}
                    <div className="w-80 md:w-[95%]">
                        <Input
                            placeholder="Tour Type"
                            className={cn(
                                "h-11 rounded-md border border-slate-300 shadow-sm focus-visible:ring-green-400"
                            )}
                        />
                    </div>

                    {/* DURATION */}
                    <div className="w-80 md:w-[95%]">
                        <Input
                            placeholder="0 Days - 10 Days"
                            className={cn(
                                "h-11 rounded-md border border-slate-300 shadow-sm focus-visible:ring-green-400"
                            )}
                        />
                    </div>

                    {/* MONTH PICKER */}
                    <div className="w-80 md:w-[95%]">
                        <Input
                            type="month"
                            className={cn(
                                "h-11 rounded-md border border-slate-300 shadow-sm text-slate-500 focus-visible:ring-green-400"
                            )}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SearchTour;
