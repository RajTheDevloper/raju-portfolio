import {
  Mail,
  ArrowUp
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";


import { FaGithub } from "react-icons/fa";

const Footer = ({ profile }) => {

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  };

  return (
      <footer className="site-footer">

          <div className="section-container">

              <div className="footer-main">

                  {/* Brand */}
                  <div className="footer-brand">

                      <a
                          href="/"
                          className="footer-logo"
                      >
                          {profile?.name || "Portfolio"}
                      </a>

                      {profile?.title && (
                          <p>
                              {profile.title}
                          </p>
                      )}

                      {profile?.shortBio && (
                          <p className="footer-description">
                              {profile.shortBio}
                          </p>
                      )}

                  </div>


                  {/* Navigation */}
                  <div className="footer-column">

                      <h3>
                          Navigation
                      </h3>

                      <nav className="footer-links">

                          <a href="/#about">
                              About
                          </a>

                          <a href="/#skills">
                              Skills
                          </a>

                          <a href="/#projects">
                              Projects
                          </a>

                          <a href="/#experience">
                              Experience
                          </a>

                          <a href="/#education">
                              Education
                          </a>

                          <a href="/#resume">
                              Resume
                          </a>

                          <a href="/#contact">
                              Contact
                          </a>

                      </nav>

                  </div>


                  {/* Social */}
                  <div className="footer-column">

                      <h3>
                          Connect
                      </h3>

                      <div className="footer-socials">

                          {profile?.githubUrl && (
                              <a
                                  href={profile.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub"
                              >
                                  <FaGithub size={19} />
                              </a>
                          )}

                          {profile?.linkedinUrl && (
                              <a
                                  href={profile.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                              >
                                  <FaLinkedin size={19} />
                              </a>
                          )}

                          {profile?.email && (
                              <a
                                  href={`mailto:${profile.email}`}
                                  aria-label="Email"
                              >
                                  <Mail size={19} />
                              </a>
                          )}

                      </div>

                  </div>

              </div>


              {/* Bottom */}
              <div className="footer-bottom">

                  <p>
                      © {currentYear}{" "}
                      {profile?.name || "Portfolio"}.
                      {" "}
                      All rights reserved.
                  </p>

                  <button
                      type="button"
                      className="back-to-top"
                      onClick={scrollToTop}
                      aria-label="Back to top"
                  >
                      Back to top
                      <ArrowUp size={16} />
                  </button>

              </div>

          </div>

      </footer>
  );
};

export default Footer;