import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import { Boxed, Centered } from "../../components/preso";

import pages from "./pages";

const MD: FC<{ page: string }> = (props) => {
    const page = pages[props.page];

    return (
        <Centered>
            <Boxed>
                <Markdown>{page}</Markdown>
            </Boxed>
        </Centered>
    );
};

export default MD;
