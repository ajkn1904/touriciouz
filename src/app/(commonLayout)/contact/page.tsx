"use client";
/* eslint-disable @typescript-eslint/no-require-imports */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaLinkedin, FaGithub, FaWhatsapp, FaGlobe, FaExternalLinkAlt, FaGlobeAsia, FaHome, FaHeadset, FaComments } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import 'aos/dist/aos.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        tourType: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                tourType: ''
            });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: <FaPhone className="h-6 w-6" />,
            title: "Call Us",
            details: ["+8801521228030"],
            subtitle: "Mon-Sun, 9AM-9PM EST",
            link: "tel:+8801521228030",
            isLink: true,
            linkStyle: "text-green-600 hover:text-blue-500 hover:underline"
        },
        {
            icon: <FaEnvelope className="h-6 w-6" />,
            title: "Email Us",
            details: ["anika.nishat06@gmail.com"],
            subtitle: "Response within 24 hours",
            link: "mailto:anika.nishat06@gmail.com",
            isLink: true,
            linkStyle: "text-green-600 hover:text-blue-500 hover:underline"
        },
        {
            icon: <FaGlobeAsia className="h-6 w-6" />,
            title: "Visit Us",
            details: ["Anika Jumana Khanam Nishat"],
            subtitle: "Personal Portfolio Website",
            link: "https://anika-portfolio-kappa.vercel.app/",
            isLink: true,
            linkStyle: "text-green-600 hover:text-blue-500 hover:underline"
        },
        {
            icon: <FaClock className="h-6 w-6" />,
            title: "Business Hours",
            details: ["Monday - Friday: 10AM - 7PM", "Saturday - Sunday: 10AM - 5PM"],
            subtitle: "Local time (BDT)",
            link: "#",
            isLink: false,
            linkStyle: ""
        }
    ];

    const socialLinks = [
        {
            name: "LinkedIn",
            color: "bg-blue-600",
            icon: <FaLinkedin className="h-5 w-5" />,
            url: "https://www.linkedin.com/in/anika-jumana-khanam/",
            label: "Visit LinkedIn Profile"
        },
        {
            name: "GitHub",
            color: "bg-gray-800",
            icon: <FaGithub className="h-5 w-5" />,
            url: "https://github.com/ajkn1904",
            label: "Visit GitHub Profile"
        },
        {
            name: "WhatsApp",
            color: "bg-green-500",
            icon: <FaWhatsapp className="h-5 w-5" />,
            url: "https://wa.me/8801521228030",
            label: "Message on WhatsApp"
        },
        {
            name: "Portfolio",
            color: "bg-indigo-500",
            icon: <FaGlobe className="h-5 w-5" />,
            url: "https://anika-portfolio-kappa.vercel.app/",
            label: "Visit Portfolio Website"
        }
    ];

    const tourTypes = [
        "Adventure Tours",
        "Cultural Tours",
        "Nature Tours",
        "Nightlife Tours",
        "Historical Tours",
        "Food & Shopping Tours",
        "Art Tours",
        "Other"
    ];

    return (
        <div className="font-serif max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Hero Section - Modified similar to about page */}
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
                                    Always Here to Help
                                </span>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    We&apos;re Here to
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                        Help You Journey
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Have questions about our tours? Need help with booking? Our travel experts are here to help you plan your perfect adventure with personalized assistance.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-4">
                                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
                                    <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
                                    <div className="text-sm text-gray-600">Support Available</div>
                                </div>
                                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
                                    <div className="text-2xl font-bold text-green-600 mb-2">2-4h</div>
                                    <div className="text-sm text-gray-600">Avg Response Time</div>
                                </div>
                                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
                                    <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative" data-aos="fade-left">
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Customer support team helping travelers"
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
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                                        <FaHeadset className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">4.8/5</div>
                                        <div className="text-sm text-gray-600">Support Rating</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    &quot;Exceptional support that made our trip planning effortless!&quot;
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

            {/* Rest of your existing contact page content remains the same */}
            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {contactInfo.map((info, index) => (
                    <div key={index}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}>
                        <div className={`inline-flex items-center justify-center w-12 h-12 text-green-500 mb-4`}>
                            {info.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            {info.title}
                        </h3>
                        <div className="space-y-2 mb-3">
                            {info.details.map((detail, i) => (
                                <div key={i}>
                                    {info.isLink ? (
                                        <a
                                            href={info.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${info.linkStyle} transition-colors inline-flex items-center gap-1 font-medium`}
                                        >
                                            {detail}
                                        </a>
                                    ) : (
                                        <p className="text-gray-700">
                                            {detail}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            {info.subtitle}
                            {info.title === "Visit Portfolio" && (
                                <span className="block text-xs text-gray-400 mt-1">
                                    anika-portfolio-kappa.vercel.app
                                </span>
                            )}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 my-24">
                {/* Contact Form */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-xl"
                    data-aos="fade-right">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3">
                            <MdSupportAgent className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Send us a Message
                            </h2>
                            <p className="text-gray-600">
                                We typically respond within 2-4 hours
                            </p>
                        </div>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <FaCheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Message Sent Successfully!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Thank you for reaching out. Our team will get back to you shortly.
                            </p>
                            <Link
                                href="/tour"
                                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
                            >
                                Browse Tours While You Wait
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        placeholder="+8801521228030"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Interested In
                                    </label>
                                    <select
                                        name="tourType"
                                        value={formData.tourType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">Select tour type</option>
                                        {tourTypes.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us about your travel plans, questions, or concerns..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Map, Social Media & Newsletter*/}
                <div className="space-y-8" data-aos="fade-left">
                    {/* Map */}
                    <div className="bg-white p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Our Headquarters
                        </h3>
                        <div className="relative h-[300px] rounded-md overflow-hidden mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Touriciouz Office Location"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaHome className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="font-semibold text-gray-100">Touriciouz HQ</p>
                                        <p className="text-sm text-gray-200">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://www.google.com/maps/place/Dhaka/@23.7807527,90.2545342,11z/data=!3m1!4b1!4m6!3m5!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.804093!4d90.4152376!16zL20vMGZuYjQ?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                        >
                            <FaMapMarkerAlt className="h-4 w-4" />
                            View on Google Maps
                        </a>
                    </div>
                    {/* Social Media & Newsletter */}
                    <div className="grid md:grid-cols-2 gap-12 my-10">
                        <div >
                            <h3 className="text-2xl font-bold text-gray-800 my-6">
                                Or Connect Here
                            </h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300`}
                                        aria-label={social.label}
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                            <p className="text-gray-600 mt-4">
                                Connect for collaborations, questions, or just to say hello!
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-16 border border-green-100"
                data-aos="fade-up">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FaPhone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Emergency Contact
                            </h3>
                            <p className="text-gray-600">
                                For urgent assistance during active tours
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <a
                            href="tel:+8801521228030"
                            className="text-2xl font-bold text-green-600 mb-1 hover:text-green-700 transition-colors block"
                        >
                            +8801521228030
                        </a>
                        <p className="text-sm text-gray-600">
                            24/7 Emergency Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;