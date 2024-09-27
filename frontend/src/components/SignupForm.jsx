import Button from '../components/Button';


const SignupForm = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form>
                    <h4 className="fw-normal mb-3 pb-3" /* style="letter-spacing: 1px;" */>Sign Up</h4>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="text" id="username" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control form-control-lg" />
                    </div>
                    <div className="pt-1 mb-4">
                        <Button type="submit" className="btn btn-primary btn-lg btn-block w-100">SIGNUP</Button>
                    </div>
                </form>
            </div>
        </>
    )
}



export default SignupForm;
