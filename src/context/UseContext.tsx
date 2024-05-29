import { Dispatch, SetStateAction, createContext, useState } from "react";
import { IClassroom, IClassroomMember, IStudent } from "../types";


export interface IContext {
    studentId: number;
    setStudentId: Dispatch<SetStateAction<number>>;
    students: IStudent[];
    setStudents: Dispatch<SetStateAction<IStudent[]>>;
    searchStudent: {
        students: IStudent[]
        status?: boolean
    };
    setSearchStudent: Dispatch<SetStateAction<{
        students: IStudent[]
        status?: boolean
    }>>;

    classroomId: number;
    setClassroomId: Dispatch<SetStateAction<number>>;
    classrooms: IClassroom[];
    setClassrooms: Dispatch<SetStateAction<IClassroom[]>>;
    searchClassroom: {
        classrooms: IClassroom[]
        status?: boolean
    };
    setSearchClassroom: Dispatch<SetStateAction<{
        classrooms: IClassroom[]
        status?: boolean
    }>>;

    classroomMembers: IClassroomMember[];
    setClassroomMembers: Dispatch<SetStateAction<IClassroomMember[]>>;

    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;

    modalBody: JSX.Element;
    setModalBody: Dispatch<SetStateAction<JSX.Element>>;
    modalLabel: string;
    setModalLabel: Dispatch<SetStateAction<string>>;
}

const defaultState = {
    studentId: -1,
    setStudentId: (id: number) => { },
    students: [{
        stdId: '',
        prefix: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        gradeLevel: 0,
    }],
    setStudents: (user: IStudent[]) => { },
    searchStudent: {
        students: [{
            stdId: '',
            prefix: '',
            firstName: '',
            lastName: '',
            gender: '',
            birthday: '',
            gradeLevel: 0,
        }],
        status: false
    },
    setSearchStudent: (user: {
        students: IStudent[]
        status?: boolean
    }) => { },

    classroomId: -1,
    setClassroomId: (id: number) => { },
    classrooms: [{
        roomNumber: '',
        roomName: '',
        schoolYear: '',
        teacherName: '',
    }],
    setClassrooms: (classroom: IClassroom[]) => { },
    searchClassroom: {
        classrooms: [{
            roomNumber: '',
            roomName: '',
            schoolYear: '',
            teacherName: '',
        }],
        status: false
    },
    setSearchClassroom: (user: {
        classrooms: IClassroom[]
        status?: boolean
    }) => { },

    classroomMembers: [{
        id: 0,
        classroom: {
            id: 0,
            roomNumber: '',
            roomName: '',
            schoolYear: '',
            teacherName: '',
        },
        std: {
            stdId: '',
            prefix: '',
            firstName: '',
            lastName: '',
            gender: '',
            birthday: '',
            gradeLevel: 0,
        }
    }],
    setClassroomMembers: (classroomMember: IClassroomMember[]) => { },

    openModal: false,
    setOpenModal: (open: boolean) => { },

    modalBody: <></>,
    setModalBody: (body: JSX.Element) => { },
    modalLabel: '',
    setModalLabel: (label: string) => { },
} as IContext

export const Context = createContext(defaultState);

type UserProviderProps = {
    children: React.ReactNode;
}

export default function ContextProvider({ children }: UserProviderProps) {
    const [studentId, setStudentId] = useState<number>(-1);
    const [students, setStudents] = useState<IStudent[]>([]);
    const [searchStudent, setSearchStudent] = useState<{
        students: IStudent[]
        status?: boolean
    }>({ students: [], status: false })

    const [classroomId, setClassroomId] = useState<number>(-1);
    const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
    const [searchClassroom, setSearchClassroom] = useState<{
        classrooms: IClassroom[]
        status?: boolean
    }>({ classrooms: [], status: false })

    const [classroomMembers, setClassroomMembers] = useState<IClassroomMember[]>([])

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [modalBody, setModalBody] = useState<JSX.Element>(<></>)
    const [modalLabel, setModalLabel] = useState<string>('')

    return (
        <Context.Provider value={{
            studentId,
            setStudentId,
            students,
            setStudents,
            searchStudent,
            setSearchStudent,

            classroomId,
            setClassroomId,
            classrooms,
            setClassrooms,
            searchClassroom,
            setSearchClassroom,
            classroomMembers,
            setClassroomMembers,

            openModal,
            setOpenModal,

            modalBody,
            setModalBody,
            modalLabel,
            setModalLabel
        }}>
            {children}
        </Context.Provider>
    );
}