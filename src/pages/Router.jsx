import { createBrowserRouter } from "react-router-dom";
import { Main } from "./Main/Main";
import About from "./About/About";
import AllNews from "./AllNews/AllNews";
import CurrentEvents from "./CurrentEventsa/CurrentEvents";
import NewsDetails from "./NewsDetails/NewsDetails";
import DashLogin from "./DashBoard/DashLogin/DashLogin";
import DashBoard from "./DashBoard/DashBoard/DashBoard";
import PrivetRoute from "../component/PrivetRoute";
import DashboardEvents from "./DashBoard/DashboardEvents/DashboardEvents";
import DashboardNews from "./DashBoard/DashboardNews/DashboardNews";
import DashboardSlider from "./DashBoard/DashboardSlider/DashboardSlider";
import DashboardBlogs from "./DashBoard/DashboardBlogs/DashboardBlogs";
import DashHome from "./DashBoard/DashHome/DashHome";
import BlogDetails from "./BlogDetails/BlogDetails";
import AllBlogs from "./AllBlogs/AllBlogs";

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
        path: "/blog-details/:id",
        element: <BlogDetails/>
    },{
        path: "/all-blogs",
        element: <AllBlogs/>
    },{
        path: "/dashboard-login",
        element: <DashLogin/>
    },{
        path: "/dashboard",
        element: <PrivetRoute><DashBoard/></PrivetRoute>,
        children:[
            {
                path: "/dashboard/manage-news",
                element: <PrivetRoute><DashboardNews></DashboardNews></PrivetRoute>
            },
            {
                path: "/dashboard/manage-events",
                element: <PrivetRoute><DashboardEvents/></PrivetRoute>
            },
            {
                path: "/dashboard/manage-slider",
                element: <PrivetRoute><DashboardSlider/></PrivetRoute>
            },
            {
                path: "/dashboard/manage-blog",
                element: <PrivetRoute><DashboardBlogs/></PrivetRoute>
            },
            {
                path: "/dashboard",
                element: <PrivetRoute><DashHome/></PrivetRoute>
            }
        ]
    }
])