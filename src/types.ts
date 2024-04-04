export enum IssueType {
  TASK = "TASK",
  IDEA = "IDEA",
  STORY = "STORY",
  BUG = "BUG",
  CONCERN = "CONCERN",
}

export enum IssueStatus {
  CREATED = "CREATED",
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  DONE = "DONE",
  CLOSED = "CLOSED",
}

export type Issue = {
  id: number;
  // created_at timestamp with time zone default now(),
  // updated_at timestamp with time zone,
  created_by: string;

  type: IssueType;
  status: IssueStatus;
  title: string;
  description: string | null;

  // assignee uuid references auth.users,
  project_id: number;
  // parent_id: number;
};
