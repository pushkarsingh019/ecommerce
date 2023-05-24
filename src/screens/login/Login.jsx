import Navbar from "../../components/navigation/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const Login = () => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const { loginUser } = useContext(storeContext);

    const onLogin = async (event) => {
        event.preventDefault();
        const response = await loginUser(formData);
        setMessage(response);
        setFormData({});
    };
    return (
        <section>
            <Navbar />
            <main className="screen">
                <form onSubmit={onLogin}>
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
                    <button className="button" type="submit">
                        Login
                    </button>
                    <p>{message}</p>
                </form>
            </main>
        </section>
    );
};

export default Login;
