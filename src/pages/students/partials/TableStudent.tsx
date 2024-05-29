
import { Pagination, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import NumberInput from "../../../components/NumberInput";
import { Context } from "../../../context/UseContext";
import useStudentsAPI from "../functions";
import SearchStudent from "./SearchStudent";

export function TableStudent({ headCell }: { headCell: string[] }) {
	const { deleteStudent, getStudents } = useStudentsAPI();

	const { students, classrooms, classroomMembers, searchStudent, setStudentId, setOpenModal } = useContext(Context)

	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(Math.ceil((students.length ?? 10) / rowsPerPage));

	const onPageChange = (page: number) => setCurrentPage(page);
	const handleDelete = async (id: number) => {
		await deleteStudent(id);
		getStudents();
	}


	// Get specific id from students
	const stdId = students.map(ele => ele.id)

	// Get classroom members that match the student id
	const classroomMemberMatched = classroomMembers.filter(ele1 => stdId.includes(ele1.std!.id)).map(ele1 => ({
		classroomId: ele1.classroom!.id,
		classroomNumber: classrooms.find(ele2 => ele2.id === ele1.classroom!.id)?.roomNumber!,
		classroomName: classrooms.find(ele2 => ele2.id === ele1.classroom!.id)?.roomName!,
		schoolYear: classrooms.find(ele2 => ele2.id === ele1.classroom!.id)?.schoolYear!,
		teacher: classrooms.find(ele2 => ele2.id === ele1.classroom!.id)?.teacherName!,
		stdId: ele1.std!.id
	}))

	// Mutate the students data to include classroom members
	const mutatedData = students.map(std => {
		const newVal = ({
			...std,
			classroomMembers: {
				...std.classroomMembers,
				classroom: {
					id: classroomMemberMatched.find(ele2 => ele2.stdId === std.id)?.classroomId,
					roomNumber: classroomMemberMatched.find(ele2 => ele2.stdId === std.id)?.classroomNumber,
					roomName: classroomMemberMatched.find(ele2 => ele2.stdId === std.id)?.classroomName,
					schoolYear: classroomMemberMatched.find(ele2 => ele2.stdId === std.id)?.schoolYear,
					teacherName: classroomMemberMatched.find(ele2 => ele2.stdId === std.id)?.teacher,
				}
			}
		})
		return newVal
	})

	const filteredData = searchStudent.students.length && searchStudent.status ?
		searchStudent.students
		: !searchStudent.students.length && searchStudent.status ? [] : mutatedData;

	useEffect(() => {
		setTotalPages(Math.ceil((students.length ?? 1) / rowsPerPage));
	}, [rowsPerPage]);
	return (
		<div className="overflow-x-auto">
			<div className="flex justify-between">
				<div className="flex items-center space-x-2">
					<p className="text-gray-700 dark:text-gray-300">Show</p>
					<NumberInput
						initNumber={(students.length !== 0 ? students.length + 5 : 10)}
						range={(students.length !== 0 ? students.length + 5 : 10)}
						setState={setRowsPerPage} />
					<p className="text-gray-700 dark:text-gray-300">Row(s)</p>
				</div>
				<div>
					<SearchStudent studentData={mutatedData!} />
				</div>
			</div>
			<Table hoverable>
				<Table.Head>
					{headCell.map((cell, index) => (
						<Table.HeadCell key={index}>{cell}</Table.HeadCell>
					))}
					<Table.HeadCell>
						<span>Action</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{filteredData
						.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage)
						.map((cell: any, index: number) => (
							<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{cell.classroomMembers?.classroom ?
										cell.classroomMembers.classroom.roomName
										: cell.classroom_seven_years ? cell.classroom_seven_years.roomName : 'No Classroom'}
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 divide-x-2 whitespace-nowrap dark:text-white">
									<button onClick={() => { (setOpenModal(true)); setStudentId(cell.id!) }} className="pr-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
										Edit
									</button>
									<button onClick={() => { handleDelete(cell.id!) }} className="pl-2 font-medium text-red-500 hover:underline dark:text-red-400">
										Delete
									</button>
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
			<div className="flex overflow-x-auto ">
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
			</div>
		</div>
	);
}
