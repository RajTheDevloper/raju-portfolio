import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
function PortfolioLayout({ children }) {
     return (
        <div className="portfolio-layout"> 
        
            <Navbar />
            
             <main> {children}
             </main> 
             
             <Footer /> 
             </div>
        ); 
    } 
    
    export default PortfolioLayout;

    /**
     * This component gives us a consistent structure: ```text Navbar ↓ Page content ↓ Footer
     * 
     * 
     */