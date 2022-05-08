import { FunctionalComponent as FC, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Boxed, Centered, Column } from "../../components/preso";

const Page: FC = () => (
    <Centered>
        <Column>
        <Markdown>### Letarette documents</Markdown>
            <Nomnoml>{`
#title: Letarette Document
#direction: right

[Document|
ID
title
text
updated
alive
]
[Space|
name
]
[Document]*<-[Space]
[Space]1.. <-[<database>Index]
`}</Nomnoml>
<Markdown>{`
Documents in Letarette are stored in named spaces in the index, within which document IDs are unique.

There are only two indexable fields, **title** and **text**.
The document **ID** is user defined.
`}</Markdown>
        </Column>
    </Centered>
);

export default Page;
