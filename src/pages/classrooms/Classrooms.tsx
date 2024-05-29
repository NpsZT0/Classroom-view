import { useContext, useEffect, useState } from 'react'
import ModalComponent from '../../components/ModalComponent'
import useClassroomsAPI from './functions/useClassroomsAPI'
import useStudentsAPI from '../students/functions'
import useClassroomMembersAPI from './functions/useClassroomMembersAPI'
import { FormClassroom } from './partials/FormClassroom'
import { TableClassroom } from './partials/TableClassroom'
import { Context } from '../../context/UseContext'

const headCell = ['Room Number', 'Room Name', 'School Year', 'Teacher'];

export default function Classrooms() {
  const { modalBody, setModalBody, modalLabel, setModalLabel } = useContext(Context)
  const { getClassrooms } = useClassroomsAPI();
  const { getStudents } = useStudentsAPI();
  const { getClassroomMembers } = useClassroomMembersAPI();
  const [loading, setLoading] = useState(true)

  const handleSetModalBody = async () => {
    await setModalBody(<FormClassroom />);
    await setModalLabel('Add Classroom Form');
    setLoading(false)
  }
  useEffect(() => {
    handleSetModalBody();
    getClassrooms();
    getStudents();
    getClassroomMembers();
  }, []);

  return (
    <div className="w-full h-auto min-h-screen p-8 space-y-8">
      <header className="flex justify-between">
        <h1 className="font-semibold text-h2">Classroom Details</h1>
        {loading ? (
          <div className="flex items-center space-x-2">
            <p>Loading...</p>
          </div>
        ) : (
          <ModalComponent modalBody={modalBody} formLabel={modalLabel} buttonLabel="Classroom" />
        )}
      </header>
      <TableClassroom headCell={headCell} />
    </div>
  )
}
