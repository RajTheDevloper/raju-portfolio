
import { useEffect, useState } from "react";

import PortfolioLayout from "../../components/layout/PortfolioLayout";
import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";

import Skills from "../../components/portfolio/Skills";
import { getPublicSkills } from "../../services/skillService";

import { getPublicProfile } from "../../services/profileService";

import Projects from "../../components/portfolio/Projects";

import {
    getPublicProjects
} from "../../services/projectService";

function HomePage() {

    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const [
                    profileData,
                    skillsData,
                    projectsData
                ] = await Promise.all([
                    getPublicProfile(),
                    getPublicSkills(),
                    getPublicProjects()
                ]);
            
            setProfile(profileData);
            
            setSkills(
                Array.isArray(skillsData)
                    ? skillsData
                    : skillsData?.content || []
            );
            
            setProjects(
                Array.isArray(projectsData)
                    ? projectsData
                    : projectsData?.content || []
            );
            

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

           <Skills skills={skills} />

           <Projects projects={projects} />


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

