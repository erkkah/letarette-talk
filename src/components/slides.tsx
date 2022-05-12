import { h, VNode } from "preact";
import { Route, RouteProps } from "preact-router";

import Home from "../routes/home";
import Search from "../routes/search";
import NotFoundPage from "../routes/notfound";
import MD from "../routes/md";
import Docs from "../routes/letarette/documents";
import Overview from "../routes/letarette/overview";
import Shards from "../routes/letarette/sharding";
import Demo from "../routes/letarette/demo";
import Code from "../routes/letarette/code";

export const routes: VNode<RouteProps<any>>[] = [
    <Route path="/" component={Home} />,
    <Route path="/md/:page" component={MD} />,
    <Route path="/search" component={Search} />,
    <Route path="/lroverview" component={Overview} />,
    <Route path="/lrdocs" component={Docs} />,
    <Route path="/lrshards" component={Shards} />,
    <Route path="/demo" component={Demo} />,
    <Route path="/code" component={Code} />,
    <NotFoundPage default />,
];

export const slides: string[] = [
    "/",
    "/md/what",
    "/md/how",
    "/md/inverted",
    "/md/features",
    "/md/lrfeatures",
    "/lrdocs",
    "/lroverview",
    "/lrshards",
    "/demo",
    "/code",
    "/search",
    "/md/nextsteps?boxed=true",
    "/md/thanks"
];
