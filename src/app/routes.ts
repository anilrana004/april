import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CategoryPage } from "./pages/CategoryPage";
import { DesignYourOwnPage } from "./pages/DesignYourOwnPage";
import { ConfiguratorPage } from "./pages/ConfiguratorPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "product/:slug", Component: ProductDetailPage },
      { path: "collections/:category", Component: CategoryPage },
      { path: "design-your-own", Component: DesignYourOwnPage },
      { path: "design-your-own/:type", Component: ConfiguratorPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
