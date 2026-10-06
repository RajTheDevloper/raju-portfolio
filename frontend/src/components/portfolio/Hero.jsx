
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero({ profile }) {

    const scrollToProjects = () => {
        document
            .getElementById("projects")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <section className="hero">

            <div className="container hero-container">

                <div className="hero-content">

                    <p className="hero-label">
                        {profile?.title?.toUpperCase()}
                    </p>

                    <h1>
                        Hi, I'm{" "}
                        <span>{profile?.name}</span>.
                        <br />

                        I build modern
                        <br />

                        <span className="hero-muted">
                            backend systems.
                        </span>
                    </h1>

                    <p className="hero-description">
                        {profile?.shortBio}
                    </p>

                    <div className="hero-actions">

                        <button
                            className="button button-primary"
                            onClick={scrollToProjects}
                        >
                            View My Work
                            <ArrowDown size={18} />
                        </button>

                        {profile?.resumeUrl && (
                            <a
                                href={profile.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="button button-secondary"
                            >
                                View Resume
                            </a>
                        )}

                    </div>

                    <div className="hero-socials">

                        {profile?.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                            >
                                <FaGithub size={20} />
                            </a>
                        )}

                        {profile?.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        )}

                    </div>

                </div>

                <div className="hero-image-wrapper">

                    {profile?.profileImageUrl ? (
                        <img
                            src={profile.profileImageUrl}
                            alt={profile.name}
                            className="hero-image"
                        />
                    ) : (
                        <div className="hero-image-placeholder">
                            {profile?.name?.charAt(0)}
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

export default Hero;

