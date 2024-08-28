export interface BadgeProps {
  type:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "indigo"
    | "pink";
  dot?: boolean;
  border?: boolean;
}
