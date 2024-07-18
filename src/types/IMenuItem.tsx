export default interface IMenuItem {
  text: JSX.Element;
  icon: JSX.Element;
  path?: string;
  children?: IMenuItem[];
}
