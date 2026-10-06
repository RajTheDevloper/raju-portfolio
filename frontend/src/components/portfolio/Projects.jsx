import ProjectCard from "./ProjectCard";

function Projects({ projects }) {

    if (!projects || projects.length === 0) {
        return (
            <section
                id="projects"
                className="portfolio-section projects-section"
            >
                <div className="container">

                    <div className="section-heading">

                        <p className="section-eyebrow">
                            MY WORK
                        </p>

                        <h2>
                            Projects I'm
                            <span> proud of.</span>
                        </h2>

                    </div>

                    <p className="projects-empty">
                        Projects will be added soon.
                    </p>

                </div>
            </section>
        );
    }

    const featuredProjects =
        projects.filter(
            (project) => project.featured
        );

    const regularProjects =
        projects.filter(
            (project) => !project.featured
        );

    const orderedProjects = [
        ...featuredProjects,
        ...regularProjects
    ];

    return (
        <section
            id="projects"
            className="portfolio-section projects-section"
        >

            <div className="container">

                <div className="section-heading">

                    <p className="section-eyebrow">
                        MY WORK
                    </p>

                    <h2>
                        Projects I'm
                        <span> proud of.</span>
                    </h2>

                    <p>
                        A selection of applications and
                        systems I've built using modern
                        technologies.
                    </p>

                </div>


                <div className="projects-grid">

                    {orderedProjects.map((project) => (

                        <ProjectCard
                            key={project.id}
                            project={project}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Projects;


