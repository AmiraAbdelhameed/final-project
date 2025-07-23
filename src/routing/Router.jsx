import { v4 } from "uuid";
import { Home, Campaigns, Organizations, About, Profile , Admin } from "../pages";
import Layout from "../layout/Layout";
import Organization from "../components/Admin/Organization";
import Projects from "../components/Admin/Projects";


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
            {
                id: v4(),
                path:'/admin',
                element: <Admin />,
                children:[
                    {
                        id: v4(),
                        index:true,
                        element:<Organization />
                    },
                    {
                        id: v4(),
                        path:'projects',
                        element:<Projects />
                    },
                ]
            },
        ]
    },

];