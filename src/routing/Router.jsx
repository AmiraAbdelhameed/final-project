import { v4 } from "uuid";
import { Home, Campaigns, Organizations, About, Profile } from "../pages";
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
                path:'/campaigns',
                element: <Campaigns />,
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
            {
                id: v4(),
                path:'/profile',
                element: <Profile />,
            },
        ]
    },

];