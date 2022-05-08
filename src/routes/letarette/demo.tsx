import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered, Column } from "../../components/preso";

const Page: FC = () => (
    <Centered>
        <Column>
            <Markdown>{`
## Demo
### The "Steely Spam" song database
`}</Markdown>
            <Nomnoml>{`
#title: Letarette Overview
#direction: right

[<actor>Demo;Page] -> [API;Service|[Search;Agent]]
[API] -> [<database>Primary;Storage|songs.db]
[<actor>Ghost;Writer] -> [Primary]
[Primary;Storage] - [SQL Document;Manager]
[SQL Document;Manager] -- [<service>NATS]
[API] -- [NATS]
[NATS] -- [Letarette|
    [<database>Index]
]
`}</Nomnoml>
        </Column>
    </Centered>
);

export default Page;
