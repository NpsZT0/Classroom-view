import { TableStudent } from "./partials/TableStudent";
import { FormStudent } from "./partials/FormStudent";
import ModalComponent from "../../components/ModalComponent";
import { useEffect } from "react";

import useStudentsAPI from "./functions";
import useClassroomMembersAPI from "../classrooms/functions/useClassroomMembersAPI";
import useClassroomsAPI from "../classrooms/functions/useClassroomsAPI";

const headCell = ['ID', 'Prefix', 'Name', 'Surname', 'Gender', 'Birthday', 'Grade level', 'Classroom'];

export default function Students() {
  const { getStudents } = useStudentsAPI();
  const { getClassroomMembers } = useClassroomMembersAPI();
  const { getClassrooms } = useClassroomsAPI();

  useEffect(() => {
    getStudents();
    getClassrooms();
    getClassroomMembers();
  }, []);
  return (
    <div className="w-full h-auto min-h-screen p-8 space-y-8">
      <header className="flex justify-between">
        <h1 className="font-semibold text-h2">Student Details</h1>
        <ModalComponent modalBody={<FormStudent />} formLabel="Add Student Form" buttonLabel="Student" />
      </header>
      <TableStudent headCell={headCell} />
    </div>
  )
}
