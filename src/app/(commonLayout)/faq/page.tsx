"use client";
/* eslint-disable @typescript-eslint/no-require-imports */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Search, Sparkles, Shield, Clock, Globe, Award, Star, Users, MapPin } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import 'aos/dist/aos.css';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const AOS = require("aos");
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const categories = [
        { id: 'all', name: 'All Questions', count: 28 },
        { id: 'booking', name: 'Booking & Payments', count: 8 },
        { id: 'preparation', name: 'Tour Preparation', count: 6 },
        { id: 'during', name: 'During the Tour', count: 7 },
        { id: 'safety', name: 'Safety & Support', count: 4 },
        { id: 'guides', name: 'Local Guides', count: 3 }
    ];

    const allFAQs = [
        // Booking & Payments
        {
            question: "How do I book a tour with Touriciouz?",
            answer: "Booking with Touriciouz is simple! You can browse our tours online, select your preferred date and group size, and complete the booking through our secure payment portal. We accept all major credit cards, PayPal, and in some cases, local payment methods.",
            category: 'booking',
            popular: true
        },
        {
            question: "What is your cancellation policy?",
            answer: "We offer flexible cancellation options: Full refund up to 48 hours before tour start, 50% refund between 24-48 hours, and no refund within 24 hours. For special circumstances, please contact our customer support team directly.",
            category: 'booking'
        },
        {
            question: "Do you offer payment plans or installment options?",
            answer: "Yes! For tours over $500, we offer payment plans. You can split your payment into 2-3 installments. The first payment secures your booking, and subsequent payments are automatically charged 30 and 60 days before your tour date.",
            category: 'booking',
            popular: true
        },
        {
            question: "Are there any hidden fees?",
            answer: "No hidden fees! Our prices include all taxes, guide fees, and specified activities. Any optional extras are clearly marked. We believe in transparent pricing so you can budget your adventure without surprises.",
            category: 'booking'
        },
        {
            question: "Can I get a group discount?",
            answer: "Absolutely! Groups of 6+ receive a 10% discount, groups of 10+ get 15% off, and for groups larger than 15, please contact us for custom pricing. Discounts are automatically applied during checkout.",
            category: 'booking'
        },

        // Tour Preparation
        {
            question: "What should I pack for my tour?",
            answer: "Packing depends on your tour type. Generally: comfortable walking shoes, weather-appropriate clothing, reusable water bottle, sunscreen, camera, and any personal medications. For specific tours, we'll send you a detailed packing list 7 days before departure.",
            category: 'preparation',
            popular: true
        },
        {
            question: "Do I need travel insurance?",
            answer: "While not mandatory, we highly recommend comprehensive travel insurance that covers trip cancellation, medical emergencies, and personal belongings. We can provide recommendations for insurance providers we trust.",
            category: 'preparation'
        },
        {
            question: "What fitness level is required for your tours?",
            answer: "We offer tours for all fitness levels! Each tour clearly indicates difficulty level: Easy (minimal walking), Moderate (2-5 km walking), Active (5-10 km with some elevation), and Challenging (10+ km or technical terrain).",
            category: 'preparation'
        },

        // During the Tour
        {
            question: "What happens if I'm late to the tour meeting point?",
            answer: "Please contact your guide immediately via the phone number provided. We have a 15-minute grace period, after which the tour may depart. For no-shows without contact, our cancellation policy applies. We recommend arriving 10 minutes early.",
            category: 'during'
        },
        {
            question: "Can I join a tour mid-way or leave early?",
            answer: "For the safety and experience of all participants, we cannot accommodate joining mid-tour or early departures from group tours. For private tours, please discuss any timing adjustments with your guide in advance.",
            category: 'during'
        },
        {
            question: "What if the weather is bad on my tour day?",
            answer: "Our tours run rain or shine! We provide appropriate gear recommendations. For extreme weather conditions that make touring unsafe, we'll either reschedule your tour or provide a full refund. We monitor weather closely and will contact you if changes are needed.",
            category: 'during',
            popular: true
        },

        // Safety & Support
        {
            question: "How do you ensure tour safety?",
            answer: "Safety is our top priority. All guides are trained in first aid and emergency procedures. We conduct regular safety audits, maintain small group sizes, and have 24/7 emergency support. All activities are risk-assessed and we carry comprehensive insurance.",
            category: 'safety'
        },
        {
            question: "What COVID-19 precautions do you have?",
            answer: "We follow local health guidelines and adapt as needed. Currently, we provide hand sanitizer, encourage social distancing when possible, and can arrange private tours for those with specific health concerns. Guides are trained in health and hygiene protocols.",
            category: 'safety'
        },

        // Local Guides
        {
            question: "How are your local guides selected?",
            answer: "Our guides go through a rigorous selection process: application review, multiple interviews, background checks, and training programs. We only work with passionate locals who have deep knowledge of their area and excellent communication skills.",
            category: 'guides',
            popular: true
        },
        {
            question: "Can I request a specific guide?",
            answer: "Yes! If you've had a great experience with a guide before, you can request them for future tours. We'll do our best to accommodate your request based on availability. You can also read guide profiles and reviews before booking.",
            category: 'guides'
        }
    ];

    const filteredFAQs = allFAQs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });


    return (
        <div className="font-serif max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Hero Section - Matching previous pages */}
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
                                    Quick Answers
                                </span>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    Find Answers
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                        To Your Questions
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Everything you need to know about booking, preparing for, and enjoying your Touriciouz adventure. Can&apos;t find what you&apos;re looking for? Our team is ready to help.
                                </p>
                            </div>

                        </div>

                        {/* Right Image */}
                        <div className="relative" data-aos="fade-left">
                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Travelers discussing and planning their adventure"
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
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">98%</div>
                                        <div className="text-sm text-gray-600">Questions Answered</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 italic">
                                    &quot;Found exactly what I needed in seconds!&quot;
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

            {/* Search Bar */}
            <div className="mb-12"
                data-aos="fade-up">
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filters */}
            <div className="mb-12 overflow-x-auto"
                data-aos="fade-up">
                <div className="flex space-x-4 pb-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <span className="font-medium">{category.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === category.id
                                    ? 'bg-white/20'
                                    : 'bg-gray-200'
                                }`}>
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4 mb-20">
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className="group"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <div className={`border-b border-gray-200 pb-6 ${index === filteredFAQs.length - 1 ? 'border-b-0' : ''}`}>
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex items-center justify-between w-full text-left py-4 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-colors ${openIndex === index
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                                : 'bg-gray-100 text-gray-600 group-hover:bg-green-50 group-hover:text-green-600'
                                            }`}>
                                            {openIndex === index ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                                    {faq.question}
                                                </h3>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </button>

                                <div className={`pl-12 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="pt-2 pb-4">
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                        {faq.question.includes("cancellation") && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                                <p className="text-sm text-amber-800">
                                                    💡 <strong>Pro tip:</strong> Consider adding travel insurance when booking for maximum flexibility.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16"
                        data-aos="fade-up">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No results found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Try searching with different keywords or browse by category
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                        >
                            View All Questions
                        </button>
                    </div>
                )}
            </div>


            {/* Browse Tours CTA */}
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-20"
                data-aos="fade-up">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/10 rounded-full translate-y-24 -translate-x-24"></div>

                <div className="relative text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Still need help?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto  mb-8">
                        Our travel experts are ready to assist you with personalized advice
                    </p>
                    <Link
                        href="/contact"
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Contact Here
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default FAQPage;