import { lazy } from "react";
import ErrorPage from "./ErrorPage";
// import Home from "./Home";
export const Home = lazy(() => import("./Home"));
export const Campaigns = lazy(() => import("./Campaigns"))
export const Organizations = lazy(() => import("./Organizations"))
export const About = lazy(() => import("./About"))
export const Profile = lazy(() => import("./Profile"))
export const Admin = lazy(() => import("./Admin"))
export const AdminLogin = lazy(() => import("./AdminLogin"))
export { ErrorPage } ;
