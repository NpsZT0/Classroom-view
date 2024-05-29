
import { useContext, useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";

import NumberInput from "../../../components/NumberInput";
import SearchClassroom from "./SearchClassroom";
import FormInvite from "./FormInvite";

import { Context } from "../../../context/UseContext";
import { IClassroom } from "../../../types";
import useClassroomsAPI from "../functions/useClassroomsAPI";
import { FormClassroom } from "./FormClassroom";

export function TableClassroom({ headCell }: { headCell: string[] }) {
	const { deleteClassroom, getClassrooms } = useClassroomsAPI();

	const { classrooms, searchClassroom, setClassroomId, setOpenModal, setModalBody, setModalLabel } = useContext(Context)

	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(Math.ceil((classrooms.length ?? 10) / rowsPerPage));

	const onPageChange = (page: number) => setCurrentPage(page);
	const handleDelete = async (id: number) => {
		await deleteClassroom(id);
		getClassrooms();
	}

	const filteredData = searchClassroom.classrooms.length && searchClassroom.status ?
		searchClassroom.classrooms
		: !searchClassroom.classrooms.length && searchClassroom.status ? [] : classrooms;

	const setModalBodyToInvite = async (roomName: string) => {
		await setModalBody(<FormInvite />);
		await setModalLabel(`Setting Members in ${roomName}`);
	}

	const setModalBodyToClassroom = async () => {
		await setModalBody(<FormClassroom />);
		await setModalLabel('Add Classroom Form');
	  }
	useEffect(() => {
		setTotalPages(Math.ceil((classrooms.length ?? 1) / rowsPerPage));
	}, [rowsPerPage]);
	return (
		<div className="overflow-x-auto">
			<div className="flex justify-between">
				<div className="flex items-center space-x-2">
					<p className="text-gray-700 dark:text-gray-300">Show</p>
					<NumberInput initNumber={(classrooms.length !== 0 ? classrooms.length : 10)} range={(classrooms.length !== 0 ? classrooms.length : 10)} setState={setRowsPerPage} />
					<p className="text-gray-700 dark:text-gray-300">Row(s)</p>
				</div>
				<div>
					<SearchClassroom classroomData={classrooms!} />
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
					<Table.HeadCell>
						<span>Invite</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{filteredData
						.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage)
						.map((cell: IClassroom, index: number) => (
							<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{cell.roomNumber}
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{cell.roomName}
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{cell.schoolYear}
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{cell.teacherName}
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 divide-x-2 whitespace-nowrap dark:text-white">
									<button onClick={() => { (setOpenModal(true)); setClassroomId(cell.id!); setModalBodyToClassroom(); }} className="pr-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
										Edit
									</button>
									<button onClick={() => { handleDelete(cell.id!) }} className="pl-2 font-medium text-red-500 hover:underline dark:text-red-400">
										Delete
									</button>
								</Table.Cell>
								<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
									<button onClick={() => { setClassroomId(cell.id!); setOpenModal(true); setModalBodyToInvite(cell.roomName); }} className="p-1 text-xl font-medium text-gray-500 rounded-md hover:text-gray-50 hover:bg-gray-500 dark:text-gray-50 dark:hover:text-gray-500 dark:hover:bg-gray-50">
										<HiAdjustments />
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
