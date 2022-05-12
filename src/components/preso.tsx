import { FunctionalComponent as FC, Fragment, h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

const centeredRowStyle: h.JSX.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden",
};

export const Centered: FC<StyleProps> = (props) => (
    <div style={{ ...centeredRowStyle, ...props.style }}>{props.children}</div>
);

const boxedStyle: h.JSX.CSSProperties = {
    borderRadius: "12px",
    border: "2px solid var(--c3)",
    padding: "1em",
    marginTop: "4px",
    marginLeft: "1em",
    marginRight: "1em",
    boxShadow: "6px 6px 3px var(--c2)",
};

export const Boxed: FC = (props) => (
    <div style={boxedStyle}>{props.children}</div>
);

interface StyleProps {
    style?: Partial<h.JSX.CSSProperties>;
}

const rowStyle: h.JSX.CSSProperties = {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
};

export const Row: FC<StyleProps> = (props) => (
    <div style={{ ...rowStyle, ...props.style }}>{props.children}</div>
);

const columnStyle: h.JSX.CSSProperties = {
    flexShrink: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
};

export const Column: FC<StyleProps> = (props) => (
    <div style={{ ...columnStyle, ...props.style }}>{props.children}</div>
);

export const SpaceList: FC = (props) => {
    const children = Array.isArray(props.children)
        ? props.children
        : [props.children ?? ""];

    const [childIndex, setChildIndex] = useState(0);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        let diff = 0;

        switch (event.key) {
            case " ":
            case "ArrowDown":
                diff = 1;
                break;
            case "ArrowUp":
                diff = -1;
                break;
        }

        setChildIndex((prev) => {
            let pos = prev + diff;
            return Math.max(0, Math.min(pos, children.length - 1));
        });
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return <>{children[childIndex]}</>;
};
