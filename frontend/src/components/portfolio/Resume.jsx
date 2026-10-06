import {
    Download,
    ExternalLink,
    FileText
} from "lucide-react";

const Resume = ({ resume }) => {

    if (!resume) {
        return (
            <section
                className="resume-section"
                id="resume"
            >
                <div className="section-container">

                    <div className="resume-empty">
                        <FileText size={32} />

                        <h2>Resume</h2>

                        <p>
                            My resume will be available here soon.
                        </p>
                    </div>

                </div>
            </section>
        );
    }

    /*
     * Depending on your backend DTO, the URL may be stored
     * under resumeUrl or fileUrl.
     *
     * We support both so the component is more tolerant.
     */
    const resumeUrl =
        resume.resumeUrl ||
        resume.fileUrl ||
        resume.url;

    return (
        <section
            className="resume-section"
            id="resume"
        >
            <div className="section-container">

                <div className="resume-card">

                    <div className="resume-icon">
                        <FileText size={30} />
                    </div>

                    <div className="resume-content">

                        <span className="section-eyebrow">
                            Resume
                        </span>

                        <h2>
                            Want to know more about me?
                        </h2>

                        <p>
                            Download my latest resume to learn more
                            about my technical skills, experience,
                            education, and projects.
                        </p>

                    </div>

                    {resumeUrl && (
                        <div className="resume-actions">

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <ExternalLink size={17} />

                                View Resume
                            </a>

                            <a
                                href={resumeUrl}
                                download
                                className="btn btn-primary"
                            >
                                <Download size={17} />

                                Download Resume
                            </a>

                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};

export default Resume;