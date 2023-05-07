import NavBar from "./NavBar";

const LogIn = () => {
    return (
        <div>
            <NavBar />



            <div className="hero min-h-screen font-serif">
                <div className="hero-content flex-col md:flex-row-reverse mt-5">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold">Login Now!</h1>
                        <img src="login.png" alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
                        <div className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-lg shadow-blue-300">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default LogIn;