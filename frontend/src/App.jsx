import { useEffect, useState } from "react";
import { getPublicProfile } from "./services/profileService";

function App() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getPublicProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load profile.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <h1>{profile?.name}</h1>
            <h2>{profile?.title}</h2>
            <p>{profile?.shortBio}</p>
        </div>
    );
}

export default App;