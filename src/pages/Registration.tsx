import NavBar from "./NavBar";

const Registration = () => {
    return (
        <div>
            <NavBar />



            <div className="hero min-h-screen font-serif">
                <div className="hero-content flex-col md:flex-row-reverse mt-5">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold">Register Here!</h1>
                        <img src="registration.png" alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered" />
                            </div>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Re-type Password</span>
                                </label>
                                <input type="text" placeholder="Re-type password" className="input input-bordered" />
                                <label className="label">
                                    <input type="checkbox" name="" id="" /><p className="ml-2 label-text-alt">I have agreed all the <a href="#" className="label-text-alt link link-hover text-primary">terms & conditions.</a></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-green-600 text-white border-green-500 hover:border-2 hover:border-yellow-500 shadow-lg shadow-blue-300">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Registration;