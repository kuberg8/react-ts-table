export interface IPricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
  edit?: () => JSX.Element
}
