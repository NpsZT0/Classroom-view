import { useContext } from "react";
import { Context } from "../../../context/UseContext";
import axios from "axios";

const useClassroomMembersAPI = () => {
    const { setClassroomMembers } = useContext(Context);
    const getClassroomMembers = async () => {
        const data = {
            query: `query {
                        getClassroomMembers {
                            message
                            classroomMembers {
                                id
                                classroom {
                                    id
                                }
                                std {
                                    id
                                }
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
            if (result.data.data.getClassroomMembers.message) {
                setClassroomMembers(result.data.data.getClassroomMembers.classroomMembers);
            }
            console.log(result.data.data.getClassroomMembers.message);
        }).catch((error) => {
            console.log(error);
        });
    }

    const createClassroomMember = async (e: React.FormEvent, classroomId: number, studentId: number) => {
        e.preventDefault();
        if (!classroomId || !studentId) {
            alert('Please select in all fields');
            return;
        }

        let data = {
            query: `mutation {
                    createClassroomMember(
                        createClassroomMemberInput: {
                            classroom: ${classroomId}
                            std: ${studentId}
                        }
                    ) {
                        message
                        classroomMembers {
                            id
                            classroom {
                                id
                            }
                            std {
                                id
                            }
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
            if (result.data.data.createClassroomMember.message) {
                getClassroomMembers();
                alert(result.data.data.createClassroomMember.message);
            }
            console.log(result.data.data.createClassroomMember.message)
        }).catch((error) => {
            console.log(error)
            alert('An error occurred while submitting the form, maybe the student is already in the classroom.');
        });
    }

    const deleteClassroomMember = async (e: React.FormEvent, id: number) => {
        e.preventDefault();

        let data = {
            query: `mutation {
                        deleteClassroomMember(
                            id: ${id}
                        ) {
                            message
                            classroomMembers {
                                id
                                classroom {
                                    id
                                }
                                std {
                                    id
                                }
                            }
                        }
                    }`
        }

        let config = {
            url: import.meta.env.VITE_API_URL,
            method: 'post',
            data: data
        };
        if (confirm('Are you sure you want to delete this student in classroom ?')) {
            await axios(config).then(async (result) => {
                if (result.data.data.deleteClassroomMember.message) {
                    getClassroomMembers();
                    alert(result.data.data.deleteClassroomMember.message);
                }
                console.log(result.data.data.deleteClassroomMember.message)
            }).catch((error) => {
                console.log(error)
            });
        } else {
            return;
        }
    }

    return { getClassroomMembers, createClassroomMember, deleteClassroomMember };
};
export default useClassroomMembersAPI;
