export interface IPage {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
  edit?: () => JSX.Element
}
