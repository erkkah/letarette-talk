### [manage_search](mdi:24) The index
---
#### Documents in **Primary Storage**, *forward* - indexed:
|- ID -|- Text -|
| 1 | Rikki Don't Lose That Number |
| 2 | Don't Take Me Alive |
| 3 | Daddy Don't Live in That New York City No More |



#### The *inverted* index:
|- Word -|- Docs -|
| Rikki | 1 |
| Don't | 1, 2, 3 |
| Lose | 1 |
| That | 1, 3 |
| Number | 1 |
| Take | 2 |
| ... | ... |

---

In addition to the document ID, the inverted index stores the location of each hit and other information to perform nearness checks, et.c.