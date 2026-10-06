
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© {currentYear} Raju B. All rights reserved.</p>

        <p>Built with Java, Spring Boot & React.</p>
      </div>
    </footer>
  );
}

export default Footer;

