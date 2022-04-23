declare module "*.css" {
    const mapping: Record<string, string>;
    export default mapping;
}

declare module "*.md" {
    const md: string;
    export default md;
}

declare module "*.nomnoml" {
    const code: string;
    export default code;
}

declare module "micro-down";
