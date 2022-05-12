import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered, Column } from "../../components/preso";

const Page: FC = () => (
    <Column style={{ flexGrow: 1 }}>
        <Markdown>{`
### [description](mdi) Letarette documents
---
`}</Markdown>
        <Centered>
            <Column>
                <Nomnoml>{`
#direction: right

[Document|
ID
title
text
updated
]
[Space|
name
]
[Document]*<-[Space]
[Space]1.. <-[<database>Index]
`}</Nomnoml>
                <Markdown>{`
Documents in Letarette are stored in named spaces in the index.

There are only two indexable fields, **title** and **text**.
The document **ID** is user defined.
`}</Markdown>
            </Column>
        </Centered>
    </Column>
);

export default Page;
