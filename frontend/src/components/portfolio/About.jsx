
import { MapPin, Mail, Briefcase } from "lucide-react";

function About({ profile }) {

    return (
        <section id="about" className="portfolio-section about-section">

            <div className="container">

                <div className="section-heading">

                    <p className="section-eyebrow">
                        ABOUT ME
                    </p>

                    <h2>
                        A developer who enjoys
                        <span> building things.</span>
                    </h2>

                </div>

                <div className="about-grid">

                    <div className="about-content">

                        <p className="about-description">
                            {profile?.about || profile?.shortBio}
                        </p>

                        {profile?.availability && (
                            <div className="availability">
                                <span className="availability-dot"></span>

                                {profile.availability}
                            </div>
                        )}

                    </div>

                    <div className="about-details">

                        {profile?.location && (
                            <div className="about-detail">

                                <MapPin size={20} />

                                <div>
                                    <span>Location</span>
                                    <strong>
                                        {profile.location}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {profile?.email && (
                            <div className="about-detail">

                                <Mail size={20} />

                                <div>
                                    <span>Email</span>
                                    <strong>
                                        {profile.email}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {profile?.title && (
                            <div className="about-detail">

                                <Briefcase size={20} />

                                <div>
                                    <span>Role</span>
                                    <strong>
                                        {profile.title}
                                    </strong>
                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;

