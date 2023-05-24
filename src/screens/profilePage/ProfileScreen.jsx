import Navbar from "../../components/navigation/Navbar";

import { useContext } from "react";
import { storeContext } from "../../utils/storeContext";

const ProfileScreen = () => {
    const { user } = useContext(storeContext);
    console.log(user);
    return (
        <section>
            <Navbar />
            <h2>Hey, {user.name}</h2>
        </section>
    );
};

export default ProfileScreen;
