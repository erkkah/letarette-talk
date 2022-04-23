import { FunctionalComponent, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import * as microDown from "micro-down";
import Highlight from "highlight.js";
import "highlight.js/styles/rainbow.css";

const Markdown: FunctionalComponent = (props) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let md = "";
        if (typeof props.children === "string") {
            md = props.children;
        } else if (Array.isArray(props.children)) {
            md = props.children.join("");
        }
        const rendered = microDown.parse(md, { preCode: true });

        const textDiv = textRef.current;
        if (textDiv) {
            textDiv.innerHTML = rendered;
            const anchors = textDiv.getElementsByTagName("a");
            for (const anchor of anchors) {
                if (anchor.href == document.URL) {
                    anchor.classList.add("target");
                }
            }
            Highlight.highlightAll();
        }
    });

    return <div ref={textRef} />;
};

export default Markdown;
