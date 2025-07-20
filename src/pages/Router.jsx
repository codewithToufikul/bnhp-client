import { createBrowserRouter } from "react-router-dom";
import { Main } from "./Main/Main";
import About from "./About/About";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/about-us",
        element: <About />
    }
])