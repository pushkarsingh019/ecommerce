import Navbar from "../../components/navigation/Navbar";
import Address from "../../components/address/Address";

import { useContext, useState } from "react";
import { storeContext } from "../../utils/storeContext";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Loader from "../../components/Loading/Loading";
import add from "../../assets/add.svg";

import "./profile.css";

export const NoUserScreen = () => {
    return (
        <section className="center-form">
            <p className="">
                <Link to={`/login`}>
                    <strong>Login</strong>
                </Link>{" "}
                or{" "}
                <Link to={`/signup`}>
                    <strong>Signup</strong>
                </Link>{" "}
            </p>
        </section>
    );
};

const Output = ({
    choice,
    user,
    onLogout,
    onAddressUpdate,
    onDelete,
    onUpdate,
}) => {
    const [formData, setFormData] = useState({ default: false });
    const [isEditing, setIsEditing] = useState(false);
    const [parent] = useAutoAnimate();
    const [isOpen, setIsOpen] = useState(false);

    const handleAddress = (event) => {
        event.preventDefault();
        onAddressUpdate(formData);
        setFormData({ default: false });
    };

    const updateAddress = (addressDetails) => {
        setIsOpen(true);
        setFormData({
            id: addressDetails.id,
            address: addressDetails.address,
            contactNumber: addressDetails.contactNumber,
            default: addressDetails.default,
        });
        setIsEditing(true);
    };

    const handleUpdatedForm = (event) => {
        setIsOpen(false);
        event.preventDefault();
        onUpdate(formData);
    };

    if (choice === 1) {
        return (
            <section className="profile-component">
                <h2>Profile Details</h2>
                <br />
                <p>
                    Name : <strong>{user.name}</strong>
                </p>
                <p>
                    Email : <strong>{user.email}</strong>
                </p>
                <p>
                    Default Address :{" "}
                    <strong>
                        {user.address.length === 0
                            ? "No address available"
                            : user.address
                                  .filter((address) => address.default === true)
                                  .map((address) => address.address)}
                    </strong>
                </p>
            </section>
        );
    } else if (choice === 2) {
        return (
            <section className="profile-component">
                <div className="flex">
                    <h2>Shipping Address</h2>
                    <img src={add} onClick={() => setIsOpen(true)}></img>
                </div>
                <br />
                <br />
                {isOpen ? (
                    <form
                        onSubmit={isEditing ? handleUpdatedForm : handleAddress}
                    >
                        <label>
                            <small>Address</small>
                        </label>
                        <br />
                        <input
                            className="width-300"
                            type="text"
                            placeholder="your address"
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    address: event.target.value,
                                })
                            }
                            value={formData.address ? formData.address : ""}
                            required
                        />
                        <br />
                        <br />
                        <label>
                            <small>Contact Number</small>
                        </label>
                        <br />
                        <input
                            type="number"
                            placeholder="contact number"
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    contactNumber: event.target.value,
                                })
                            }
                            value={
                                formData.contactNumber
                                    ? formData.contactNumber
                                    : ""
                            }
                            required
                        />
                        <br />
                        <br />
                        <input
                            type="checkbox"
                            onChange={() => {
                                // setIsDefault(!isDefault);
                                // setFormData({ ...formData, isDefault: !isDefault });
                                setFormData({
                                    ...formData,
                                    default: !formData.default,
                                });
                            }}
                            checked={formData.default}
                        />
                        <label> Make this my default address</label>
                        <br />
                        <br />
                        <button
                            className="button"
                            type="submit"
                            style={{ marginRight: "10px" }}
                        >
                            {isEditing ? "update address" : "add new address"}
                        </button>
                        <button
                            className="button"
                            onClick={() => setIsOpen(false)}
                        >
                            close
                        </button>
                        <br />
                        <br />
                    </form>
                ) : (
                    ""
                )}
                {user.address.length === 0 ? (
                    <p>
                        No address here,{" "}
                        <span
                            className="underline blue"
                            onClick={() => setIsOpen(true)}
                        >
                            add one!
                        </span>
                    </p>
                ) : (
                    <section className="address-flex" ref={parent}>
                        {user.address.map((address) => {
                            return (
                                <Address
                                    key={address.id}
                                    id={address.id}
                                    address={address.address}
                                    contactNumber={address.contactNumber}
                                    handleAddressDelete={onDelete}
                                    handleAddressUpdate={updateAddress}
                                    addressObject={address}
                                />
                            );
                        })}
                        {/* <h3>Default Address</h3>
                        <br />
                        <div ref={parent}>
                            {user.address
                                .filter((address) => address.default === true)
                                .map((address) => {
                                    return (
                                        <Address
                                            key={address.id}
                                            id={address.id}
                                            address={address.address}
                                            contactNumber={
                                                address.contactNumber
                                            }
                                            handleAddressDelete={onDelete}
                                            handleAddressUpdate={updateAddress}
                                            addressObject={address}
                                        />
                                        // <div
                                        //     key={address.id}
                                        //     className="address-component"
                                        // >
                                        //     <p>Address : {address.address}</p>
                                        //     <p>
                                        //         Phone Number :{" "}
                                        //         {address.contactNumber}
                                        //     </p>
                                        //     <button
                                        //         onClick={() =>
                                        //             handleAddressUpdate(address)
                                        //         }
                                        //     >
                                        //         Edit
                                        //     </button>
                                        //     <button
                                        //         onClick={() =>
                                        //             onDelete(address.id)
                                        //         }
                                        //     >
                                        //         Delete
                                        //     </button>
                                        // </div>
                                    );
                                })}
                        </div>
                        <br />
                        <br />
                        <h3>Other addresses</h3>
                        <br />
                        {user.address.filter(
                            (address) => address.default === false
                        ).length !== 0 ? (
                            <section className="address-flex">
                                {user.address
                                    .filter(
                                        (address) => address.default === false
                                    )
                                    .map((address) => {
                                        return (
                                            <Address
                                                key={address.id}
                                                address={address.address}
                                                id={address.id}
                                                contactNumber={
                                                    address.contactNumber
                                                }
                                                handleAddressDelete={onDelete}
                                                handleAddressUpdate={
                                                    updateAddress
                                                }
                                                addressObject={address}
                                            />
                                        );
                                    })} */}
                        {/* </section>
                        ) : (
                            <p>
                                no additional address,{" "}
                                <span
                                    className="underline blue"
                                    onClick={() => setIsOpen(true)}
                                >
                                    add one!
                                </span>
                            </p>
                        )} */}
                    </section>
                )}
            </section>
        );
    } else if (choice === 3) {
        return (
            <section className="profile-component">
                <h2>Order History</h2>
                {user.orders.length === 0 ? (
                    <p>no orders yet</p>
                ) : (
                    <div>
                        {user.orders.map((order) => {
                            return <p>{order._id}</p>;
                        })}
                    </div>
                )}
            </section>
        );
    } else {
        return <p>something went wrong !</p>;
    }
};

