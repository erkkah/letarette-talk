import { FunctionalComponent as FC, h, Fragment } from "preact";
import { useRef, useState } from "preact/hooks";
import { Centered, Column, Row } from "../../components/preso";

import { IssueClient } from "../../api";
import { SearchHit, SearchResponse } from "@letarette/client";
import Markdown from "../../components/markdown";

import style from "./style.css";
import { Issue } from "../../../bugflow/issuedb";

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
            <input type="text" ref={textInput} size={50} />
        </form>
    );
};

interface SearchHitButtonProps {
    hit: SearchHit;
    action(hit: SearchHit): void;
}

const SearchHitButton: FC<SearchHitButtonProps> = (props) => {
    const onClick: h.JSX.MouseEventHandler<HTMLButtonElement> = (_) => {
        props.action(props.hit);
    };

    return (
        <div>
            <button onClick={onClick}>{props.hit.Snippet}</button>
        </div>
    );
};

interface SearchResultProps {
    response: SearchResponse;
    issueClient: IssueClient;
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

    const text = props.children?.toString() ?? "";
    return (
        <Column>
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

const SearchResult: FC<SearchResultProps> = (props) => {
    const [issue, setIssue] = useState<Issue | undefined>();

    const onAction: SearchHitButtonProps["action"] = async (hit) => {
        const issue = await props.issueClient.get(Number(hit.ID));
        setIssue(issue);
    };

    return (
        <Column>
            {props.response.Result.Hits.map((hit) => (
                <SearchHitButton hit={hit} action={onAction} />
            ))}
            Search performed in {props.response.Duration.toPrecision(3)}s.
            Status: {statusToText(props.response.Status)}.
            <Row>{issue?.title}</Row>
            <Column>
                <TextBox>{issue?.text}</TextBox>
            </Column>
        </Column>
    );
};

type SearchStatus = "IDLE" | "SEARCHING" | "ERROR";

interface SearchState {
    query: string;
    pageOffset: number;
    pageLimit: number;
    status: SearchStatus;
}

interface SearchProps {
    issueClient: IssueClient;
}

const Search: FC<SearchProps> = (props) => {
    const [state, setState] = useState<SearchState>({
        query: "",
        pageOffset: 0,
        pageLimit: 25,
        status: "IDLE",
    });

    const [response, setResponse] = useState<SearchResponse | undefined>();

    const setStatus = (status: SearchStatus) =>
        setState((state) => ({
            ...state,
            status,
        }));

    const onSubmit = async (text: string) => {
        try {
            setStatus("SEARCHING");
            const result = await props.issueClient.search(text);
            setResponse(result);
            setStatus("IDLE");
        } catch (err) {
            setStatus("ERROR");
        }
    };

    
    return (
        <Column>
            <Markdown>### Search Issues:</Markdown>
            <Row>
                <SearchBox onSubmit={onSubmit} />
                <div>{state.status}</div>
            </Row>
            {response && (
                <SearchResult
                    issueClient={props.issueClient}
                    response={response}
                />
            )}
        </Column>
    );
    
};

export default Search;
