import {
    Code2,
    Database,
    Globe,
    Server
} from "lucide-react";

const categoryIcons = {
    Backend: Server,
    Frontend: Globe,
    Database: Database,
    Other: Code2
};

function Skills({ skills }) {

    if (!skills || skills.length === 0) {
        return null;
    }

    const groupedSkills = skills.reduce(
        (groups, skill) => {

            const category =
                skill.category || "Other";

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(skill);

            return groups;
        },
        {}
    );

    return (
        <section
            id="skills"
            className="portfolio-section skills-section"
        >

            <div className="container">

                <div className="section-heading">

                    <p className="section-eyebrow">
                        MY TOOLKIT
                    </p>

                    <h2>
                        Technologies I work
                        <span> with.</span>
                    </h2>

                </div>


                <div className="skills-grid">

                    {Object.entries(groupedSkills).map(
                        ([category, categorySkills]) => {

                            const Icon =
                                categoryIcons[category]
                                || categoryIcons.Other;

                            return (
                                <div
                                    className="skill-category"
                                    key={category}
                                >

                                    <div className="skill-category-header">

                                        <div className="skill-category-icon">
                                            <Icon size={20} />
                                        </div>

                                        <h3>
                                            {category}
                                        </h3>

                                    </div>


                                    <div className="skill-list">

                                        {categorySkills.map(
                                            (skill) => (

                                                <div
                                                    className="skill-item"
                                                    key={skill.id}
                                                >

                                                    <span>
                                                        {skill.name}
                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

            </div>

        </section>
    );
}

export default Skills;