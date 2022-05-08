import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import { Boxed, Centered } from "../../components/preso";

import pages from "./pages";

const MD: FC<{ page: string; boxed: boolean }> = (props) => {
    const page = pages[props.page];

    const markdowned = <Markdown>{page}</Markdown>;

    return (
        <Centered>
            {props.boxed ? <Boxed>{markdowned}</Boxed> : markdowned}
        </Centered>
    );
};

export default MD;
