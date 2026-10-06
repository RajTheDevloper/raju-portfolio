import {
    ArrowUpRight,
    ExternalLink
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

function ProjectCard({ project }) {

    const technologies =
        project?.technologies || [];

    return (
        <article className="project-card">

            {/* Project Image */}
            <div className="project-image-wrapper">

                {project?.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="project-image"
                    />
                ) : (
                    <div className="project-image-placeholder">
                        <span>
                            {project?.name?.charAt(0)}
                        </span>
                    </div>
                )}

            </div>


            {/* Project Content */}
            <div className="project-content">

                <div className="project-card-top">

                    <div>

                        <p className="project-label">
                            {project?.featured
                                ? "FEATURED PROJECT"
                                : "PROJECT"}
                        </p>

                        <h3>
                            {project?.name}
                        </h3>

                    </div>

                    {project?.slug && (
                        <a
                            href={`/projects/${project.slug}`}
                            className="project-arrow"
                            aria-label={`View ${project.name}`}
                        >
                            <ArrowUpRight size={20} />
                        </a>
                    )}

                </div>


                {/* Description */}
                <p className="project-description">
                    {project?.description}
                </p>


                {/* Technologies */}
                {technologies.length > 0 && (

                    <div className="project-technologies">

                        {technologies.map((technology) => (

                            <span
                                key={technology.id}
                                className="technology-tag"
                            >
                                {technology.name}
                            </span>

                        ))}

                    </div>

                )}


                {/* Links */}
                <div className="project-links">

                    {project?.githubUrl && (

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub size={17} />
                            GitHub
                        </a>

                    )}

                    {project?.liveUrl && (

                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <ExternalLink size={17} />
                            Live Demo
                        </a>

                    )}

                </div>

            </div>

        </article>
    );
}

export default ProjectCard;

/***
 * 3. Why we're using a separate `ProjectCard`

Instead of putting everything into `Projects.jsx`, we're separating responsibilities:

Projects.jsx
↓
decides which projects to display

ProjectCard.jsx
↓
decides how ONE project looks


This becomes extremely useful when your admin CMS eventually has 20+ projects.
 */