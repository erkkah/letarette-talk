import { h, VNode } from "preact";
import { Route, RouteProps } from "preact-router";

import Home from "../routes/home";
import Search from "../routes/search";
import NotFoundPage from "../routes/notfound";
import MD from "../routes/md";

export const routes: VNode<RouteProps<any>>[] = [
    <Route path="/" component={Home} />,
    <Route path="/search" component={Search} />,
    <Route path="/md/:page" component={MD} />,
    <NotFoundPage default />,
];

export const slides: string[] = ["/", "/search", "/md/home"];
