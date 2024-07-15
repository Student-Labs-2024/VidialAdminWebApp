import { createBrowserRouter } from "react-router-dom";
import AuthComponent from "./AuthPage/AuthComponent";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AuthComponent />,

    },
]);

export default Router; 