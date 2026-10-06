
import { useEffect, useState } from "react";

import PortfolioLayout from "../../components/layout/PortfolioLayout";
import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";

import { getPublicProfile } from "../../services/profileService";

function HomePage() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getPublicProfile();

                setProfile(data);

            } catch (error) {

                console.error(
                    "Failed to load profile:",
                    error
                );

                setError(
                    "Unable to load portfolio information."
                );

            } finally {

                setLoading(false);

            }
        };

        loadProfile();

    }, []);


    if (loading) {

        return (
            <div className="page-loading">
                Loading portfolio...
            </div>
        );

    }


    if (error) {

        return (
            <div className="page-error">
                {error}
            </div>
        );

    }


    return (
        <PortfolioLayout>

            <Hero profile={profile} />

            <About profile={profile} />

            <section
                id="skills"
                className="portfolio-section"
            >
                <div className="container">
                    <h2>Skills</h2>
                    <p>
                        Skills section coming next.
                    </p>
                </div>
            </section>


            <section
                id="projects"
                className="portfolio-section"
            >
                <div className="container">
                    <h2>Projects</h2>
                    <p>
                        Projects section coming next.
                    </p>
                </div>
            </section>


            <section
                id="experience"
                className="portfolio-section"
            >
                <div className="container">
                    <h2>Experience</h2>
                    <p>
                        Experience section coming next.
                    </p>
                </div>
            </section>


            <section
                id="education"
                className="portfolio-section"
            >
                <div className="container">
                    <h2>Education</h2>
                    <p>
                        Education section coming next.
                    </p>
                </div>
            </section>


            <section
                id="contact"
                className="portfolio-section"
            >
                <div className="container">
                    <h2>Contact</h2>
                    <p>
                        Contact section coming next.
                    </p>
                </div>
            </section>

        </PortfolioLayout>
    );
}

export default HomePage;

