-- Index update request
--
-- bound parameters:
--  afterDocument, fromTimeNanos, documentLimit
-- returns:
--  id, updatedNanos
--

with
documentState as (
	select
	    coalesce(max(id), 0) as afterID,
	    datetime(:fromTimeNanos / 1E9, 'unixepoch') as fromTimestamp
	from issues
	where id = :afterDocument
	and updated = fromTimestamp
)
select
	id, strftime('%s', updated) * cast(1E9 as int) as updatedNanos
from
	issues join documentState
where
    (updated = fromTimestamp and id > afterID)
	or updated > fromTimestamp
order by
	updated, id
limit :documentLimit
