import { FunctionalComponent as FC, Fragment, h } from "preact";
import Markdown from "../../components/markdown";
import Nomnoml from "../../components/nomnoml";
import { Centered, Column, SpaceList } from "../../components/preso";

const fence = "```";

const Page: FC = () => (
    <Column style={{flexGrow: 1}}>
        <Markdown>{`
## Demo
---
### Setup
`}</Markdown>
        <Centered>
            <SpaceList>
                <Markdown>{`
Start a **NATS** server:
${fence}console
$ nats-server
${fence}

Start a **letarette** instance:
${fence}console
$ letarette
${fence}

Start the **letarette.sql** document manager:
${fence}console
$ export LRSQL_DB_DRIVER=sqlite3
$ export LRSQL_DB_CONNECTION=songs.db?mode=ro
$ lrsql
${fence}

The SQL document manager requires two queries,
by default loaded from *"indexrequest.sql"* and *"documentrequest.sql"*.

                `}</Markdown>
                <Markdown>{`
*indexrequest.sql*
${fence}sql
with
documentState as (
    select
        coalesce(max(id), 0) as afterID,
        datetime(:fromTimeNanos / 1E9, 'unixepoch') as fromTimestamp
    from songs
    where id = :afterDocument
    and updated = fromTimestamp
)
select
    id, strftime('%s', updated) * cast(1E9 as int) as updatedNanos
from
    songs join documentState
where
    (updated = fromTimestamp and id > afterID)
    or updated > fromTimestamp
order by
    updated, id
limit :documentLimit
${fence}
                `}</Markdown>
                <Markdown>{`
*documentrequest.sql*
${fence}sql
select
    id,
    strftime('%s', updated) * cast(1e9 as int) as updatedNanos,
    title,
    text as txt,
    1 as alive
from
    songs
where
    id in (:wantedIDs)
${fence}
                `}</Markdown>
                <Markdown>{`

${fence}typescript
// Connect to the search cluster
const agent = new SearchAgent(["nats://localhost:4222"]);
await agent.connect();

// Search
const result = await agent.search(
    query,
    ["docs"],
    pageLimit,
    pageOffset
);

// Have fun with the result
${fence}
                `}</Markdown>
            </SpaceList>
        </Centered>
    </Column>
);

export default Page;
