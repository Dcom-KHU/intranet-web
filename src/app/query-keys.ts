export const queryKeys = {
  home: ["home-dashboard"] as const,
  notices: {
    all: ["notices"] as const,
    list: (page: number, size: number, keyword: string) =>
      ["notices", "list", page, size, keyword] as const,
    detail: (id: number) => ["notices", "detail", id] as const,
  },
  gallery: {
    all: ["gallery"] as const,
    lists: ["gallery", "list"] as const,
    list: (page: number, size: number, keyword: string) =>
      ["gallery", "list", page, size, keyword] as const,
    detail: (id: number) => ["gallery", "detail", id] as const,
  },
  examArchives: {
    all: ["exam-archives"] as const,
    list: (page: number, size: number) =>
      ["exam-archives", "list", page, size] as const,
    search: (keyword: string, page: number, size: number) =>
      ["exam-archives", "search", keyword, page, size] as const,
    detail: (id: number) => ["exam-archives", "detail", id] as const,
  },
  infoPosts: {
    all: ["info-posts"] as const,
    list: (page: number, size: number, keyword: string) =>
      ["info-posts", "list", page, size, keyword] as const,
    detail: (id: number) => ["info-posts", "detail", id] as const,
  },
  comments: (target: string, postId: number) =>
    ["comments", target, postId] as const,
  manage: {
    all: ["manage"] as const,
    dashboard: ["manage", "dashboard"] as const,
    users: (page: number, size: number, keyword: string, sort: string) =>
      ["manage", "users", page, size, keyword, sort] as const,
    pending: (page: number, size: number) =>
      ["manage", "pending", page, size] as const,
    userDetail: (id: number | null) => ["manage", "user", id] as const,
  },
  myActivity: {
    posts: (page: number, size: number) =>
      ["my-activity", "posts", page, size] as const,
    comments: (page: number, size: number) =>
      ["my-activity", "comments", page, size] as const,
  },
};
