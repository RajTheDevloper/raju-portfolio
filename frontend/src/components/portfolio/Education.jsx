import {
    GraduationCap,
    CalendarDays,
    MapPin
} from "lucide-react";

const formatDate = (date) => {
    if (!date) {
        return null;
    }

    return new Intl.DateTimeFormat("en-IN", {
        month: "short",
        year: "numeric"
    }).format(new Date(`${date}T00:00:00`));
};

const getDateRange = (education) => {
    const start = formatDate(education.startDate);
    const end = formatDate(education.endDate);

    if (!start && !end) {
        return null;
    }

    if (!end) {
        return `${start} – Present`;
    }

    return `${start} – ${end}`;
};

const Education = ({ education = [] }) => {

    if (!education.length) {
        return (
            <section
                className="education-section"
                id="education"
            >
                <div className="section-container">

                    <div className="section-heading">
                        <span className="section-eyebrow">
                            Education
                        </span>

                        <h2>My academic journey</h2>

                        <p>
                            My educational background will appear here.
                        </p>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section
            className="education-section"
            id="education"
        >
            <div className="section-container">

                <div className="section-heading">
                    <span className="section-eyebrow">
                        Education
                    </span>

                    <h2>My academic journey</h2>

                    <p>
                        The academic foundation behind my technical
                        journey and professional growth.
                    </p>
                </div>

                <div className="education-grid">

                    {education.map((item, index) => {

                        const dateRange = getDateRange(item);

                        return (
                            <article
                                className="education-card"
                                key={item.id ?? index}
                            >

                                <div className="education-icon">
                                    <GraduationCap size={24} />
                                </div>

                                <div className="education-content">

                                    <div className="education-card-top">

                                        <div>
                                            <span className="education-institution">
                                                {item.institution}
                                            </span>

                                            <h3>
                                                {item.degree}
                                            </h3>
                                        </div>

                                    </div>

                                    {item.fieldOfStudy && (
                                        <p className="education-field">
                                            {item.fieldOfStudy}
                                        </p>
                                    )}

                                    <div className="education-meta">

                                        {dateRange && (
                                            <span>
                                                <CalendarDays size={15} />
                                                {dateRange}
                                            </span>
                                        )}

                                        {item.location && (
                                            <span>
                                                <MapPin size={15} />
                                                {item.location}
                                            </span>
                                        )}

                                    </div>

                                    {item.description && (
                                        <p className="education-description">
                                            {item.description}
                                        </p>
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

export default Education;