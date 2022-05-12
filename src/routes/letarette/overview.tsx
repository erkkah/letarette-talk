import { FunctionalComponent as FC, Fragment, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Centered, Column, SpaceList } from "../../components/preso";

const Page: FC = () => (
    <Column style={{ flexGrow: 1 }}>
        <Markdown>### [apps](mdi) Letarette components</Markdown>
        <Centered>
            <SpaceList>
                <Column>
                    <Nomnoml>{`
#direction: right
#.service: visual=ellipse bold

[<database>Primary;Storage] <- [<abstract>Document;Manager]
[Document;Manager] -- [<service>NATS]
[NATS] -- [letarette|
    [<database>Index]
]
`}</Nomnoml>
                    <Markdown>
                        Letarette is an **active** index, keeping itself updated using a ***Document
                        Manager*** to pull data from **Primary Storage**.
                    </Markdown>
                    <Markdown>
                        The messaging system **NATS** is used for redundancy,
                        load distribution and pub/sub features.
                    </Markdown>
                </Column>
                <Column>
                    <Nomnoml>{`
#direction: right
#.service: visual=ellipse bold

[<actor>Client] -> [<abstract>Search;Agent]
[Client] -> [<database>Primary;Storage]
[Search;Agent] -- [<service>NATS]
[NATS] -- [letarette|
    [<database>Index]
]
`}</Nomnoml>
                    <Markdown>
                        Searching uses a ***Search Agent*** (from the Letarette SDK) to
                        talk to the index.
                    </Markdown>
                    <Markdown>
                        Search results can be dressed up by pulling documents by
                        ID from the Primary Storage.
                    </Markdown>
                </Column>
            </SpaceList>
        </Centered>
    </Column>
);

export default Page;
