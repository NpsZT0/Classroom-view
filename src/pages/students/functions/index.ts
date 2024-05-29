import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/UseContext";
import { IStudent } from "../../../types";

const useStudentsAPI = () => {
    const { setStudents, setOpenModal } = useContext(Context);

    const getStudents = async () => {
        const data = {
            query: `query {
          getUsers {
            message
            users {
              id
              stdId
              prefix
              firstName
              lastName
              gender
              birthday
              gradeLevel
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
            if (result.data.data.getUsers.message) {
                setStudents(result.data.data.getUsers.users);
            }
            console.log(result.data.data.getUsers.message);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getStudentById = async (id: number) => {
        const data = {
            query: `query {
                getUserById(id: ${id}) {
                    message
                    users {
                        id
                        stdId
                        prefix
                        firstName
                        lastName
                        gender
                        birthday
                        gradeLevel
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
            if (result.data.data.getUserById.message) {
                console.log(result.data.data.getUserById.users[0]);
                responseResult = (result.data.data.getUserById.users[0]);
            } else {
                console.log(result.data.data.getUserById.message);
                responseResult = {};
            }
        }).catch((error) => {
            console.log(error);
            responseResult = {};
        });

        return responseResult;
    }

    const createStudent = async (e: React.FormEvent, student: IStudent): Promise<boolean> => {
        e.preventDefault();
        if (!student.stdId || !student.prefix || !student.firstName || !student.lastName || !student.birthday || !student.gender || student.gradeLevel === 0) {
            console.log(student)
            alert('Please fill in all fields');
            return false;
        }
        let data = {
            query: `mutation {
            createUser(
                createUserInput: {
                    stdId: "${student.stdId}"
                    prefix: "${student.prefix}"
                    firstName: "${student.firstName}"
                    lastName: "${student.lastName}"
                    gender: "${student.gender}"
                    birthday: "${student.birthday}"
                    gradeLevel: ${student.gradeLevel}
                }
            ) {
                message
                users {
                id
                stdId
                prefix
                firstName
                lastName
                gender
                birthday
                gradeLevel
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
            if (result.data.data.createUser.message) {
                getStudents();
                alert(result.data.data.createUser.message);
                setOpenModal(false)
                return true;
            }
            return false;
            console.log(result.data.data.createUser.message)
        }).catch((error) => {
            console.log(error)
            alert('An error occurred while submitting the form');
            setOpenModal(true)
            return false;
        });
        return true;
    }

    const updateStudent = async (e: React.FormEvent, id: number, student: IStudent) => {
        e.preventDefault();
        if (!student.stdId || !student.prefix || !student.firstName || !student.lastName || !student.birthday || !student.gender || student.gradeLevel === 0) {
            alert('Please fill in all fields');
            return;
        }
        let data = {
            query: `mutation {
            updateUser(
                id: ${id},
                updateUserInput: {
                    stdId: "${student.stdId}"
                    prefix: "${student.prefix}"
                    firstName: "${student.firstName}"
                    lastName: "${student.lastName}"
                    gender: "${student.gender}"
                    birthday: "${student.birthday}"
                    gradeLevel: ${student.gradeLevel}
                }
            ) {
                message
                users {
                    id
                    stdId
                    prefix
                    firstName
                    lastName
                    gender
                    birthday
                    gradeLevel
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
            if (result.data.data.updateUser.message) {
                getStudents();
                alert(result.data.data.updateUser.message);
                setOpenModal(false);
            }
            console.log(result.data.data.updateUser.message)
        }).catch((error) => {
            console.log(error)
            alert('An error occurred while submitting the form');
            setOpenModal(true);
        });
    }

    const deleteStudent = async (id: number) => {
        let data = {
            query: `mutation {
                deleteUser(id: ${id}) {
                    message
                    users {
                        id
                        stdId
                        prefix
                        firstName
                        lastName
                        gender
                        birthday
                        gradeLevel
                    }
                }
        }`
        }

        let config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };

        if (confirm('Are you sure you want to delete this student ?')) {
            await axios(config).then(async (result) => {
                if (result.data.data.deleteUser.message) {
                    getStudents();
                    alert(result.data.data.deleteUser.message);
                }
                console.log(result.data.data.deleteUser.message)
            }).catch((error) => {
                console.log(error)
                alert('An error occurred while submitting the form');
            });
        } else {
            return;
        }
    }

    return { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
};

export default useStudentsAPI;