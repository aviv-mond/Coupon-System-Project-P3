import "./mainLayout.css";
import PageFooter from "./pageFooter/pageFooter";
import PageHeader from "./pageHeader/pageHeader";
import PageMenu from "./pageMenu/pageMenu";
import SiteRouting from './../routing/siteRouting/siteRouting';
import { BrowserRouter } from "react-router-dom";

function MainLayout(): JSX.Element {
    return (
        <div className="mainLayout" dir="rtl">
            <BrowserRouter>
                <header>
                    <PageHeader/>
                </header>
                <main>
                    <SiteRouting/>
                </main>
                <aside>
                    <PageMenu/>
                </aside>
                <footer>
                    <PageFooter/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default MainLayout;
