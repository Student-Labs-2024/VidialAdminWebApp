import DepartmentCardProps from 'types/Department/DepartmentCardProps';
import { instance } from 'api/helpers/axios';

export const getDepartments = async () => {
  const response = await instance.get<DepartmentCardProps[]>(
    `/appointments/departments`,
  );

  return response.data;
};

export const addDepartmentsCoordinates = async (
  department: DepartmentCardProps,
) => {
  const response = await instance.post<DepartmentCardProps>(
    `/appointments/departments`,
    department,
  );

  return response.data;
};

export const editDepartmentsCoordinates = async (
  id: number,
  department: DepartmentCardProps,
) => {
  const response = await instance.put<DepartmentCardProps>(
    `/appointments/departments/${id}`,
    department,
  );

  return response.data;
};

export const deleteDepartmentsCoordinates = async (id: number) => {
  const response = await instance.delete<DepartmentCardProps>(
    `/appointments/departments/${id}`,
  );

  return response.data;
};
