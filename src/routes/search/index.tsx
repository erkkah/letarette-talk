import { FunctionalComponent as FC, h, Fragment } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { Column, Row } from "../../components/preso";

import { SongClient, SongClientContext, SongResult } from "../../api";
import { SearchHit } from "@letarette/client";
import Markdown from "../../components/markdown";

import style from "./style.css";
import { Song } from "../../../demo/songs/songdb";
import { sciPrefix } from "./format";
import pages from "../md/pages";

interface SearchBoxProps {
    onSubmit(input: string): void;
}

const SearchBox: FC<SearchBoxProps> = (props) => {
    const textInput = useRef<HTMLInputElement>(null);

    const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = (event) => {
        const text = textInput.current?.value ?? "";
        props.onSubmit(text);
        event.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                ref={textInput}
                size={50}
                style={{ marginBottom: "1em", fontSize: "large"}}
            />
        </form>
    );
};

interface SearchHitButtonProps {
    hit: SearchHit;
    action(hit: SearchHit): void;
}

const SearchHitButton: FC<SearchHitButtonProps> = (props) => {
    const [title, setTitle] = useState<string | undefined>();

    const onClick: h.JSX.MouseEventHandler<HTMLButtonElement> = (_) => {
        props.action(props.hit);
    };

    const songClient = useContext(SongClientContext);

    useEffect(() => {
        songClient
            ?.get(Number(props.hit.ID))
            ?.then((result) => {
                setTitle(result.title);
            })
            .catch((err) => {
                console.log(`Failed to fetch song: ${err}`);
            });
    }, [props.hit]);

    const buttonStyle: h.JSX.CSSProperties = {
        fontSize: "large",
        textAlign: "left",
        borderTop: "0.5px dashed gray",
    };

    const snippetStyle: h.JSX.CSSProperties = {
        fontStyle: "italic",
        fontSize: "smaller",
        textAlign: "right",
    };

    return (
        <Column style={{ alignContent: "start" }}>
            <button style={buttonStyle} onClick={onClick}>
                {title ?? title}
            </button>
            <div style={snippetStyle}>{props.hit.Snippet}</div>
        </Column>
    );
};

interface SearchResultProps {
    result: SongResult;
    page: number;
    hasNext: boolean;
    onNext: () => void;
}

enum SearchStatusCode {
    NoHit = 42,
    CacheHit = 43,
    IndexHit = 44,
    Timeout = 45,
    QueryError = 46,
    ServerError = 47,
}

function statusToText(status: SearchStatusCode): string {
    switch (status) {
        case SearchStatusCode.IndexHit:
            return "found in index";
        case SearchStatusCode.CacheHit:
            return "found in cache";
        case SearchStatusCode.NoHit:
            return "no hit";
        case SearchStatusCode.QueryError:
            return "query syntax error";
        case SearchStatusCode.ServerError:
            return "search server error";
        case SearchStatusCode.Timeout:
            return "timeout";
    }
}

const TextBox: FC = (props) => {
    const boxStyle: h.JSX.CSSProperties = {
        overflow: "auto",
        height: "50vh",
        padding: "4px",
        fontSize: "small",
    };

    const text = props.children?.toString() ?? "";
    return (
        <Column style={boxStyle}>
            <div class={style.textbox}>
                {text.split("\n\n").map((para) => (
                    <p>
                        {para.split("\n").map((line) => (
                            <>
                                <span>{line}</span>
                                <br />
                            </>
                        ))}
                    </p>
                ))}
            </div>
        </Column>
    );
};

const SearchStatus: FC<{
    page: number;
    response: SearchResultProps["result"]["response"];
}> = (props) => {
    const { response } = props;

    const style: h.JSX.CSSProperties = {
        marginTop: "8px",
        marginBottom: "8px",
        padding: "2px",
        border: "1px solid black",
        fontSize: "small",
    };

    return (
        <Column style={style}>
            {response.Result.Hits.length ? (
                <>
                    <Row>Page {props.page}.</Row>
                    <Row>
                        {response.Result.TotalHits} total hits.
                        {response.Result.Capped && " (Capped)"}
                    </Row>
                </>
            ) : (
                ""
            )}
            <Row>Search performed in {sciPrefix(response.Duration)}s.</Row>
            <Row>Status:{` ${statusToText(response.Status)}`}.</Row>
            <Row>
                {response.Result.Respelt &&
                    `Did you mean "${response.Result.Respelt}" ?`}
            </Row>
        </Column>
    );
};

