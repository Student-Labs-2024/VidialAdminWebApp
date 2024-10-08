import { instance } from 'api/helpers/axios';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';

export const doctor = {
  getDoctors: async (options?: { signal?: AbortSignal }) => {
    const response = await instance.get<DoctorCardProps[]>(
      `/appointments/doctors`,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },

  addDoctorPhoto: async (
    doctor: DoctorCardProps,
    options?: { signal?: AbortSignal },
  ) => {
    const response = await instance.post<DoctorCardProps>(
      `/appointments/doctors`,
      doctor,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },

  editDoctorPhoto: async (
    id: number,
    doctor: DoctorCardProps,
    options?: { signal?: AbortSignal },
  ) => {
    const response = await instance.put<DoctorCardProps>(
      `/appointments/doctors/${id}`,
      doctor,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },

  deleteDoctorPhoto: async (id: number, options?: { signal?: AbortSignal }) => {
    const response = await instance.delete<DoctorCardProps>(
      `/appointments/doctors/${id}`,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },
};
