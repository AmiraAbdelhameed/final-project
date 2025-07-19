import { v4 } from "uuid";
import { Home, Projects, Organizations, About } from "../pages";
import Layout from "../layout/Layout";

export default [
    {
        id: v4(),
        path: "/",
        element: <Layout />,
        children: [
            {
                id: v4(),
                index: true,
                element: <Home />,
            },
            {
                id: v4(),
                path:'/projects',
                element: <Projects />,
            },
            {
                id: v4(),
                path:'/organizations',
                element: <Organizations />,
            },
            {
                id: v4(),
                path:'/about',
                element: <About />,
            },
        ]
    },

];