import PromoDataCardProps from './PromoDataCardProps';

export default interface PromoCardInfoProps extends PromoDataCardProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}
