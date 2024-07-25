export default interface PromoCardInfoProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
  id: number;
  img: string;
  title: string;
  fullDescription: string;
  startDate: Date;
  endDate: Date;
}
