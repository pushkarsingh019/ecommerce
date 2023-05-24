import Navbar from "../../components/navigation/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const Signup = () => {
    const [formData, setFormData] = useState({});
    const { signupUser } = useContext(storeContext);

    const onSignup = (event) => {
        event.preventDefault();
        signupUser(formData);
        setFormData({});
    };

    return (
        <section>
            <Navbar />
            <main className="screen">
                <form onSubmit={onSignup}>
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
                    <input
                        type="email"
                        placeholder="email"
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
                    <input
                        type="password"
                        placeholder="password"
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
                    <button className="button">Sign up</button>
                </form>
            </main>
        </section>
    );
};

export default Signup;
