import SignupForm from '../components/SignupForm';



const Home = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 text-black">
                        <div className="px-5 ms-xl-4 mt-5">
                            <h1>LONDBOOK</h1>
                        </div>
                        <SignupForm />
                    </div>
                    <div className="col-md-6 px-0 d-none d-md-block">
                        <img src="/assets/images/london.png"
                            alt="london" className="w-100 vh-100 london-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
