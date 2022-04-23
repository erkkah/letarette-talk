from ast import AST
import json
from os import environ
from sys import argv
from typing import List
from github import Github
import mistletoe
from mistletoe.ast_renderer import ASTRenderer

def main():
    token = environ["GITHUB_TOKEN"]
    g = Github(token)
    repo = g.get_repo("elastic/elasticsearch")
    issues = repo.get_issues(state="all")

    start = 0
    count = 5000

    if len(argv) > 1:
        start = int(argv[1])

    if len(argv) > 2:
        count = int(argv[2])

    end = start + count

    num_issues = issues.totalCount

    for issue in issues[start:end]:
        if not issue.body:
            continue
        body = mistletoe.markdown(issue.body, ASTRenderer)
        body_dict = json.loads(body)
        text = extract_text(body_dict)
        issue = json.dumps({
            "id": issue.id,
            "title": issue.title,
            "text": text,
            "pr": True if issue.pull_request else False,
        })
        print(issue)

def extract_text(body: dict):
    type = body["type"]
    suffix = ""

    if type == "RawText":
        return body["content"]

    if type == "CodeFence" or type == "List" or type == "Heading":
        return None
    if type == "LineBreak":
        suffix = "\n"
    if type == "Paragraph":
        suffix = "\n\n"

    if "children" in body:
        children: List[object] = body["children"]
        content = "".join(
            [
                text
                for text in [extract_text(child) for child in children]
                if text is not None
            ]
        )
        return content + suffix

    return None

main()
