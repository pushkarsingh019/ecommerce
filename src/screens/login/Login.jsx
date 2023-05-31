import Navbar from "../../components/navigation/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const { loginUser, loading } = useContext(storeContext);
    const navigate = useNavigate();

    const onLogin = async (event) => {
        event.preventDefault();
        const response = await loginUser(formData);
        if (response === true) {
            setFormData({});
            navigate(-1);
        } else {
            setMessage(response);
        }
    };
    return (
        <section>
            <Navbar />
            <main className="screen">
                <div className="center-form">
                    <form onSubmit={onLogin} className="form">
                        <label htmlFor="input">
                            <small>Email</small>
                        </label>
                        <br />
                        <input
                            type="email"
                            placeholder="email"
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
                        <label htmlFor="input">
                            <small>Password</small>
                        </label>
                        <br />
                        <input
                            type="password"
                            placeholder="password"
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
                        <button className="cta" type="submit">
                            Login
                        </button>
                        <br />
                        <br />
                        <p className="center">
                            {loading ? (
                                <code>Logging in...</code>
                            ) : (
                                <code>{message}</code>
                            )}
                        </p>
                        <br />
                        <div className="center">
                            <small style={{ color: "blue" }}>
                                <Link to={`/signup`}>
                                    <strong>create new account</strong>
                                </Link>
                            </small>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
};

export default Login;
