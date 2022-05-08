import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered, Column } from "../../components/preso";

const Page: FC = () => (
    <Centered>
        <Column>
            <Markdown>### Letarette components</Markdown>
            <Nomnoml>{`
#title: Letarette Overview
#direction: right

[<actor>Client] -> [Search;Agent]
[Client] -> [<database>Primary;Storage]
[Primary;Storage] <- [Document;Manager]
[Document;Manager] -- [<service>NATS]
[Search;Agent] -- [NATS]
[NATS] -- [Letarette|
    [<database>Index]
]
`}</Nomnoml>
            <Markdown>
            {`
Letarette uses the high performance messaging system **NATS** for
redundancy, load distribution and pub/sub features.

The **Document Manager** and **Search Agent** come with the integration SDKs.
            `}
            </Markdown>
        </Column>
    </Centered>
);

export default Page;
