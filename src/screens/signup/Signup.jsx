import Navbar from "../../components/navigation/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// importing assets
import showPassword from "../../assets/showPassword.svg";
import hiddenPassword from "../../assets/hidePassword.svg";

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signupUser, loading } = useContext(storeContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [hidePassword, setHidePassword] = useState({
        password: true,
        checkPassword: true,
    });
    const navigate = useNavigate();

    const onSignup = async (event) => {
        event.preventDefault();
        const passwordMatch = formData.password === confirmPassword;
        if (passwordMatch) {
            await signupUser(formData);
            setFormData({});
            setConfirmPassword("");
            if (loading === false) {
                navigate(-1);
            }
        } else {
            setErrorMessage("passwords dont match, try again");
        }
    };

    return (
        <section>
            <Navbar />
            <main className="screen">
                <div className="center-form">
                    <form onSubmit={onSignup} className="form">
                        <label htmlFor="input">
                            <small>Name</small>
                        </label>
                        <br />
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    name: event.target.value,
                                })
                            }
                            value={formData.name ? formData.name : ""}
                        />
                        <br />
                        <br />
                        <label htmlFor="input">
                            <small>Email</small>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    email: event.target.value,
                                })
                            }
                            value={formData.email ? formData.email : ""}
                        />
                        <br />
                        <br />
                        <div className="flex">
                            <label htmlFor="password">
                                <small>Password</small>
                            </label>
                            <div
                                onClick={() =>
                                    setHidePassword({
                                        ...hidePassword,
                                        password: !hidePassword.password,
                                    })
                                }
                            >
                                <img
                                    src={
                                        hidePassword.password
                                            ? hiddenPassword
                                            : showPassword
                                    }
                                    alt="password"
                                />
                            </div>
                        </div>
                        <input
                            type={hidePassword.password ? "password" : "text"}
                            placeholder="Password"
                            required
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    password: event.target.value,
                                })
                            }
                            value={formData.password ? formData.password : ""}
                        />
                        <br />
                        <br />
                        <div className="flex">
                            <label htmlFor="password">
                                <small>Confirm Password</small>
                            </label>
                            <div
                                onClick={() =>
                                    setHidePassword({
                                        ...hidePassword,
                                        checkPassword:
                                            !hidePassword.checkPassword,
                                    })
                                }
                            >
                                <img
                                    src={
                                        hidePassword.checkPassword
                                            ? hiddenPassword
                                            : showPassword
                                    }
                                    alt="password"
                                />
                            </div>
                        </div>
                        <input
                            type={
                                hidePassword.checkPassword ? "password" : "text"
                            }
                            placeholder="Confirm Password"
                            required
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            value={confirmPassword}
                        />
                        <br />
                        <br />
                        <button className="cta" style={{ marginTop: "5px" }}>
                            create new account
                        </button>
                        <br />
                        <div className="center">
                            <small>
                                Already have an account ?{" "}
                                <strong>
                                    <Link to={`/login`}>Login</Link>
                                </strong>
                            </small>
                        </div>
                        <br />
                        <br />
                        <div className="center">
                            <small>
                                {loading
                                    ? `creating your account...`
                                    : errorMessage}
                            </small>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
};

export default Signup;
