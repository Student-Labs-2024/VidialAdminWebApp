import { DoctorCardProps } from './DoctorCardProps';

export default interface DoctorCardInfoProps extends DoctorCardProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}
