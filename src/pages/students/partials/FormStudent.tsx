
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import useStudentsAPI from "../functions";
import { Context } from "../../../context/UseContext";

export function FormStudent() {
    const { studentId } = useContext(Context)
    const { getStudents, createStudent, getStudentById, updateStudent } = useStudentsAPI();
    const [loading, setLoading] = useState(false)
    const [student, setStudent] = useState({
        stdId: '',
        prefix: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        gradeLevel: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setStudent((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        if (await createStudent(e, student)) {
            setStudent({
                ...student,
                stdId: '',
                prefix: "default",
                firstName: '',
                lastName: '',
                gender: "default",
                birthday: String(new Date()),
                gradeLevel: 0,
            })
        }
    }

    const handleGetStudentById = async () => {
        if (studentId !== -1) {
            setLoading(true);
            await getStudentById(studentId!).then((result) => {
                setStudent({ ...student, ...result })
                setLoading(false);
            })
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        await updateStudent(e, studentId!, student);
        getStudents();
    }

    useEffect(() => {
        handleGetStudentById();
    }, [])
    return (
        <>
            <form className="flex flex-col max-w-md gap-4">
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="id" value="ID" />
                    </div>
                    <TextInput id="id" type="text" value={student.stdId ?? ''} placeholder="A0001" required shadow
                        onChange={(e) => setStudent({
                            ...student,
                            stdId: e.target.value
                        })} />
                </div>
                <div className="max-w-md">
                    <div className="block mb-2">
                        <Label htmlFor="prefix" value="Prefix" />
                    </div>
                    <Select id="prefix" required defaultValue={student.prefix !== '' ? student.prefix : "default"}
                        onChange={handleChange}>
                        <option disabled value="default">Select prefix</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                    </Select>
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="firstName" value="Name" />
                    </div>
                    <TextInput id="firstName" type="text" placeholder="John" value={student.firstName ?? ''} required shadow
                        onChange={handleChange} />
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="lastName" value="Surname" />
                    </div>
                    <TextInput id="lastName" type="text" placeholder="Doe" value={student.lastName ?? ''} required shadow
                        onChange={handleChange} />
                </div>
                <div className="max-w-md">
                    <div className="block mb-2">
                        <Label htmlFor="gender" value="Gender" />
                    </div>
                    <Select id="gender" required defaultValue={student.gender !== '' ? student.gender : "default"}
                        onChange={handleChange}>
                        <option disabled value="default">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Other">Other</option>
                    </Select>
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="birthday" value="Birthday" />
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Datepicker id="birthday" maxDate={new Date()} defaultDate={student.birthday ? new Date(student.birthday) : new Date()}
                            onSelectedDateChanged={(e) => setStudent({
                                ...student,
                                birthday: formatDate(e)
                            })}
                        />
                    )}
                </div>
                <div className="max-w-md">
                    <div className="block mb-2">
                        <Label htmlFor="grade-level" value="Grade Level" />
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Select id="grade-level" required defaultValue={student.gradeLevel}
                            onChange={(e) => setStudent({
                                ...student,
                                gradeLevel: Number(e.target.value)
                            })}>
                            <option disabled value={0}>Select grade level</option>
                            <option value={1}>Grade 1</option>
                            <option value={2}>Grade 2</option>
                            <option value={3}>Grade 3</option>
                        </Select>
                    )}
                </div>
                <Button type="submit" onClick={(e: React.FormEvent) => studentId !== -1 ? handleEdit(e) : handleSubmit(e)}>Register new student</Button>
            </form>
        </>
    );
}
