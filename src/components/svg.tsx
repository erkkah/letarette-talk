import { FunctionalComponent as FC, h } from "preact";
import { useEffect, useRef } from "preact/hooks";

const SVG: FC<{src: string}> = ({src}) => {
    const svgRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.innerHTML = src;
        }
    });
    return <span ref={svgRef}/>;
};

export default SVG;
