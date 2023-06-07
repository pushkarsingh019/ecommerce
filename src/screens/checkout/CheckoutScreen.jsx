import { useState, useContext } from "react";

import Navbar from "../../components/navigation/Navbar";
import "./checkout.css";
import { storeContext } from "../../utils/storeContext";
import Address from "../../components/address/Address";
import CartCard from "../../components/cartProductCard/CartCard";

// importing checkout steps
import { NoUserScreen } from "../profilePage/ProfileScreen";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../../components/checkoutCard/CheckoutCard";

const CheckoutSteps = ({ step, user, updateStep, onNewOrder }) => {
    const { cart, logout, newAddress } = useContext(storeContext);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(
        user.address
            ? user.address.length > 0
                ? user.address.find((address) => address.default === true)
                : {}
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
                <section className="checkout-steps">
                    <div>
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
                                <h2>Profile Details</h2>
                                <br />
                                <p>
                                    Name : <strong>{user.name}</strong>
                                </p>
                                <p>
                                    Email : <strong>{user.email}</strong>
                                </p>
                                <br />
                                <br />
                                <p
                                    onClick={() => logout()}
                                    className="underline blue"
                                >
                                    continue as a different user
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            );
        case 2:
            return (
                <section className="checkout-steps">
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
                            <button className="button">add new address</button>
                            <button
                                className="button"
                                onClick={() => setShowAddressForm(false)}
                            >
                                cancel
                            </button>
                            <br />
                            <br />
                        </form>
                    ) : (
                        ""
                    )}
                    <div className="address-flex">
                        {user.address.map((address) => {
                            return (
                                <Address
                                    key={address.id}
                                    address={address.address}
                                    contactNumber={address.contactNumber}
                                    onAddressSelect={handleAddressSelection}
                                    id={address.id}
                                    selectedAddress={selectedAddress}
                                    usecase={"checkout"}
                                />
                            );
                        })}
                    </div>
                    <br />
                    <br />
                    <div className="flex">
                        <button
                            className="button"
                            onClick={() => updateStep(3)}
                        >
                            next
                        </button>
                    </div>
                </section>
            );
        case 3:
            return (
                <section className="checkout">
                    <div className="flex">
                        <p
                            className="go-back"
                            onClick={() => updateStep(step - 1)}
                        >
                            ←
                        </p>
                    </div>
                    <br />
                    <div className="cart-screen">
                        <div>
                            <div className="checkout-details">
                                <div className="cart-details">
                                    <h2>Order Items</h2>
                                    <br />
                                    {cart.map((item) => {
                                        return (
                                            <CheckoutCard
                                                key={item._id}
                                                id={item._id}
                                                name={item.name}
                                                image={item.image}
                                                price={item.price}
                                                quantity={item.quantity}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="summary">
                            <h3>Order Summary</h3>
                            <hr />
                            <br />
                            <div className="flex">
                                <p>Items</p>
                                <p>
                                    ₹{" "}
                                    {cart.reduce(
                                        (totalCost, currentItem) =>
                                            totalCost +
                                            currentItem.price *
                                                currentItem.quantity,
                                        0
                                    )}
                                </p>
                            </div>
                            <div className="flex">
                                <p>Shipping</p>
                                <p>₹ 0</p>
                            </div>
                            <div className="flex">
                                <p>Tax</p>
                                <p>8%</p>
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
                            <hr />
                            <br />
                            <small>Order will be delivered at</small>
                            <br />
                            <span>{selectedAddress.address}</span>
                            <br />
                            <span>
                                <strong>{selectedAddress.contactNumber}</strong>
                            </span>
                            <br />
                            <br />
                            <button
                                className="cta"
                                onClick={() => {
                                    onNewOrder(selectedAddress);
                                    updateStep(4);
                                }}
                            >
                                proceed to payment
                            </button>
                        </div>
                    </div>
                </section>
            );
        case 4:
            return (
                <section className="checkout-steps">
                    <div className="flex">
                        <p
                            className="go-back"
                            onClick={() => updateStep(step + -1)}
                        >
                            ←
                        </p>
                        <p className="go-back"></p>
                    </div>
                    <h2>Order Confirmation</h2>
                    <p>
                        Order confirmed, go to{" "}
                        <span
                            className="underline blue"
                            onClick={() => navigate(`/profile`)}
                        >
                            your profile
                        </span>{" "}
                        to see your order
                    </p>
                </section>
            );
        default:
            return <p>something went wrong</p>;
    }
};

const CheckoutScreen = () => {
    const { user, createNewOrder } = useContext(storeContext);
    const [step, setStep] = useState(Object.keys(user).length === 0 ? 1 : 2);
    const handleStepChange = (step) => setStep(step);
    const handleNewOrder = (shippingAddress) => createNewOrder(shippingAddress);
    return (
        <section>
            <Navbar />
            <main className="screen">
                <h1>Checkout</h1>
                <br />
                <div className="steps center">
                    <p className={step >= 1 ? "bold" : "step"}>
                        <small>Login</small>
                    </p>
                    <p className={step >= 2 ? "bold" : "step"}>
                        <small>Shipping</small>
                    </p>
                    <p className={step >= 3 ? "bold" : "step"}>
                        <small>Summary</small>
                    </p>
                    <p className={step >= 4 ? "bold" : "step"}>
                        <small>Confirmation</small>
                    </p>
                </div>
                <CheckoutSteps
                    step={step}
                    user={user}
                    updateStep={handleStepChange}
                    onNewOrder={handleNewOrder}
                />
            </main>
        </section>
    );
};

export default CheckoutScreen;
