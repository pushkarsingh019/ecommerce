import "./address.css";

const AddressCard = ({
    address,
    contactNumber,
    id,
    onAddressSelect,
    selectedAddress,
}) => {
    return (
        <div
            className={
                selectedAddress
                    ? selectedAddress.id === id
                        ? "selected-address-card"
                        : "address-card"
                    : "address-card"
            }
            onClick={() => onAddressSelect(id)}
        >
            <p>
                <strong>{address}</strong>
            </p>
            <br />
            <p>{contactNumber}</p>
        </div>
    );
};

export default AddressCard;