const ProfileScreen = () => {
    const { user, logout, newAddress, loading, deleteAddress, updateAddress } =
        useContext(storeContext);
    const [choice, setChoice] = useState(1);

    const handleLogout = () => {
        logout();
    };

    const handleNewAddress = (addressData) => {
        newAddress(addressData);
    };

    const handleAddressDeletion = (addressId) => deleteAddress(addressId);
    const handleAddressUpdate = (addressDetails) =>
        updateAddress(addressDetails);

    return (
        <section>
            <Navbar />
            <main className="screen center">
                {Object.keys(user).length === 0 ? (
                    <NoUserScreen />
                ) : (
                    <section className="profile-grid">
                        <ul className="options-list">
                            <li onClick={() => setChoice(1)}>Profile</li>
                            <li
                                className={choice == 1 ? "selected" : ""}
                                onClick={() => setChoice(2)}
                            >
                                Address
                            </li>
                            <li
                                className={choice == 2 ? "selected" : ""}
                                onClick={() => setChoice(3)}
                            >
                                Orders
                            </li>
                            <li
                                className={choice == 3 ? "selected" : ""}
                                onClick={() => logout()}
                            >
                                Logout
                            </li>
                        </ul>
                        <section>
                            {loading ? (
                                <section className="profile-flex">
                                    <Loader />
                                </section>
                            ) : (
                                <Output
                                    choice={choice}
                                    user={user}
                                    onLogout={handleLogout}
                                    onAddressUpdate={handleNewAddress}
                                    onDelete={handleAddressDeletion}
                                    onUpdate={handleAddressUpdate}
                                />
                            )}
                        </section>
                    </section>
                )}
            </main>
        </section>
    );
};

export default ProfileScreen;
