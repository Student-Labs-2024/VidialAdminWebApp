import { createBrowserRouter } from "react-router-dom";
import AuthComponent from "./AuthPage/AuthComponent";
import ErrorAuthComponent from "./AuthPage/ErrorAuthComponent";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AuthComponent />,
        errorElement: <ErrorAuthComponent />

    },
]);

export default Router; 