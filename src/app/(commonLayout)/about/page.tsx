"use client";
/* eslint-disable @typescript-eslint/no-require-imports */

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaUsers, FaShieldAlt, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import 'aos/dist/aos.css';
import { UserStar } from 'lucide-react';

const AboutPage = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, []);

    const teamMembers = [
        {
            name: "Alex Morgan",
            role: "CEO & Founder",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            bio: "Former travel journalist with 15+ years in tourism industry",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Sarah Chen",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            bio: "Specializes in logistics and sustainable tourism development",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Raj Patel",
            role: "Lead Guide Coordinator",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            bio: "10+ years experience in guide training and quality assurance",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Maria Garcia",
            role: "Customer Experience",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            bio: "Ensures seamless journeys from booking to post-tour follow-up",
            social: { linkedin: "#", twitter: "#" }
        }
    ];

    return (
        <div className="font-serif max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

            {/* Hero Section */}
            <div className="relative overflow-hidden mb-20 w-full">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-green-300/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-yellow-300/10 rounded-full"></div>
                </div>

                <div className="relative px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8" data-aos="fade-right">
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Trusted Since 2025
                                </span>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    Where Every Journey
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                        Tells a Story
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    We don&apos;t just book tours—we craft experiences that connect you with the soul of destinations through
                                    passionate local guides who share their world authentically.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    href="/tour"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    <span className="relative z-10">Explore Tours</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                <Link
                                    href="#our-story"
                                    className="px-8 py-4 bg-white text-gray-800 font-bold rounded-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-300"
                                >
                                    Learn Our Story
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative" data-aos="fade-left">
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Travelers enjoying a sunset view"
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                    priority
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent"></div>
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -right-6 w-64 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-green-100"
                                data-aos="fade-up"
                                data-aos-delay="300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">4.9/5</div>
                                        <div className="text-sm text-gray-600">Average Rating</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    &quot;Life-changing experiences with incredible local guides!&quot;
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400/20 rounded-lg rotate-12"></div>
                            <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-blue-400/20 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                    data-aos="fade-up"
                    data-aos-delay="500">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div id="our-story" className="grid md:grid-cols-2 gap-12 mb-20 items-center mt-20">
                                <div className="relative" data-aos="fade-left">
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Group of travelers with guide sharing a moment"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl -z-10 opacity-20"></div>
                    <div className="absolute -top-6 -left-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full -z-10 opacity-20"></div>
                </div>
                
                <div data-aos="fade-right">
                    <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        OUR STORY
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        From Passion to Purpose
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                        Founded by a group of travel enthusiasts who believed tourism could be more meaningful,
                        Touriciouz was born from a simple idea: <span className="font-semibold text-green-600">real connections create real experiences.</span>
                    </p>
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                        What started as local walking tours has grown into a global community connecting
                        travelers with authentic local guides who share not just sights, but stories.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Verified & certified local guides",
                            "Secure SSL encrypted bookings",
                            "Best price guarantee",
                            "24/7 customer support",
                            "Sustainable tourism practices",
                            "Personalized travel experiences"
                        ].map((item, index) => (
                            <div key={index}
                                className="flex items-center gap-3"
                                data-aos="fade-right"
                                data-aos-delay={index * 50}>
                                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaCheckCircle className="text-green-600 h-3 w-3" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team/Community */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12"
                    data-aos="fade-up">
                    Our Community
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            We&apos;re more than a platform, we&apos;re a community of travel enthusiasts, local experts,
                            and adventurers who believe in authentic connections and sustainable tourism.
                        </p>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                            Every guide on our platform undergoes thorough verification and training to ensure
                            they meet our standards for safety, knowledge, and hospitality.
                        </p>
                    </div>

                    <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl"
                        data-aos="fade-left">
                        <Image
                            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Guide leading a tour group"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>



            {/* Why Choose Us */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12"
                    data-aos="fade-up">
                    Why Travel With Us
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <UserStar className="h-8 w-8" />,
                            title: "Expert Local Guides",
                            desc: "Every guide is vetted, certified, and passionate about sharing their local knowledge."
                        },
                        {
                            icon: <FaShieldAlt className="h-8 w-8" />,
                            title: "Safe & Secure",
                            desc: "SSL encryption, secure payments, and insured tours for peace of mind."
                        },
                        {
                            icon: <FaUsers className="h-8 w-8" />,
                            title: "Small Groups",
                            desc: "Intimate group sizes for personalized attention and better experiences."
                        }
                    ].map((item, index) => (
                        <div key={index}
                            className="text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 text-green-600">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Team */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12"
                    data-aos="fade-up">
                    Meet Our Team
                </h2>

                <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12"
                    data-aos="fade-up"
                    data-aos-delay="100">
                    Behind every great journey is a dedicated team of travel experts, technologists, and
                    customer experience specialists working together to make your adventures unforgettable.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}>
                            <div className="relative h-64">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-green-600 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">
                                    {member.bio}
                                </p>
                                <div className="flex gap-3">
                                    <a href={member.social.linkedin}
                                        className="text-gray-400 hover:text-green-600 transition-colors"
                                        aria-label={`${member.name}'s LinkedIn`}>
                                        <FaLinkedin className="h-5 w-5" />
                                    </a>
                                    <a href={member.social.twitter}
                                        className="text-gray-400 hover:text-green-600 transition-colors"
                                        aria-label={`${member.name}'s Twitter`}>
                                        <FaTwitter className="h-5 w-5" />
                                    </a>
                                    <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@touriciouz.com`}
                                        className="text-gray-400 hover:text-green-600 transition-colors"
                                        aria-label={`Email ${member.name}`}>
                                        <MdEmail className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12"
                    data-aos="fade-up">
                    Our Values
                </h2>

                <div className="max-w-7xl mx-auto">
                    {[
                        {
                            title: "Authenticity",
                            desc: "We prioritize genuine local experiences over tourist traps, ensuring you connect with real culture and people."
                        },
                        {
                            title: "Sustainability",
                            desc: "We promote responsible tourism that supports local communities and preserves destinations for future generations."
                        },
                        {
                            title: "Excellence",
                            desc: "From guide selection to customer support, we maintain the highest standards in everything we do."
                        }
                    ].map((value, index) => (
                        <div key={index}
                            className="mb-8 pb-8 border-b border-gray-200 last:border-0"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}>
                            <h3 className="text-2xl font-bold text-green-600 mb-4">
                                {value.title}
                            </h3>
                            <p className="text-gray-700 text-lg">
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 mb-24">
                <h2 className="text-3xl font-bold text-gray-800 mb-6"
                    data-aos="fade-up">
                    Ready for Your Next Adventure?
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    Join thousands of travelers who&apos;ve discovered the world differently with Touriciouz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center"
                    data-aos="fade-up"
                    data-aos-delay="400">
                    <Link
                        href="/tour"
                        className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                        Browse Tours
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;