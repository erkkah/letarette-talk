-- Document update request
--
-- bound arguments:
--  wantedIDs to be used in an "in" statement
-- returns:
--  id, updatedNanos, title, txt, alive

select
    id,
    strftime('%s', updated) * cast(1e9 as int) as updatedNanos,
    title,
    text as txt,
    1 as alive
from
    issues
where
    id in (:wantedIDs)
