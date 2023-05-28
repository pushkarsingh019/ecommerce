import Navbar from "../../components/navigation/Navbar";

import { useContext, useState } from "react";
import { storeContext } from "../../utils/storeContext";
import { Link } from "react-router-dom";

import Loader from "../../components/Loading/Loading";

import "./profile.css";

const NoUserScreen = () => {
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
                to get started
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

    const handleAddress = (event) => {
        event.preventDefault();
        onAddressUpdate(formData);
        setFormData({ default: false });
    };

    const handleAddressUpdate = (addressDetails) => {
        setFormData({
            id: addressDetails.id,
            address: addressDetails.address,
            contactNumber: addressDetails.contactNumber,
            default: addressDetails.default,
        });
        setIsEditing(true);
    };

    const handleUpdatedForm = (event) => {
        event.preventDefault();
        onUpdate(formData);
    };

    if (choice === 1) {
        return (
            <section className="profile-component">
                <p>
                    Name : <strong>{user.name}</strong>
                </p>
                <p>
                    Email : <strong>{user.email}</strong>
                </p>
                <br />
                <br />
                <button className="button" onClick={() => onLogout()}>
                    logout
                </button>
            </section>
        );
    } else if (choice === 2) {
        return (
            <section className="profile-component">
                <h4>Default Address</h4>
                {user.address
                    .filter((address) => address.default === true)
                    .map((address) => {
                        return (
                            <div key={address.id} className="address-component">
                                <p>Address : {address.address}</p>
                                <p>Phone Number : {address.contactNumber}</p>
                                <button
                                    onClick={() => handleAddressUpdate(address)}
                                >
                                    Edit
                                </button>
                                <button onClick={() => onDelete(address.id)}>
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                <br />
                <br />
                <h4>Other addresses</h4>
                {user.address.filter((address) => address.default === false)
                    .length !== 0
                    ? user.address
                          .filter((address) => address.default === false)
                          .map((address) => {
                              return (
                                  <div
                                      className="address-component"
                                      key={address.id}
                                  >
                                      <p>Address : {address.address}</p>
                                      <p>Phone Number : {address.number}</p>
                                      <button
                                          onClick={() =>
                                              handleAddressUpdate(address)
                                          }
                                      >
                                          Edit
                                      </button>
                                      <button
                                          onClick={() => onDelete(address.id)}
                                      >
                                          Delete
                                      </button>
                                  </div>
                              );
                          })
                    : "No aditional address, add one!"}

                <br />
                <br />
                <br />
                <form onSubmit={isEditing ? handleUpdatedForm : handleAddress}>
                    <label>
                        <small>Address</small>
                    </label>
                    <br />
                    <input
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
                            formData.contactNumber ? formData.contactNumber : ""
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
                    <button type="submit" className="button">
                        {isEditing ? "update address" : "add new address"}
                    </button>
                </form>
            </section>
        );
    } else if (choice === 3) {
        return <section className="profile-component">order history</section>;
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
                    <section>
                        <div className="profile-flex">
                            <h3 onClick={() => setChoice(1)}>
                                Profile Details
                            </h3>
                            <h3 onClick={() => setChoice(2)}>Address</h3>
                            <h3 onClick={() => setChoice(3)}>Orders</h3>
                        </div>
                        <br />
                        <br />
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
                )}
            </main>
        </section>
    );
};

export default ProfileScreen;
