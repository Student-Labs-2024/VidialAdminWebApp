import { instance } from 'api/helpers/axios';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';

export const getDoctors = async (options?: { signal?: AbortSignal }) => {
  const response = await instance.get<DoctorCardProps[]>(
    `/appointments/doctors`,
    {
      signal: options?.signal,
    },
  );

  return response.data;
};

export const addDoctorPhoto = async (
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
};

export const editDoctorPhoto = async (
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
};

export const deleteDoctorPhoto = async (
  id: number,
  options?: { signal?: AbortSignal },
) => {
  const response = await instance.delete<DoctorCardProps>(
    `/appointments/doctors/${id}`,
    {
      signal: options?.signal,
    },
  );

  return response.data;
};
