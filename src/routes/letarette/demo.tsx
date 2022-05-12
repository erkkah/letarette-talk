import { FunctionalComponent as FC, Fragment, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Centered, Column, SpaceList } from "../../components/preso";

const Page: FC = () => (
    <Column style={{ flexGrow: 1 }}>
        <Markdown>{`
## Demo
---
### The "Steely Spam" song service
`}</Markdown>
        <Centered>
            <SpaceList>
                <Column>
                    <Nomnoml>{`
#direction: right
#gutter:10
#.service: visual=ellipse bold

[<actor>Python;Ghost Writer;Script] -> [<database>Primary;Storage]
[<database>Primary;Storage|songs.db] <- [letarette.sql|Document;Manager]
[letarette.sql] -- [<service>NATS]
[NATS] -- [letarette|
    [<database>Index]
]
`}</Nomnoml>
                    <Markdown>
                        Songs are randomly generated and inserted into the song
                        database.
                    </Markdown>
                    <Markdown>
                        The **letarette.sql** ***Document Manager*** replies to
                        requests from the index.
                    </Markdown>
                </Column>
                <Column>
                    <Nomnoml>{`
#direction: right
#gutter: 10
#.service: visual=ellipse bold

[<actor>Demo;Page] -> [API;Service|[Search;Agent]]
[API] -- [<service>NATS]
[NATS] -- [letarette|
    [<database>Index]
]
[API] -> [<database>Primary;Storage|songs.db]
`}</Nomnoml>
                    <Markdown>
                        A simple API service responds to requests by searching
                        the index and dressing up returned documents.
                    </Markdown>
                </Column>
            </SpaceList>
        </Centered>
    </Column>
);

export default Page;
