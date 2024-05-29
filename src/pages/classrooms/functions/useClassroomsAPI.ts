import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/UseContext";
import { IClassroom } from "../../../types";


const useClassroomsAPI = () => {
    const { setClassrooms, setOpenModal } = useContext(Context);

    const getClassrooms = async () => {
        const data = {
            query: `query {
                        getClassrooms {
                            message
                            classrooms {
                                id
                                roomNumber
                                roomName
                                schoolYear
                                teacherName
                            }
                        }
                    }`
        };

        const config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        await axios(config).then((result) => {
            if (result.data.data.getClassrooms.message) {
                setClassrooms(result.data.data.getClassrooms.classrooms);
            }
            console.log(result.data.data.getClassrooms.message);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getClassroomById = async (id: number) => {
        const data = {
            query: `query {
                getClassroomById(id: ${id}) {
                    message
                    classrooms {
                        id
                        roomNumber
                        roomName
                        schoolYear
                        teacherName
                    }
                }
            }`
        };

        const config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        let responseResult = {}
        await axios(config).then((result) => {
            if (result.data.data.getClassroomById.message) {
                console.log(result.data.data.getClassroomById.classrooms[0]);
                responseResult = (result.data.data.getClassroomById.classrooms[0]);
            } else {
                console.log(result.data.data.getClassroomById.message);
                responseResult = {};
            }
        }).catch((error) => {
            console.log(error);
            responseResult = {};
        });

        return responseResult;
    };

    const createClassroom = async (e: React.FormEvent, classroom: IClassroom) => {
        e.preventDefault();
        if (!classroom.roomNumber || !classroom.roomName || !classroom.schoolYear || !classroom.teacherName) {
            console.log(classroom)
            alert('Please fill in all fields');
            return;
        }

        let data = {
            query: `mutation {
            createClassroom(
                createClassroomInput: {
                    roomNumber: "${classroom.roomNumber}"
                    roomName: "${classroom.roomName}"
                    schoolYear: "${classroom.schoolYear}"
                    teacherName: "${classroom.teacherName}"
                }
            ) {
                message
                classrooms {
                    id
                    roomNumber
                    roomName
                    schoolYear
                    teacherName
                }
            }
        }`
        }

        let config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        await axios(config).then(async (result) => {
            if (result.data.data.createClassroom.message) {
                getClassrooms();
                alert(result.data.data.createClassroom.message);
                setOpenModal(false);
            }
            console.log(result.data.data.createClassroom.message)
        }).catch((error) => {
            console.log(error)
            alert('An error occurred while submitting the form');
            setOpenModal(true);
        });
    };

    const updateClassroom = async (e: React.FormEvent, id: number, classroom: IClassroom) => {
        e.preventDefault();
        if (!classroom.roomNumber || !classroom.roomName || !classroom.schoolYear || !classroom.teacherName) {
            console.log(classroom)
            alert('Please fill in all fields');
            return;
        }

        let data = {
            query: `mutation {
                        updateClassroom(
                            id: ${id},
                            updateClassroomInput: {
                                roomNumber: "${classroom.roomNumber}"
                                roomName: "${classroom.roomName}"
                                schoolYear: "${classroom.schoolYear}"
                                teacherName: "${classroom.teacherName}"
                            }
                        ) {
                            message
                            classrooms {
                                id
                                roomNumber
                                roomName
                                schoolYear
                                teacherName
                            }
                        }
                    }`
        }

        let config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        await axios(config).then(async (result) => {
            if (result.data.data.updateClassroom.message) {
                getClassrooms();
                alert(result.data.data.updateClassroom.message);
                setOpenModal(false);
            }
            console.log(result.data.data.updateClassroom.message)
        }).catch((error) => {
            console.log(error)
            alert('An error occurred while submitting the form');
            setOpenModal(true);
        });
    }

    const deleteClassroom = async (id: number) => {
        let data = {
            query: `mutation {
                deleteClassroom(id: ${id}) {
                    message
                    classrooms {
                        id
                        roomNumber
                        roomName
                        schoolYear
                        teacherName
                    }
                }
        }`
        }

        let config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        if (confirm('Are you sure you want to delete this classroom?')) {
            await axios(config).then(async (result) => {
                if (result.data.data.deleteClassroom.message) {
                    getClassrooms();
                    alert(result.data.data.deleteClassroom.message);
                }
                console.log(result.data.data.deleteClassroom.message)
            }).catch((error) => {
                console.log(error)
                alert('An error occurred while submitting the form');
            });
        } else {
            return;
        }
    }


    return { getClassrooms, getClassroomById, createClassroom, updateClassroom, deleteClassroom };
};

export default useClassroomsAPI;