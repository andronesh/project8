export type Section = {
  id: number;
  title: string;
  position: number;
  projectId: number;
};

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
  createdBy: string;

  type: IssueType;
  status: IssueStatus;
  title: string;
  description: string | null;

  // assignee uuid references auth.users,
  projectId: number;
  sectionId: number | null;
  sectionTitle: string | null;
  position: number;
  // parent_id: number;
};
