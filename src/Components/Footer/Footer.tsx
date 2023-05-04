import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const Footer = () => {

    return (
        <div className="font-serif">
            <footer className="flex p-10 bg-slate-900  text-white">
                <div className="footer ">
                    <div>
                        <span className="footer-title">Services</span>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </div>


                <div className="my-auto md:my-0">
                    <h1 className="footer-title">Gallery Showcase</h1>
                    <PhotoProvider>
                        <PhotoView src='https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'>
                            <PhotoView src='https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'>
                                <PhotoView src='https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'>

                                    <PhotoView src='https://images.unsplash.com/photo-1682687981922-7b55dbb30892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'>
                                        <PhotoView src='https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'>
                                            <PhotoView src='https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'>
                                                <div className="grid grid-cols-3 gap-3">


                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="" />
                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="" />

                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1682687981922-7b55dbb30892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" alt="" />
                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                                                    <img className="w-[150px] h-[80px] rounded filter hover:brightness-75 border border-yellow-300 shadow-md shadow-green-700" src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="" />
                                                </div>

                                            </PhotoView>
                                        </PhotoView>
                                    </PhotoView>
                                </PhotoView>
                            </PhotoView>
                        </PhotoView>
                    </PhotoProvider>


                </div>
            </footer>


            <footer className="footer px-10 py-4 bg-slate-800 text-green-100">
                <div className="items-center grid-flow-col">
                    <img src="https://i.ibb.co/C1Lqqpz/logo-2.png" alt="logo" className="w-24 h-24 rounded-full border-l-2" />
                    <p>TOURICIOUZ <br />© 2023 - All right reserved by Anika Jumana Khanam</p>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <Link href="https://www.facebook.com/" target="_blank"><FaFacebook className="w-8 h-8" /> </Link>

                        <Link href="https://www.twitter.com/" target="_blank"><FaTwitter className="w-8 h-8" /></Link>

                        <Link href="https://www.instagram.com/" target="_blank"><FaInstagram className="w-8 h-8" /></Link>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;