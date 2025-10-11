import { index, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "/chapter4",
    file: "routes/chapter4.tsx"
  },
  {
    path: "/chapter5",
    file: "routes/chapter5.tsx"
  },
  {
    path: "/chapter6",
    file: "routes/chapter6.tsx"
  },
  {
    path: "/chapter7",
    file: "routes/chapter7.tsx"
  },

] satisfies RouteConfig;
