export interface DoctorTimeSlot {
  time: string;
  department_id: number;
  department_name: string;
}

export interface DoctorCardProps {
  id: number;
  name: string;
  family_name: string;
  first_name: string;
  patronymic_name: string;
  category: string;
  time: DoctorTimeSlot[];
  portrait: string;
}
