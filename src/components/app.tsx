import { FunctionalComponent as FC, h, VNode } from "preact";
import { getCurrentUrl, route, Route, RouteProps, Router } from "preact-router";
import { useCallback, useEffect } from "preact/hooks";

import Header from "./header";
import { routes, slides } from "./slides";

const App: FC = () => {

    const onKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.target instanceof HTMLInputElement) {
            return;
        }
        switch (event.key) {
            case "ArrowLeft":
                history.back();
                break;
            case "ArrowRight":
                const current = getCurrentUrl();
                const currentSlideIndex = slides.findIndex((slide) => slide === current);
                if (currentSlideIndex >= 0) {
                    const nextSlideIndex = currentSlideIndex + 1;
                    if (nextSlideIndex < slides.length) {
                        const nextSlidePath = slides[nextSlideIndex];
                        if (nextSlidePath) {
                            route(nextSlidePath);
                        }
                    }
                }
                break;
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyPress);
        return () => {
            document.removeEventListener("keydown", onKeyPress);
        }
    });

    return (
        <div id="preact_root" class="page">
            <div class="center" style={{ margin: "5vh" }}>
                <Header
                    headline="Letarette"
                    tagline="Innovation Bay, May 2022"
                />
                <div id="content">
                    <Router>{routes.map((route) => route)}</Router>
                </div>
                <footer>erik@naivecircuits.com</footer>
            </div>
        </div>
    );
};

export default App;
