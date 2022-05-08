import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered } from "../../components/preso";

const Sparse: FC = () => (
    <Centered>
        <Boxed>
            <Markdown>**Sparse** index</Markdown>
            <Nomnoml>{`#direction: right
            [<actor>Me]->[API]
            [Me]<-[<note>Doc]
            [API]->[Index]
            [Index]ID->[API]
            [API]<->[Source]
            [<note>Doc]<-[API]
            `}</Nomnoml>
        </Boxed>
    </Centered>
);

export default Sparse;
