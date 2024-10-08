import SignupForm from '../components/SignupForm';



const JoinUs = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 text-black">
                        <div className="px-5 ms-xl-4 mt-5">
                            <h1 style={{fontFamily: 'serif'}}>LOREMIPSUMIA</h1>
                        </div>
                        <SignupForm greeting='Join Us!' />
                    </div>
                    <div className="col-md-6 px-0 d-none d-md-block">
                        <img src="/assets/images/login-background.png"
                            alt="login-background" className="w-100 vh-100 london-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinUs;
