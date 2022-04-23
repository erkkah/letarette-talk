import { h, VNode } from "preact";
import { Route, RouteProps } from "preact-router";

import { IssueClient } from "../api";

import Home from "../routes/home";
import Search from "../routes/search";
import NotFoundPage from "../routes/notfound";
import MD from "../routes/md";

const issueClient = new IssueClient("http://localhost:3000");

export const routes: VNode<RouteProps<any>>[] = [
    <Route path="/" component={Home} />,
    <Route path="/search" component={Search} issueClient={issueClient} />,
    <Route path="/md/:page" component={MD} />,
    <NotFoundPage default />,
];

export const slides: string[] = [
    "/",
    "/search",
    "/md/home",
];
