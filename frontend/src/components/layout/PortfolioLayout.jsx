import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const PortfolioLayout = () => {
    return (
        <div className="portfolio-layout">

            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default PortfolioLayout;