const SearchResult: FC<SearchResultProps> = (props) => {
    const [song, setSong] = useState<Song | undefined>();
    const songClient = useContext(SongClientContext);

    const onAction: SearchHitButtonProps["action"] = async (hit) => {
        const song = await songClient?.get(Number(hit.ID));
        setSong(song);
    };

    const response = props.result.response;

    useEffect(() => {
        setSong(undefined);
    }, [props.result]);

    const titleStyle: h.JSX.CSSProperties = {
        fontWeight: "bold",
    };

    const moreStyle: h.JSX.CSSProperties = {
        textAlign: "right",
        margin: "4px",
        border: "0.5px solid var(--c0)",
    };

    return (
        <Row style={{ justifyContent: "space-between", flexGrow: 1 }}>
            <Column
                style={{
                    paddingTop: "8px",
                    marginRight: "1em",
                    flexGrow: 1,
                    width: "50%",
                    justifyContent: "space-between",
                }}
            >
                <Column>
                    {response.Result.Hits.map((hit) => (
                        <SearchHitButton hit={hit} action={onAction} />
                    ))}
                    <Row style={{ justifyContent: "end", paddingTop: "1em" }}>
                        {props.hasNext && (
                            <button style={moreStyle} onClick={props.onNext}>
                                More
                            </button>
                        )}
                    </Row>
                </Column>
                <SearchStatus response={response} page={props.page} />
            </Column>
            <Column
                style={{
                    flexGrow: 1,
                    width: "50%",
                    borderLeft: "0.5px solid gray",
                    paddingLeft: "1em",
                }}
            >
                <Row style={titleStyle}>{song?.title}</Row>
                <TextBox>{song?.text}</TextBox>
            </Column>
        </Row>
    );
};

type SearchStatus = "IDLE" | "SEARCHING" | "ERROR";

interface SearchState {
    request: {
        query: string;
        pageOffset: number;
        pageLimit: number;
    };
    status: SearchStatus;
}

interface SearchProps {}

const Search: FC<SearchProps> = (props) => {
    const [state, setState] = useState<SearchState>({
        request: {
            query: "",
            pageOffset: 0,
            pageLimit: 6,
        },
        status: "IDLE",
    });

    const [response, setResponse] = useState<SongResult | undefined>();

    const setStatus = (status: SearchStatus) =>
        setState((state) => ({
            ...state,
            status,
        }));

    const songClient = useContext(SongClientContext);

    const onSubmit = async (text: string) => {
        setState((state) => ({
            ...state,
            request: {
                ...state.request,
                query: text,
                pageOffset: 0,
            },
        }));
    };

    useEffect(() => {
        const req = state.request;
        if (req.query.length === 0) {
            return;
        }

        setStatus("SEARCHING");
        const result = songClient
            ?.search(req.query, req.pageLimit, req.pageOffset)
            .then((result) => {
                setResponse(result);
                setStatus("IDLE");
            })
            .catch(() => setStatus("ERROR"));
    }, [state.request]);

    const pageSize = response?.response.Result.Hits.length ?? 0;
    const endPosition = response?.response.Result.TotalHits ?? 0;
    const position =
        state.request.pageOffset * state.request.pageLimit + pageSize;
    const hasNext = position < endPosition;

    const onNext = () => {
        setState((prev) => ({
            ...prev,
            request: {
                ...prev.request,
                pageOffset: prev.request.pageOffset + 1,
            },
        }));
    };

    let statusIcon = "search";
    switch (state.status) {
        case "ERROR":
            statusIcon = "error";
            break;
        case "SEARCHING":
            statusIcon = "pending";
            break;
        case "IDLE":
            statusIcon = "search";
            break;
    }
    const status = (
        <a tabIndex={-1} href="mdi:mid:24">
            {statusIcon}
        </a>
    );

    return (
        <Column style={{ flexGrow: 1 }}>
            <Markdown>{`
### Steely Spam song search
---
            `}</Markdown>
            <Row style={{justifyContent:"center"}}>
                <SearchBox onSubmit={onSubmit} />
                {status}
            </Row>
            {response && (
                <SearchResult
                    result={response}
                    page={state.request.pageOffset + 1}
                    hasNext={hasNext}
                    onNext={onNext}
                />
            )}
        </Column>
    );
};

const SearchWithClient: FC = () => {
    const songClient = new SongClient("http://localhost:3000");

    return (
        <SongClientContext.Provider value={songClient}>
            <Search />
        </SongClientContext.Provider>
    );
};

export default SearchWithClient;
