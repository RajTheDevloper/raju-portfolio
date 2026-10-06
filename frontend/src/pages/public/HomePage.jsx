
import { useEffect, useState } from "react";

import PortfolioLayout from "../../components/layout/PortfolioLayout";
import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";

import Skills from "../../components/portfolio/Skills";
import { getPublicSkills } from "../../services/skillService";

import { getPublicProfile } from "../../services/profileService";

import Projects from "../../components/portfolio/Projects";

import Experience from "../../components/portfolio/Experience";
import { getPublicExperience } from "../../services/experienceService";

import Education from "../../components/portfolio/Education";
import { getPublicEducation } from "../../services/educationService";

import Resume from "../../components/portfolio/Resume";
import { getPublicResume } from "../../services/resumeService";

import Contact from "../../components/portfolio/Contact";

import { getPublicProjects } from "../../services/projectService";

function HomePage() {

    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const [
                    profileData,
                    skillsData,
                    projectsData,
                    experienceData,
                    educationData,
                    resumeData
                ] = await Promise.all([
                    getPublicProfile(),
                    getPublicSkills(),
                    getPublicProjects(),
                    getPublicExperience(),
                    getPublicEducation(),
                    getPublicResume()
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

            setExperience(
                Array.isArray(experienceData)
                    ? experienceData
                    : experienceData?.content || []
            );
            setEducation(
                Array.isArray(educationData)
                    ? educationData
                    : educationData?.content || []
            );
            // setResume(
            //     Array.isArray(resumeData)
            //         ? resumeData
            //         : resumeData?.content || []
            // );
            setResume(resumeData);

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

           <Experience experience={experience} />

           <Education education={education} />

           <Resume resume={resume} />

           <Contact profile={profile} />

        </PortfolioLayout>
    );
}

export default HomePage;

