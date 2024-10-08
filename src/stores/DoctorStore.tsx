import { makeAutoObservable } from 'mobx';
import { toast, Slide } from 'react-toastify';

import api from 'api/index';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';

class DoctorStore {
  doctors: DoctorCardProps[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedDoctor: DoctorCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadDoctors(options?: { signal?: AbortSignal }) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await api.doctor.getDoctors(options);
      this.doctors = data;
    } catch (error) {
      if (error === 'AbortError') {
        console.log('Request aborted');
      } else {
        this.error = (error as Error).message;
      }
    } finally {
      this.isLoading = false;
    }
  }

  async addDoctorImg(updatedDoctor: DoctorCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const doctor = await api.doctor.addDoctorPhoto(updatedDoctor);
      const index = this.doctors.findIndex(
        (doctor) => doctor.id === updatedDoctor.id,
      );

      if (index !== -1) {
        this.doctors[index] = doctor;
      }

      this.loadDoctors();
      toast.success('Фото доктора добавлено!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error(`Ошибка при добавлении фото`, {
        transition: Slide,
      });
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  async editDoctorImg(updatedDoctor: DoctorCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const doctor = await api.doctor.editDoctorPhoto(
        updatedDoctor.id!,
        updatedDoctor,
      );
      this.loadDoctors();
      const index = this.doctors.findIndex(
        (doctor) => doctor.id === updatedDoctor.id,
      );

      if (index !== -1) {
        this.doctors[index] = doctor;
      }

      toast.success('Фото изменено!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error(`Ошибка при изменении фото`, {
        transition: Slide,
      });
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  async deleteDoctorImg(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      await api.doctor.deleteDoctorPhoto(id);
      this.loadDoctors();
      toast.success('Фото доктора удалено!', { transition: Slide });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error('Не удалось удалить фото!', { transition: Slide });
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
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
