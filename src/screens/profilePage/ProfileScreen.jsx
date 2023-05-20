import Navbar from "../../components/navigation/Navbar";

import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const ProfileScreen = () => {
    const { user, updateUser } = useContext(storeContext);
    return (
        <section>
            <Navbar />
            <h2>Hey, {user}</h2>
            <button onClick={() => updateUser("elon musk")}>Update user</button>
        </section>
    );
};

export default ProfileScreen;
