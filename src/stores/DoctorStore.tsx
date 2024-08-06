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
          time: [
            {
              time: '2024-08-07T09:00:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-07T10:30:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
          ],
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
          time: [
            {
              time: '2024-08-08T08:00:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-08T11:00:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
          ],
        },
        {
          id: 2,
          first_name: 'Ольга',
          family_name: 'Артюхова',
          patronymic_name: 'Юрьевна',
          name: 'Артюхова Ольга Юрьевна',
          category: 'врач-офтальмолог',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/iblock/207/488_473_2/2079be32c0b38c776cf09890e140e716.png',
          time: [
            {
              time: '2024-08-09T07:30:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-09T12:00:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
          ],
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
          time: [
            {
              time: '2024-08-10T09:15:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-10T13:00:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
          ],
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
          time: [
            {
              time: '2024-08-11T08:45:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-11T10:30:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
          ],
        },
        {
          id: 5,
          first_name: 'Татьяна',
          family_name: 'Полтавец',
          patronymic_name: 'Геннадьевна',
          name: 'Полтавец Татьяна Геннадьевна',
          category: 'оптометрист',
          portrait:
            'https://www.vidial.ru/upload/resize_cache/iblock/89e/488_473_2/89e2dde8cc2a5fe3b3c1a8bd3ff6e6ab.png',
          time: [
            {
              time: '2024-08-12T09:00:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-12T11:15:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
            {
              time: '2024-08-13T08:00:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
            {
              time: '2024-08-13T10:00:00.000Z',
              department_id: 2,
              department_name: 'Нейрология',
            },
            {
              time: '2024-08-13T11:45:00.000Z',
              department_id: 1,
              department_name: 'Кардиология',
            },
          ],
        },
      ];
      this.doctors = data;
      this.saveDoctors();
    }
  }

  saveDoctors() {
    localStorage.setItem('doctors', JSON.stringify(this.doctors));
  }

  addDoctor(doctor: DoctorCardProps) {
    this.doctors.push(doctor);
    this.saveDoctors();
  }

  editPromo(updatedDoctor: DoctorCardProps) {
    const index = this.doctors.findIndex(
      (doctor) => doctor.id === updatedDoctor.id,
    );

    if (index !== -1) {
      this.doctors[index] = updatedDoctor;
      this.saveDoctors();
    }
  }

  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
    this.saveDoctors();
  }

  getDoctorById(id: number): DoctorCardProps | undefined {
    return this.doctors.find((doctor) => doctor.id === id);
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
