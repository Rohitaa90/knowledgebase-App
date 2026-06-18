// TODO: Add shared types as features are built

export type ContentType = "blog" | "caption" | "email";

export interface Generation {
  id: string;
  type: ContentType;
  prompt: string;
  output: string;
  createdAt: string;
}
