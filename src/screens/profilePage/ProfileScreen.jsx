import Navbar from "../../components/navigation/Navbar";

import { useContext, useState } from "react";
import { storeContext } from "../../utils/storeContext";
import { Link } from "react-router-dom";

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

const Output = ({ choice, user, onLogout }) => {
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
                                <p>Phone Number : {address.number}</p>
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
                                  </div>
                              );
                          })
                    : "No aditional address, add one!"}
            </section>
        );
    } else if (choice === 3) {
        return <section className="profile-component">order history</section>;
    } else {
        return <p>something went wrong !</p>;
    }
};

const ProfileScreen = () => {
    const { user, logout } = useContext(storeContext);
    const [choice, setChoice] = useState(1);

    const handleLogout = () => {
        logout();
    };

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
                        <Output
                            choice={choice}
                            user={user}
                            onLogout={handleLogout}
                        />
                    </section>
                )}
            </main>
        </section>
    );
};

export default ProfileScreen;
