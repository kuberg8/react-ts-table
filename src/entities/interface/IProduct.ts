export interface IProduct {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  edit?: () => JSX.Element
}
