import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import { Boxed, Centered } from "../../components/preso";
import SVG from "../../components/svg";

import home from "./home.md";
import whoa from "./whoa.nomnoml";

const Home: FC = () => (
    <Centered>
        <Boxed>
            <Markdown>{home}</Markdown>
            <SVG src={whoa}/>
        </Boxed>
    </Centered>
);

export default Home;
