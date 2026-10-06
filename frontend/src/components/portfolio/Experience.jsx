import {
    BriefcaseBusiness,
    CalendarDays,
    MapPin,
    Circle
} from "lucide-react";

const formatDate = (date) => {
    if (!date) {
        return "Present";
    }

    return new Intl.DateTimeFormat("en-IN", {
        month: "short",
        year: "numeric"
    }).format(new Date(`${date}T00:00:00`));
};

const getResponsibilities = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    if (!value) {
        return [];
    }

    return [value];
};

const getDateRange = (experience) => {
    const start = formatDate(experience.startDate);

    if (experience.current) {
        return `${start} – Present`;
    }

    return `${start} – ${formatDate(experience.endDate)}`;
};

const Experience = ({ experience = [] }) => {
    if (!experience.length) {
        return (
            <section className="experience-section" id="experience">
                <div className="section-container">
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            Experience
                        </span>

                        <h2>My professional journey</h2>

                        <p>
                            My work experience and professional journey
                            will appear here.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="experience-section" id="experience">
            <div className="section-container">

                <div className="section-heading">
                    <span className="section-eyebrow">
                        Experience
                    </span>

                    <h2>Where I've worked</h2>

                    <p>
                        A timeline of my professional experience,
                        responsibilities, and career growth.
                    </p>
                </div>

                <div className="experience-timeline">

                    {experience.map((item, index) => {

                        const responsibilities =
                            getResponsibilities(
                                item.responsibilities
                            );

                        return (
                            <article
                                className="experience-item"
                                key={item.id ?? index}
                            >

                                <div className="experience-marker">
                                    <Circle size={12} />
                                </div>

                                <div className="experience-card">

                                    <div className="experience-card-header">

                                        <div>
                                            <div className="experience-company-row">

                                                <BriefcaseBusiness
                                                    size={18}
                                                />

                                                <span className="experience-company">
                                                    {item.companyName}
                                                </span>

                                            </div>

                                            <h3>
                                                {item.jobTitle}
                                            </h3>
                                        </div>

                                        {item.current && (
                                            <span className="experience-current-badge">
                                                Current
                                            </span>
                                        )}

                                    </div>

                                    <div className="experience-meta">

                                        <span>
                                            <CalendarDays size={15} />

                                            {getDateRange(item)}
                                        </span>

                                        {item.location && (
                                            <span>
                                                <MapPin size={15} />

                                                {item.location}
                                            </span>
                                        )}

                                        {item.employmentType && (
                                            <span>
                                                {item.employmentType}
                                            </span>
                                        )}

                                    </div>

                                    {item.description && (
                                        <p className="experience-description">
                                            {item.description}
                                        </p>
                                    )}

                                    {responsibilities.length > 0 && (
                                        <div className="experience-responsibilities">

                                            <h4>
                                                Key responsibilities
                                            </h4>

                                            <ul>
                                                {responsibilities.map(
                                                    (responsibility, responsibilityIndex) => (
                                                        <li
                                                            key={responsibilityIndex}
                                                        >
                                                            {responsibility}
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                        </div>
                                    )}

                                </div>

                            </article>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default Experience;