import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const Projects = lazy(()=> import("./Projects"))
export const Organizations = lazy(() => import("./Organizations"))
export const About = lazy(() => import("./About"))
export const Profile = lazy(() => import("./Profile"))
