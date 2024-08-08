import { makeAutoObservable } from 'mobx';
import DepartmentCardProps from 'types/Department/DepartmentCardProps';

class DepartmentStore {
  departments: DepartmentCardProps[] = [];
  selectedDepartment: DepartmentCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadDepartments() {
    const storedDepartments = localStorage.getItem('departments');

    if (storedDepartments) {
      this.departments = JSON.parse(storedDepartments);
    } else {
      const data: DepartmentCardProps[] = [
        {
          id: 0,
          name: 'Филиал № 1',
          city: 'Omsk',
          address: 'ТЦ Suncity, 70 лет Октября, 7',
          tel: '8 (3812) 20-20-44',
          latitude: '54.985343',
          longitude: '73.310846',
        },
        {
          id: 1,
          name: 'Филиал № 2',
          city: 'Omsk',
          address: 'Авиагородок, 38',
          tel: '8 (3812) 552-652',
          latitude: '54.950598',
          longitude: '73.328533',
        },
        {
          id: 2,
          name: 'Филиал № 3',
          city: 'Omsk',
          address: 'Лермонтова, 20',
          tel: '8 (3812) 511-8 (3812) 511-400400',
          latitude: '',
          longitude: '',
        },
        {
          id: 3,
          name: 'Филиал № 4',
          city: 'Omsk',
          address: 'Кирова, 7/1',
          tel: '8 (3812) 466-071',
          latitude: '54.981588',
          longitude: '73.381615',
        },
        {
          id: 4,
          name: 'Филиал № 5',
          city: 'Omsk',
          address: 'Лобкова, 3',
          tel: '8 (3812) 41-77-58',
          latitude: '',
          longitude: '',
        },
        {
          id: 5,
          name: 'Филиал № 6',
          city: 'Omsk',
          address: 'Мира, 62',
          tel: '8 (3812) 20-10-20',
          latitude: '55.029379',
          longitude: '73.275066',
        },
        {
          id: 6,
          name: 'Филиал № 7',
          city: 'Omsk',
          address: 'Маркса, 39',
          tel: '8 (3812) 20-20-33',
          latitude: '',
          longitude: '',
        },
        {
          id: 7,
          name: 'Филиал № 8',
          city: 'Omsk',
          address: 'Путилова, 3В',
          tel: '8 (3812) 957-100',
          latitude: '54.993345',
          longitude: '73.282315',
        },
      ];
      this.departments = data;
      this.saveDepartments();
    }
  }

  saveDepartments() {
    localStorage.setItem('departments', JSON.stringify(this.departments));
  }

  editDepartment(updatedDepartment: DepartmentCardProps) {
    const index = this.departments.findIndex(
      (department) => department.id === updatedDepartment.id,
    );

    if (index !== -1) {
      this.departments[index] = updatedDepartment;
      this.saveDepartments();
    }
  }

  deleteDepartmentCoordinates(id: number) {
    const department = this.departments.find(
      (department) => department.id === id,
    );
    if (department) {
      department.latitude = '';
      department.longitude = '';
      this.saveDepartments();
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
