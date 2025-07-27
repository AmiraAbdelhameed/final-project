import { v4 } from "uuid";
import {
  Home,
  Campaigns,
  Organizations,
  About,
  Profile,
  Admin,
} from "../pages";
import Layout from "../layout/Layout";

import Organization from "../components/Admin/Organization";
import AdminCampaigns from "../components/Admin/AdminCampaigns";
import Login from "../components/Forms/Login";
import Signup from "../components/Forms/Signup";
import OrganizationDetails from "../pages/OrganizationDetails";
import CampaignDetails from "../pages/CampaignDetails";
import ProtectedAdminRoute from "../components/Admin/ProtectedAdminRoute";
import AdminOrganizationDetails from "../components/Admin/AdminOrganizationDetails";
import CampaignsDetails from "../components/Admin/CampaignsDetails";

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
        path: "/campaigns",
        element: <Campaigns />,
      },
      {
        id: v4(),
        path: "/campaigns/:id",
        element: <CampaignDetails />,
      },
      {
        id: v4(),
        path: "/organizations",
        element: <Organizations />,
      },
      {
        id: v4(),
        path: "/organizations/:id",
        element: <OrganizationDetails />,
      },
      {
        id: v4(),
        path: "/about",
        element: <About />,
      },
      {
        id: v4(),
        path: "/profile",
        element: <Profile />,
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
                element: <Login />,
            },
            {
                id: v4(),
                path: '/admin/main',
                element: <ProtectedAdminRoute><Admin /></ProtectedAdminRoute>,
                children: [
                    {
                        id: v4(),
                        index: true,
                        element: <Organization />
                    },
                    {
                        id: v4(),
                      path: 'campaigns',
                      element: <AdminCampaigns />
                    },
                ]
            },
            {
              id:v4(),
              path:'/admin/organization/:id',
              element: <ProtectedAdminRoute> <AdminOrganizationDetails /></ProtectedAdminRoute>
            },
            {
              id:v4(),
              path:'/admin/campaigns/:id',
              element: <ProtectedAdminRoute> <CampaignsDetails /></ProtectedAdminRoute>
            },
           
  
    {
        id:v4(),
        path:'/login',
        element:<Login />
    },
    {
        id:v4(),
        path:'/signup',
        element:<Signup />
    },

  ]
  }]
