import { Button, Label, Pagination, Select, Table } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import { IInviteData, IStudent } from '../../../types'
import { Context } from '../../../context/UseContext'
import useClassroomMembersAPI from '../functions/useClassroomMembersAPI'
import NumberInput from '../../../components/NumberInput'
import { HiOutlineMinusCircle } from 'react-icons/hi'

const headCell = ['ID', 'Prefix', 'Name', 'Surname', 'Gender', 'Birthday', 'Grade level'];

export default function FormInvite() {
    const { students, classroomId, setClassroomId, classroomMembers } = useContext(Context)
    const { createClassroomMember, deleteClassroomMember } = useClassroomMembersAPI();
    const [inviteData, setInviteData] = useState<IInviteData>({
        studentId: "default",
        classroomId: ''
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const stdDotID = classroomMembers.filter((cm) => Number(cm.classroom!.id) === Number(classroomId)).map(ele => ele.std!.id)
    const filteredData = students.filter(student => stdDotID.includes(student.id));

    const [totalPages, setTotalPages] = useState(Math.ceil((filteredData.length ?? 10) / rowsPerPage));

    const onPageChange = (page: number) => setCurrentPage(page);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteData.studentId === "default") {
            alert('Please select a student')
            await setClassroomId(-1)
            return
        }

        await createClassroomMember(e, Number(classroomId), Number(inviteData.studentId));
    }

    const handleDelete = async (e: React.FormEvent, id: number) => {
        const classroomMemberId = classroomMembers.find((cm) => Number(cm.classroom!.id) === Number(classroomId) && Number(cm.std!.id) === id)?.id
        await deleteClassroomMember(e, Number(classroomMemberId));
    }

    useEffect(() => {
        setTotalPages(Math.ceil((filteredData.length ?? 1) / rowsPerPage));
    }, [rowsPerPage]);
    return (
        <form className="flex flex-col gap-4">
            <div className='flex items-end justify-between w-full'>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="student-id" value="Student" />
                    </div>
                    <Select id="student-id" required defaultValue={inviteData.studentId !== '' ? inviteData.studentId : "default"}
                        onChange={(e) => setInviteData({
                            ...inviteData,
                            studentId: e.target.value
                        })}>
                        <option disabled value="default">Select Student</option>
                        {students.length !== 0 ? (
                            students.map((student, index) => (
                                <option key={index} value={student.id}>
                                    ID: {student.stdId} | Name: {student.firstName} {student.lastName} | Grade Level: {student.gradeLevel}
                                </option>
                            ))
                        ) : (
                            <option disabled>No student</option>
                        )}
                    </Select>
                </div>
                <Button type="submit"
                    onClick={(e: React.FormEvent) => handleSubmit(e)}
                >+ Invite Student</Button>
            </div>
            {/* Divider */}
            <div className='mt-4 border border-gray-300 border-dashed dark:border-gray-600'></div>
            <div className="overflow-x-auto">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-gray-700 dark:text-gray-300">Show</p>
                        <NumberInput
                            initNumber={(filteredData.length !== 0 ? filteredData.length + 5 : 10)}
                            range={(filteredData.length !== 0 ? filteredData.length + 5 : 10)}
                            setState={setRowsPerPage} />
                        <p className="text-gray-700 dark:text-gray-300">Row(s)</p>
                    </div>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>
                            <span>Remove</span>
                        </Table.HeadCell>
                        {headCell.map((cell, index) => (
                            <Table.HeadCell key={index}>{cell}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredData
                            .slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage)
                            .map((cell: IStudent, index: number) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="flex justify-center mt-1 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button onClick={(e) => { handleDelete(e, cell.id!) }} className="font-medium text-red-500 w-fit h-fit hover:underline dark:text-red-400">
                                            <HiOutlineMinusCircle />
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.stdId}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.prefix}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.firstName}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.lastName}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.gender}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.birthday}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cell.gradeLevel}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
                <div className="flex overflow-x-auto ">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
                </div>
            </div>
        </form>
    )
}
