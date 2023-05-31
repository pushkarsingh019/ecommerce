import { useState, useContext } from "react";

import Navbar from "../../components/navigation/Navbar";
import "./checkout.css";
import { storeContext } from "../../utils/storeContext";
import AddressCard from "../../components/addressCard/AddressCard";

// importing checkout steps
import { NoUserScreen } from "../profilePage/ProfileScreen";
import { useNavigate } from "react-router-dom";

const CheckoutSteps = ({ step, user, updateStep }) => {
    const { cart, logout, newAddress } = useContext(storeContext);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(
        user.address.length > 0
            ? user.address.find((address) => address.default === true)
            : {}
    );
    const [addressData, setAddressData] = useState({ default: false });
    const handleAddressSelection = (id) => {
        setSelectedAddress(user.address.find((address) => address.id === id));
    };
    const navigate = useNavigate();
    const addNewAddress = (event) => {
        event.preventDefault();
        newAddress(addressData);
        setAddressData({});
        setShowAddressForm(false);
        // console.log(addressData);
    };
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
                    <br />
                    <br />
                    <h2>Select an address</h2>
                    <br />
                    <span
                        className="underline"
                        onClick={() => setShowAddressForm(true)}
                    >
                        add new address
                    </span>
                    <br />
                    <br />
                    {showAddressForm ? (
                        <form onSubmit={addNewAddress}>
                            <label htmlFor="address">Address</label>
                            <br />
                            <input
                                type="text"
                                placeholder="address"
                                onChange={(event) =>
                                    setAddressData({
                                        ...addressData,
                                        address: event.target.value,
                                    })
                                }
                                value={
                                    addressData.address
                                        ? addressData.address
                                        : ""
                                }
                            />
                            <br />
                            <label htmlFor="contact number">
                                Contact Number
                            </label>
                            <br />
                            <input
                                type="number"
                                placeholder="contact number"
                                onChange={(event) =>
                                    setAddressData({
                                        ...addressData,
                                        contactNumber: event.target.value,
                                    })
                                }
                                value={
                                    addressData.contactNumber
                                        ? addressData.contactNumber
                                        : ""
                                }
                            />
                            <br />
                            <br />
                            <button>add new address</button>
                            <button onClick={() => setShowAddressForm(false)}>
                                cancel
                            </button>
                            <br />
                            <br />
                        </form>
                    ) : (
                        ""
                    )}
                    <div className="show-address">
                        {user.address.map((address) => {
                            return (
                                <AddressCard
                                    key={address.id}
                                    address={address.address}
                                    contactNumber={address.contactNumber}
                                    onAddressSelect={handleAddressSelection}
                                    id={address.id}
                                    selectedAddress={selectedAddress}
                                />
                            );
                        })}
                    </div>
                    <br />
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
                    <br />
                    <br />
                    <div className="checkout-grid">
                        <div className="checkout-details">
                            <div className="shipping">
                                <h4>Shipping Details</h4>
                                <p>
                                    <strong>Address</strong>:{" "}
                                    {selectedAddress.address}
                                </p>
                                <p>
                                    <strong>Contact Number</strong>:{" "}
                                    {selectedAddress.contactNumber}
                                </p>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div className="cart-details">
                                <h4>Order Items</h4>
                                {cart.map((item) => {
                                    return (
                                        <div key={item._id} className="flex">
                                            <div
                                                className="underline"
                                                onClick={() =>
                                                    navigate(
                                                        `/product/${item._id}`
                                                    )
                                                }
                                            >
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.quantity} x ₹{item.price}{" "}
                                                = ₹{item.quantity * item.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="order-summary">
                            <h4>Order Summary</h4>
                            <div className="flex">
                                <p>Items</p>
                                <p>
                                    {/* <strong> */}₹{" "}
                                    {cart.reduce(
                                        (totalCost, currentItem) =>
                                            totalCost +
                                            currentItem.price *
                                                currentItem.quantity,
                                        0
                                    )}
                                    {/* </strong> */}
                                </p>
                            </div>
                            <div className="flex">
                                <p>Shipping</p>
                                <p>₹ 0</p>
                            </div>
                            <div className="flex">
                                <p>Tax</p>
                                <p>
                                    ₹{" "}
                                    {cart.reduce(
                                        (totalCost, currentItem) =>
                                            totalCost +
                                            currentItem.quantity *
                                                currentItem.price,
                                        0
                                    ) * 0.08}
                                </p>
                            </div>
                            <div className="flex">
                                <p>Total</p>
                                <p>
                                    <strong>
                                        ₹{" "}
                                        {cart.reduce(
                                            (totalCost, currentItem) =>
                                                totalCost +
                                                currentItem.price *
                                                    currentItem.quantity,
                                            0
                                        ) +
                                            cart.reduce(
                                                (totalCost, currentItem) =>
                                                    totalCost +
                                                    currentItem.quantity *
                                                        currentItem.price,
                                                0
                                            ) *
                                                0.08}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
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
