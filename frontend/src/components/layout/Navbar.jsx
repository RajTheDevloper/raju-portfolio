import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="container navbar-container">

                {/* Logo */}
                <a
                    href="/"
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    Raju<span>.</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar-links">

                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#experience">Experience</a>
                    <a href="#education">Education</a>
                    <a href="#contact">Contact</a>

                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="navbar-menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="navbar-mobile">

                    <a href="#about" onClick={closeMenu}>
                        About
                    </a>

                    <a href="#skills" onClick={closeMenu}>
                        Skills
                    </a>

                    <a href="#projects" onClick={closeMenu}>
                        Projects
                    </a>

                    <a href="#experience" onClick={closeMenu}>
                        Experience
                    </a>

                    <a href="#education" onClick={closeMenu}>
                        Education
                    </a>

                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>

                </nav>
            )}
        </header>
    );
}

export default Navbar;

