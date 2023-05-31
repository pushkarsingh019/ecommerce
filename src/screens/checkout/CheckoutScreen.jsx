import { useState, useContext } from "react";

import Navbar from "../../components/navigation/Navbar";
import "./checkout.css";
import { storeContext } from "../../utils/storeContext";

// importing checkout steps
import { NoUserScreen } from "../profilePage/ProfileScreen";

const CheckoutSteps = ({ step, user, updateStep }) => {
    const { cart, logout } = useContext(storeContext);
    switch (step) {
        case 1:
            return (
                <section>
                    {Object.keys(user).length === 0 ? (
                        ""
                    ) : (
                        <div className="flex">
                            <div></div>
                            <p
                                className="go-back"
                                onClick={() => updateStep(step + 1)}
                            >
                                →
                            </p>
                        </div>
                    )}
                    {Object.keys(user).length === 0 ? (
                        <NoUserScreen />
                    ) : (
                        <div>
                            <p>
                                Name : <strong>{user.name}</strong>
                            </p>
                            <p>
                                Email : <strong>{user.email}</strong>
                            </p>
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    )}
                </section>
            );
        case 2:
            return (
                <section>
                    <div className="flex">
                        <p
                            className="go-back"
                            onClick={() => updateStep(step - 1)}
                        >
                            ←
                        </p>
                        <p
                            className="go-back"
                            onClick={() => updateStep(step + 1)}
                        >
                            →
                        </p>
                    </div>
                    {user.address.map((address) => {
                        return <p>{address.address}</p>;
                    })}
                    <br />
                    <button onClick={() => updateStep(3)}>next</button>
                </section>
            );
        case 3:
            return (
                <section>
                    <div className="flex">
                        <p
                            className="go-back"
                            onClick={() => updateStep(step - 1)}
                        >
                            ←
                        </p>
                        <p
                            className="go-back"
                            onClick={() => updateStep(step + 1)}
                        >
                            →
                        </p>
                    </div>
                    {cart.map((item) => {
                        return <p>{item.name}</p>;
                    })}
                    <button onClick={() => updateStep(4)}>next</button>
                </section>
            );
        case 4:
            return (
                <section>
                    <div className="flex">
                        <p
                            className="go-back"
                            onClick={() => updateStep(step + -1)}
                        >
                            ←
                        </p>
                        <p className="go-back"></p>
                    </div>
                    <h2>payment integration</h2>
                </section>
            );
        default:
            return <p>something went wrong</p>;
    }
};

const CheckoutScreen = () => {
    const [step, setStep] = useState(1);
    const { user } = useContext(storeContext);
    const handleStepChange = (step) => setStep(step);
    return (
        <section>
            <Navbar />
            <main className="screen">
                <h1>Checkout</h1>
                <br />
                <div className="steps center">
                    <p
                        className={step >= 1 ? "bold" : "step"}
                        // onClick={() => setStep(1)}
                    >
                        <small>Login</small>
                    </p>
                    <p
                        className={step >= 2 ? "bold" : "step"}
                        // onClick={() => setStep(2)}
                    >
                        <small>Shipping</small>
                    </p>
                    <p
                        className={step >= 3 ? "bold" : "step"}
                        // onClick={() => setStep(3)}
                    >
                        <small>Summary</small>
                    </p>
                    <p
                        className={step >= 4 ? "bold" : "step"}
                        // onClick={() => setStep(4)}
                    >
                        <small>Payment</small>
                    </p>
                </div>
                {/* {Object.keys(user).length === 0 ? (
                    <NoUserScreen />
                ) : (
                    <section>
                        <p>welcome {user.name}</p>
                    </section>
                )} */}
                <CheckoutSteps
                    step={step}
                    user={user}
                    updateStep={handleStepChange}
                />
            </main>
        </section>
    );
};

export default CheckoutScreen;
