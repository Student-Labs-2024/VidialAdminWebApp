import { makeAutoObservable } from 'mobx';
import { toast, Slide } from 'react-toastify';

import api from 'api/index';
import DepartmentCardProps from 'types/Department/DepartmentCardProps';

class DepartmentStore {
  departments: DepartmentCardProps[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedDepartment: DepartmentCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadDepartments() {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await api.getDepartments();
      this.departments = data;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }

  async addDepartmentCoords(updatedDepartment: DepartmentCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const department = await api.addDepartmentsCoordinates(updatedDepartment);
      const index = this.departments.findIndex(
        (department) => department.id === updatedDepartment.id,
      );
      if (index !== -1) {
        this.departments[index] = department;
      }
      this.loadDepartments();
      toast.success('Координаты добавлены!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error(`Ошибка при добавлении коодинат`, {
        transition: Slide,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async editDepartmentCoords(updatedDepartment: DepartmentCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const department = await api.editDepartmentsCoordinates(
        updatedDepartment.id!,
        updatedDepartment,
      );
      this.loadDepartments();
      const index = this.departments.findIndex(
        (department) => department.id === updatedDepartment.id,
      );
      if (index !== -1) {
        this.departments[index] = department;
      }
      toast.success('Координаты изменены!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error(`Ошибка при изменении коодинат`, {
        transition: Slide,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async deleteDepartmentCoords(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      await api.deleteDepartmentsCoordinates(id);
      this.loadDepartments();
      toast.success('Координаты удалены!', { transition: Slide });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error('Не удалось удалить координаты!', { transition: Slide });
    } finally {
      this.isLoading = false;
    }
  }

  selectDepartment(selectedDepartment: DepartmentCardProps) {
    this.selectedDepartment = selectedDepartment;
  }

  clearSelectedDepartment() {
    this.selectedDepartment = null;
  }
}

const departmentStore = new DepartmentStore();
export default departmentStore;
