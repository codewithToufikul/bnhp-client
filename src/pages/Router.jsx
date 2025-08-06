import { createBrowserRouter } from "react-router-dom";
import { Main } from "./Main/Main";
import About from "./About/About";
import AllNews from "./AllNews/AllNews";
import CurrentEvents from "./CurrentEventsa/CurrentEvents";
import NewsDetails from "./NewsDetails/NewsDetails";
import DashLogin from "./DashBoard/DashLogin/DashLogin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/about-us",
        element: <About />
    },
    {
        path: "/all-news",
        element: <AllNews />
    },
    {
        path: "/current-events",
        element: <CurrentEvents />
    },
    {
        path: "/news-details/:id",
        element: <NewsDetails />
    },{
        path: "/dashboard-login",
        element: <DashLogin/>
    }
])