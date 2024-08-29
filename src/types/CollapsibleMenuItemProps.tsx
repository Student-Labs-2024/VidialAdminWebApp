import IMenuItem from './IMenuItem';

export default interface CollapsibleMenuItemProps {
  item: IMenuItem;
  index: number;
  currentPath: string;
}
