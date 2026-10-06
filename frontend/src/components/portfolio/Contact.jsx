import { useState } from "react";
import {
    Mail,
    Send,
    User,
    MessageSquare,
    CheckCircle,
    AlertCircle
} from "lucide-react";

import { submitContactMessage } from "../../services/contactService";

const Contact = ({ profile }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSuccess("");
        setError("");
        setLoading(true);

        try {
            await submitContactMessage(formData);

            setSuccess(
                "Your message has been sent successfully. I'll get back to you soon."
            );

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (err) {

            const backendMessage =
                err.response?.data?.message;

            setError(
                backendMessage ||
                "Something went wrong while sending your message. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="contact-section"
            id="contact"
        >
            <div className="section-container">

                <div className="section-heading">
                    <span className="section-eyebrow">
                        Contact
                    </span>

                    <h2>
                        Let's work together
                    </h2>

                    <p>
                        Have a project, opportunity, or simply want
                        to say hello? Send me a message.
                    </p>
                </div>

                <div className="contact-layout">

                    {/* Contact information */}
                    <div className="contact-info">

                        <div className="contact-info-header">

                            <div className="contact-info-icon">
                                <Mail size={24} />
                            </div>

                            <div>
                                <h3>
                                    Get in touch
                                </h3>

                                <p>
                                    I'm always open to discussing
                                    new opportunities and interesting
                                    projects.
                                </p>
                            </div>

                        </div>

                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="contact-email"
                            >
                                <Mail size={18} />

                                <span>
                                    {profile.email}
                                </span>
                            </a>
                        )}

                        {profile?.location && (
                            <div className="contact-location">
                                {profile.location}
                            </div>
                        )}

                    </div>


                    {/* Contact form */}
                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <div className="input-wrapper">
                                    <User size={17} />

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                            </div>


                            <div className="form-group">

                                <label htmlFor="email">
                                    Email
                                </label>

                                <div className="input-wrapper">
                                    <Mail size={17} />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                            </div>

                        </div>


                        <div className="form-group">

                            <label htmlFor="subject">
                                Subject
                            </label>

                            <div className="input-wrapper">

                                <MessageSquare size={17} />

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What would you like to discuss?"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows="7"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project or opportunity..."
                                required
                            />

                        </div>


                        {success && (
                            <div className="contact-alert contact-alert-success">
                                <CheckCircle size={18} />

                                <span>
                                    {success}
                                </span>
                            </div>
                        )}


                        {error && (
                            <div className="contact-alert contact-alert-error">
                                <AlertCircle size={18} />

                                <span>
                                    {error}
                                </span>
                            </div>
                        )}


                        <button
                            type="submit"
                            className="btn btn-primary contact-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="contact-spinner" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={17} />
                                    Send Message
                                </>
                            )}

                        </button>

                    </form>

                </div>

            </div>
        </section>
    );
};

export default Contact;