import { FunctionalComponent as FC, Fragment, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Centered, Column, SpaceList } from "../../components/preso";

const nnStyle = `
#direction: right
#gutter: 10
#.service: visual=ellipse bold
`;

const Page: FC = () => (
    <Column style={{ flexGrow: 1 }}>
        <Markdown>{`
### [apps](mdi) Load distribution + sharding
---
`}</Markdown>
        <Centered>
            <SpaceList>
                <Column>
                    The system can scale by adding more instances...
                    <Nomnoml>{`
${nnStyle}
[<abstract>Document;Manager]--[<service>NATS]
[<abstract>Search;Agent]--[<service>NATS]
[NATS]--[LR A|[<database>1/1]]
[NATS]--[LR B|[<database>1/1]]
`}</Nomnoml>
                </Column>
                <Column>
                    ...or by splitting the index into shards...
                    <Nomnoml>{`
${nnStyle}
[<abstract>Document;Manager]--[<service>NATS]
[<abstract>Search;Agent]--[<service>NATS]
[NATS]--[LR A|[<database>1/2]]
[NATS]--[LR B|[<database>2/2]]
`}</Nomnoml>
                </Column>
                <Column>
                    ...or both!
                    <Nomnoml>{`
${nnStyle}
[<abstract>Document;Manager]--[<service>NATS]
[<abstract>Search;Agent]--[<service>NATS]
[NATS]--[LR A|[<database>1/2]]
[NATS]--[LR B|[<database>2/2]]
[LR A]--[LR C|[<database>1/2]]
[LR B]--[LR D|[<database>2/2]]
`}</Nomnoml>
                </Column>
            </SpaceList>
        </Centered>
    </Column>
);

export default Page;
