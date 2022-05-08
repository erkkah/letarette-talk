import { h, VNode } from "preact";
import { Route, RouteProps } from "preact-router";

import Home from "../routes/home";
import Search from "../routes/search";
import NotFoundPage from "../routes/notfound";
import MD from "../routes/md";
import Full from "../routes/feeding/full";
import Sparse from "../routes/feeding/sparse";
import Docs from "../routes/letarette/documents";
import Overview from "../routes/letarette/overview";
import Demo from "../routes/letarette/demo";

export const routes: VNode<RouteProps<any>>[] = [
    <Route path="/" component={Home} />,
    <Route path="/md/:page" component={MD} />,
    <Route path="/search" component={Search} />,
    <Route path="/feeding" component={Full} />,
    <Route path="/sparse" component={Sparse} />,
    <Route path="/lroverview" component={Overview} />,
    <Route path="/lrdocs" component={Docs} />,
    <Route path="/demo" component={Demo} />,
    <NotFoundPage default />,
];

export const slides: string[] = [
    "/",
    "/md/what",
    "/md/how?boxed=true",
    //"/feeding",
    //"/sparse",
    "/md/challenges",
    //"/md/proscons",
    "/md/features",
    "/md/lrfeatures",
    "/lroverview",
    "/lrdocs",
    "/demo",
    "/search",
    "/thanks"
];
