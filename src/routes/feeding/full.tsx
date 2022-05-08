import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered } from "../../components/preso";

const Full: FC = () => (
    <Centered>
        <Boxed>
            <Markdown>**Feeding** and **Searching** the index</Markdown>
            <Nomnoml>{`#direction: right
            [<note>Doc]->[Index]
            [<database>Source]->[Doc]
            `}</Nomnoml>
            <Nomnoml>{`#direction: right
            [<actor>Me]->[API]
            [Index]->[<note>Doc]
            [API]->[Index]
            [Doc]->[Me]
            `}</Nomnoml>
        </Boxed>
    </Centered>
);


export default Full;
