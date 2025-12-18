const BlogStatus = {
    Draft: "Draft",
    Published: "Published",
} as const;

export type BlogStatus = typeof BlogStatus[keyof typeof BlogStatus];
export default BlogStatus;
