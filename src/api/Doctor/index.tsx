import DoctorCardProps from 'types/Department/DepartmentCardProps';
import { instance } from 'api/helpers/axios';

export const getDoctors = async () => {
    const response = await instance.get<DoctorCardProps[]>(
        `/appointments/doctors`,
    );

    return response.data;
};

export const addDoctorPhoto = async (
    doctor: DoctorCardProps,
) => {
    const response = await instance.post<DoctorCardProps>(
        `/appointments/doctors`,
        doctor,
    );

    return response.data;
};

export const editDoctorPhoto = async (
    id: number,
    doctor: DoctorCardProps,
) => {
    const response = await instance.put<DoctorCardProps>(
        `/appointments/doctors/${id}`,
        doctor,
    );

    return response.data;
};

export const deleteDoctorPhoto = async (id: number) => {
    const response = await instance.delete<DoctorCardProps>(
        `/appointments/doctors/${id}`,
    );

    return response.data;
};