const BlogStatus = {
    Draft: "draft",
    Published: "published",
} as const;

export type BlogStatus = typeof BlogStatus[keyof typeof BlogStatus];
export default BlogStatus;
