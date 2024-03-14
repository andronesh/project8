export enum IssueType {
  TASK,
  IDEA,
  STORY,
  BUG,
  CONCERN,
}

export enum IssueStatus {
  CREATED,
  STARTED,
  PAUSED,
  DONE,
  CLOSED,
}

export type Issue = {
  id: number;
  // created_at timestamp with time zone default now(),
  // updated_at timestamp with time zone,
  created_by: string;

  type: IssueType;
  status: IssueStatus;
  title: string;
  description: string;

  // assignee uuid references auth.users,
  project_id: number;
  parent_id: number;
};
