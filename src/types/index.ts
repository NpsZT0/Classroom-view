export interface IStudent {
    id?: number;
    stdId: string;
    prefix: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    gradeLevel: number;
    classroomMembers?: IClassroomMember[];
}

export interface IClassroom {
    id?: number;
    roomNumber: string;
    roomName: string;
    schoolYear: string;
    teacherName: string;
    classroomMembers?: IClassroomMember[];
}

export interface IClassroomMember {
    id: number;
    classroom?: IClassroom;
    std?: IStudent;
}

export interface IInviteData {
    studentId: string;
    classroomId: string;
}
