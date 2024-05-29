
import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import useClassroomsAPI from "../functions/useClassroomsAPI";
import { Context } from "../../../context/UseContext";

export function FormClassroom() {
    const { classroomId } = useContext(Context)
    const { getClassrooms, getClassroomById, createClassroom, updateClassroom } = useClassroomsAPI();
    const [classroom, setClassroom] = useState({
        roomNumber: '',
        roomName: '',
        schoolYear: '',
        teacherName: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassroom((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const yearValidation = (year: number) => {
        var text = /^[0-9]+$/;

        if (year != 0) {
            if ((year != undefined) && (!text.test(String(year)))) {
                alert("Please Enter Numeric Values Only");
                return false;
            }

            if (String(year).length != 4) {
                alert("Year is not proper. Please check");
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                return false;
            }
            return true;
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (!classroom.roomNumber || !classroom.roomName || !classroom.schoolYear || !classroom.teacherName) {
            alert('Please fill in all fields');
            return;
        }
        if (!yearValidation(Number(classroom.schoolYear))) {
            e.preventDefault();
            return
        };
        createClassroom(e, classroom);
        setClassroom({
            ...classroom,
            roomNumber: '',
            roomName: '',
            schoolYear: '',
            teacherName: ''
        })
    }

    const handleGetStudentById = async () => {
        if (classroomId !== -1) {
            await getClassroomById(classroomId).then((result) => {
                setClassroom({ ...classroom, ...result })
            })
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        if (!yearValidation(Number(classroom.schoolYear))) {
            e.preventDefault();
            return
        };
        await updateClassroom(e, classroomId!, classroom);
        getClassrooms();
    }

    useEffect(() => {
        handleGetStudentById();
    }, [])
    return (
        <>
            <form className="flex flex-col max-w-md gap-4">
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="roomNumber" value="Room Number" />
                    </div>
                    <TextInput id="roomNumber" type="text" value={classroom.roomNumber ?? ''} placeholder="M123" required shadow
                        onChange={handleChange} />
                </div>
                <div className="max-w-md">
                    <div className="block mb-2">
                        <Label htmlFor="roomName" value="Room Name" />
                    </div>
                    <TextInput id="roomName" type="text" value={classroom.roomName ?? ''} placeholder="Math" required shadow
                        onChange={handleChange} />
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="schoolYear" value="School Year" />
                    </div>
                    <TextInput id="schoolYear" type="text" placeholder="AD Year e.g. 2024" value={classroom.schoolYear ?? ''} required shadow
                        onChange={handleChange} />
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="teacherName" value="Teacher Name" />
                    </div>
                    <TextInput id="teacherName" type="text" placeholder="John Doe" value={classroom.teacherName ?? ''} required shadow
                        onChange={handleChange} />
                </div>
                <Button type="submit" onClick={(e: React.FormEvent) => classroomId !== -1 ? handleEdit(e) : handleSubmit(e)}>Register new classroom</Button>
            </form>
        </>
    );
}
