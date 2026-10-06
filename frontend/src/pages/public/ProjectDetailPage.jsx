import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import {
    getPublicProjectBySlug
} from "../../services/projectService";

function ProjectDetailPage() {

    const { slug } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadProject = async () => {

            try {

                const data =
                    await getPublicProjectBySlug(slug);

                setProject(data);

            } catch (error) {

                console.error(
                    "Failed to load project:",
                    error
                );

                setError(
                    "Project could not be found."
                );

            } finally {

                setLoading(false);

            }
        };

        loadProject();

    }, [slug]);


    if (loading) {

        return (
            <div className="page-loading">
                Loading project...
            </div>
        );

    }


    if (error || !project) {

        return (
            <div className="project-not-found">

                <div className="container">

                    <h1>
                        Project Not Found
                    </h1>

                    <p>
                        The project you're looking for
                        doesn't exist or is no longer public.
                    </p>

                    <Link
                        to="/"
                        className="button button-primary"
                    >
                        <ArrowLeft size={18} />
                        Back to Portfolio
                    </Link>

                </div>

            </div>
        );

    }


    const technologies =
        project?.technologies || [];


    return (
        <div className="project-detail-page">

            {/* Header */}

            <header className="project-detail-header">

                <div className="container">

                    <Link
                        to="/#projects"
                        className="back-link"
                    >
                        <ArrowLeft size={18} />
                        Back to Projects
                    </Link>

                </div>

            </header>


            {/* Hero */}

            <section className="project-detail-hero">

                <div className="container">

                    <p className="section-eyebrow">
                        {project.featured
                            ? "FEATURED PROJECT"
                            : "PROJECT"}
                    </p>

                    <h1>
                        {project.name}
                    </h1>

                    <p className="project-detail-description">
                        {project.description}
                    </p>

                    <div className="project-detail-actions">

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="button button-secondary"
                            >
                                <FaGithub size={18} />
                                View on GitHub
                            </a>
                        )}

                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="button button-primary"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </a>
                        )}

                    </div>

                </div>

            </section>


            {/* Project Image */}

            <section className="project-detail-image-section">

                <div className="container">

                    {project.imageUrl ? (

                        <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="project-detail-image"
                        />

                    ) : (

                        <div className="project-detail-image-placeholder">

                            <span>
                                {project.name?.charAt(0)}
                            </span>

                        </div>

                    )}

                </div>

            </section>


            {/* Project Information */}

            <section className="project-detail-content">

                <div className="container">

                    <div className="project-detail-grid">

                        <main>

                            <p className="section-eyebrow">
                                OVERVIEW
                            </p>

                            <h2>
                                About this project
                            </h2>

                            <p>
                                {project.description}
                            </p>

                        </main>


                        <aside>

                            <p className="section-eyebrow">
                                TECHNOLOGIES
                            </p>

                            <div className="project-detail-technologies">

                                {technologies.map(
                                    (technology) => (

                                        <span
                                            key={technology.id}
                                            className="technology-tag"
                                        >
                                            {technology.name}
                                        </span>

                                    )
                                )}

                            </div>

                        </aside>

                    </div>

                </div>

            </section>


            {/* Bottom Navigation */}

            <section className="project-detail-bottom">

                <div className="container">

                    <Link
                        to="/#projects"
                        className="button button-secondary"
                    >
                        <ArrowLeft size={18} />
                        Back to all projects
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default ProjectDetailPage;