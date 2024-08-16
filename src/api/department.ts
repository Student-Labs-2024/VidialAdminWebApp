import DepartmentCardProps from 'types/Department/DepartmentCardProps';
import { instance } from 'api/helpers/axios';

export const department = {
  getDepartments: async (options?: { signal?: AbortSignal }) => {
    const response = await instance.get<DepartmentCardProps[]>(
      `/appointments/departments`,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },

  addDepartmentCoordinates: async (department: DepartmentCardProps) => {
    const response = await instance.post<DepartmentCardProps>(
      `/appointments/departments`,
      department,
    );

    return response.data;
  },

  editDepartmentCoordinates: async (
    id: number,
    department: DepartmentCardProps,
  ) => {
    const response = await instance.put<DepartmentCardProps>(
      `/appointments/departments/${id}`,
      department,
    );

    return response.data;
  },

  deleteDepartmentCoordinates: async (id: number) => {
    const response = await instance.delete<DepartmentCardProps>(
      `/appointments/departments/${id}`,
    );

    return response.data;
  },
};
