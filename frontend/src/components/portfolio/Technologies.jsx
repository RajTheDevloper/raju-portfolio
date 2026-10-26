
function Technologies({ technologies = [] }) {
    if (!technologies.length) {
        return null;
    }

    return (
        <section id="technologies" className="technologies-section">
            <div className="technologies-container">
                <div className="technologies-heading">
                    <span className="technologies-eyebrow">
                        MY TECH STACK
                    </span>

                    <h2>Technologies I Work With</h2>

                    <p>
                        Tools and technologies I use to build
                        reliable, scalable applications.
                    </p>
                </div>

                <div className="technologies-grid">
                    {technologies.map((technology) => (
                        <article
                            className="technology-card"
                            key={technology.id ?? technology.slug ?? technology.name}
                        >
                            <span className="technology-icon">
                                {(technology.name || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>

                            <div className="technology-details">
                                <h3>{technology.name}</h3>
                                {technology.slug && (
                                    <p>{technology.slug}</p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Technologies;
