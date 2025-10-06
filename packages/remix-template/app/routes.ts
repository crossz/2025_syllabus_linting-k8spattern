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

  {
    path: "/slides/chapter4",
    file: "routes/slides.chapter4.tsx"
  },
  {
    path: "/slides/chapter5",
    file: "routes/slides.chapter5.tsx"
  },
  {
    path: "/slides/chapter6",
    file: "routes/slides.chapter6.tsx"
  },
  {
    path: "/slides/chapter789",
    file: "routes/slides.chapter789.tsx"
  }
] satisfies RouteConfig;
