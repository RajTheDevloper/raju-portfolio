import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
const PortfolioLayout = ({ children, profile }) => {
    return (
        <>
            <Navbar profile={profile} />

            <main>
                {children}
            </main>

            <Footer profile={profile} />
        </>
    );
};

export default PortfolioLayout;

    /**
     * This component gives us a consistent structure: ```text Navbar ↓ Page content ↓ Footer
     */