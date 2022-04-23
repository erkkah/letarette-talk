import { FunctionalComponent, h, Fragment } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { renderSvg } from "nomnoml";

import SVG from "./svg";

const Nomnoml: FunctionalComponent = (props) => {
    let nn = "";
    if (typeof props.children === "string") {
        nn = props.children;
    } else if (Array.isArray(props.children)) {
        nn = props.children.join("");
    }

    const svg = renderSvg(nn);
    return <SVG src={svg} />;
};

export default Nomnoml;
