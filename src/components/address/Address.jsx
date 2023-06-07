import "./address.css";
import edit from "../../assets/edit.svg";
import bin from "../../assets/bin.svg";

const Address = ({
    address,
    contactNumber,
    id,
    handleAddressDelete,
    addressObject,
    handleAddressUpdate,
    usecase,
    selectedAddress,
    onAddressSelect,
}) => {
    if (usecase === "profile") {
        return (
            <div className="address-profile-card">
                <br />
                {addressObject.default ? (
                    <span className="tag">
                        {addressObject.default ? "Default" : ""}
                    </span>
                ) : (
                    ""
                )}
                <label htmlFor="address">
                    <small>Address</small>
                </label>
                <p>
                    <strong>{address}</strong>
                </p>
                <br />
                <label htmlFor="contact number">
                    <small>Contact Number</small>
                </label>
                <p>
                    <strong>{contactNumber}</strong>
                </p>
                <div className="flex">
                    <div></div>
                    <div>
                        <img
                            src={edit}
                            onClick={() => handleAddressUpdate(addressObject)}
                            style={{ marginRight: "3px" }}
                        ></img>
                        <img
                            src={bin}
                            onClick={() => handleAddressDelete(id)}
                        ></img>
                    </div>
                </div>
            </div>
        );
    } else if (usecase === "checkout") {
        return (
            <div
                className="address-profile-card"
                onClick={() => onAddressSelect(id)}
            >
                {selectedAddress.id === id ? (
                    <span className="tag">selected</span>
                ) : (
                    ""
                )}
                <label htmlFor="address">
                    <small>Address</small>
                </label>
                <p>
                    <strong>{address}</strong>
                </p>
                <br />
                <label htmlFor="contact number">
                    <small>Contact Number</small>
                </label>
                <p>
                    <strong>{contactNumber}</strong>
                </p>
            </div>
        );
    }
};

export default Address;
