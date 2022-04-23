import { FunctionalComponent as FC, h } from "preact";

const centeredRowStyle: h.JSX.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden"
};

export const Centered: FC = (props) => (
    <div style={centeredRowStyle}>{props.children}</div>
);

const boxedStyle: h.JSX.CSSProperties = {
    borderRadius: "12px",
    border: "2px solid var(--c3)",
    padding: "24px",
    marginTop: "4px",
    boxShadow: "6px 6px 3px var(--c2)",
};

export const Boxed: FC = (props) => (
    <div style={boxedStyle}>{props.children}</div>
);

const rowStyle: h.JSX.CSSProperties = {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
};

export const Row: FC = (props) => <div style={rowStyle}>{props.children}</div>;

const columnStyle: h.JSX.CSSProperties = {
    flexShrink: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
};

export const Column: FC = (props) => (
    <div style={columnStyle}>{props.children}</div>
);
