import { FunctionalComponent as FC, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Row } from "./preso";

const SVG: FC<{ src: string }> = ({ src }) => {
    const svgRef = useRef<HTMLDivElement>(null);

    const style: h.JSX.CSSProperties = {
        margin: "0.5em",
        padding: 0,
        border: "0.5px solid var(--c0)",
    };

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.innerHTML = src;
        }
    });
    return (
        <Row style={{ justifyContent: "center" }}>
            <div style={style} ref={svgRef} />
        </Row>
    );
};

export default SVG;
