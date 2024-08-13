import { makeAutoObservable } from 'mobx';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';

class DoctorStore {
  doctors: DoctorCardProps[] = [];
  selectedDoctor: DoctorCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadDoctors() {
    const storedDoctors = localStorage.getItem('doctors');

    if (storedDoctors) {
      this.doctors = JSON.parse(storedDoctors);
    } else {
      const data: DoctorCardProps[] = [
        {
          id: 0,
          first_name: 'Елена',
          family_name: 'Чистякова',
          patronymic_name: 'Алексеевна',
          name: 'Чистякова Елена Алексеевна',
          category: 'врач-офтальмолог',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/iblock/857/230_250_2/85785b7c6205cf6b45e5a8273e08075c.png',
          time: [],
        },
        {
          id: 1,
          first_name: 'Татьяна',
          family_name: 'Харченко',
          patronymic_name: 'Николаевна',
          name: 'Харченко Татьяна Николаевна',
          category: 'врач-офтальмолог',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/iblock/bad/488_473_2/bad2578dea9ae7683b4442c1a3be659e.png',
          time: [],
        },
        {
          id: 2,
          first_name: 'Ольга',
          family_name: 'Артюхова',
          patronymic_name: 'Юрьевна',
          name: 'Артюхова Ольга Юрьевна',
          category: 'врач-офтальмолог',
          portrait: '',
          time: [],
        },
        {
          id: 3,
          first_name: 'Яна',
          family_name: 'Тарасова',
          patronymic_name: 'Сергеевна',
          name: 'Тарасова Яна Сергеевна',
          category: 'оптометрист',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/iblock/351/488_473_2/351af44691b9b3048f006bc4ff3d6260.png',
          time: [],
        },
        {
          id: 4,
          first_name: 'Ирина',
          family_name: 'Галочкина',
          patronymic_name: 'Михайловна',
          name: 'Галочкина Ирина Михайловна',
          category: 'оптометрист',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/webp/upload/resize_cache/iblock/259/488_473_2/259ad70703410612d086fe5d7b4ae398.jpeg.webp',
          time: [],
        },
        {
          id: 5,
          first_name: 'Татьяна',
          family_name: 'Полтавец',
          patronymic_name: 'Геннадьевна',
          name: 'Полтавец Татьяна Геннадьевна',
          category: 'оптометрист',
          portrait: '',
          time: [],
        },
      ];
      this.doctors = data;
      this.saveDoctors();
    }
  }

  saveDoctors() {
    localStorage.setItem('doctors', JSON.stringify(this.doctors));
  }

  editDoctor(updatedDoctor: DoctorCardProps) {
    const index = this.doctors.findIndex(
      (doctor) => doctor.id === updatedDoctor.id,
    );

    if (index !== -1) {
      this.doctors[index] = updatedDoctor;
      this.saveDoctors();
    }
  }

  deleteDoctorPhoto(id: number) {
    const doctor = this.doctors.find((doctor) => doctor.id === id);
    if (doctor) {
      doctor.portrait = '';
      this.saveDoctors();
    }
  }

  selectDoctor(selectedDoctor: DoctorCardProps) {
    this.selectedDoctor = selectedDoctor;
  }

  clearSelectedDoctor() {
    this.selectedDoctor = null;
  }
}

const doctorStore = new DoctorStore();
export default doctorStore;
