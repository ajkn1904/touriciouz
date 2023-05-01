import Link from "next/link";
import Headroom from 'react-headroom';

const NavBar = () => {

    const menu = <>

        <li><Link href='/' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Home</Link></li>
        <li><Link href='/Tours' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Tours</Link></li>
        <li><Link href='/Booking' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Booking</Link></li>
        <li><Link href='/Blog' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Blog</Link></li>

        <li><Link href='/LogIn' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Log In</Link></li>
        <li><Link href='/Registration' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white'>Registration</Link></li>
        <li><Link href='/' className='btn btn-ghost rounded font-semibold text-black hover:bg-green-600 hover:text-white' >Sign Out</Link></li>


    </>


    return (
        <Headroom className="relative z-10" style={{ WebkitTransition: 'all .5s ease-in-out', MozTransition: 'all .5s ease-in-out', OTransition: 'all .5s ease-in-out', transition: 'all .5s ease-in-out' }}>



            <div className="navbar bg-white bg-opacity-90 text-black lg:px-16 xl:px-40">

                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white border rounded-box w-52">

                            {menu}

                        </ul>
                    </div>


                    <img src="https://i.ibb.co/C1Lqqpz/logo-2.png" alt="logo" className="w-14 h-14 rounded-full ml-6" />
                    <Link href="/" className="mx-2 font-bold normal-case font-serif italic"><span className='text-4xl text-green-700'>Tour</span><span className='text-2xl'>iciouz</span></Link>
                </div>


                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menu}
                    </ul>
                </div>
                {/* {
                    user?.uid ?
                        <div className="navbar-end w-5/12 mr-3">
                            <div className="avatar">
                                <div className="w-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                                    {
                                        user?.photoURL ?
                                            <img title={user?.displayName} src={user.photoURL} alt="" />
                                            :
                                            <FaUser title={user?.displayName} className='m-auto text-4xl text-orange-600' />
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                } */}


            </ div>

        </Headroom>
    );
};

export default NavBar;