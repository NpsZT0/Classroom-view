import { Button, Label, Select, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Context } from "../../../context/UseContext";
import useStudentsAPI from "../functions";

export default function SearchStudent({ studentData }: { studentData: any[] }) {
    const { setSearchStudent, classrooms, classroomMembers } = useContext(Context);
    const { getStudents7Years } = useStudentsAPI();
    const [search, setSearch] = useState({
        classroom: 0,
        gradeLevel: 0,
        schoolYear: 0
    })

    const schoolYears = [...new Set(classrooms.map(room => room.schoolYear))]

    const handleAdvanceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(prev => ({ ...prev, gradeLevel: 0, classroom: 0, schoolYear: 0 }));
        const searchTerm = e.target.value.toLowerCase();

        const searchResult = studentData.filter((item) =>
            (item.stdId.toLowerCase()).includes(searchTerm)
            || (item.firstName.toLowerCase()).includes(searchTerm)
            || (item.lastName.toLowerCase()).includes(searchTerm)
            || (item.gradeLevel.toString().toLowerCase()).includes(searchTerm)
            || (item.gender.toString().toLowerCase()).includes(searchTerm)
        )

        if (searchResult) {
            setSearchStudent({ students: searchResult, status: true });
        } else {
            setSearchStudent({ students: [], status: false });
        }
    };

    const handleSearchMultiMode = (e: React.ChangeEvent<HTMLSelectElement>, mode: string) => {
        const searchTerm = e.target.value.toLowerCase();
        let searchResult
        if (mode === 'classroom') {
            setSearch(prev => ({ ...prev, classroom: Number(e.target.value), gradeLevel: 0, schoolYear: 0 }));
            const stdDotID = classroomMembers.filter((cm) => Number(cm.classroom!.id) === Number(searchTerm)).map(ele => ele.std!.id)
            searchResult = studentData.filter(student => stdDotID.includes(student.id));
        } else if (mode === 'gradeLevel') {
            setSearch(prev => ({ ...prev, gradeLevel: Number(e.target.value), classroom: 0, schoolYear: 0 }));
            searchResult = studentData.filter((item) =>
                (item.gradeLevel.toString().toLowerCase()).includes(searchTerm)
            )
        } else if (mode === 'schoolYear') {
            setSearch(prev => ({ ...prev, schoolYear: Number(e.target.value), classroom: 0, gradeLevel: 0 }));
            const classroomId = classrooms.filter((cm) => cm.schoolYear === searchTerm).map(ele => ele.id)
            const stdDotID = classroomMembers.filter((cm) => classroomId.includes(Number(cm.classroom!.id))).map(ele => ele.std!.id)
            searchResult = studentData.filter(student => stdDotID.includes(student.id));
        }

        if (searchTerm === '0') {
            setSearchStudent({ students: studentData, status: false });
        } else if (searchResult) {
            setSearchStudent({ students: searchResult, status: true });
        } else {
            setSearchStudent({ students: [], status: false });
        }
    };

    const handleSQLRawQuery = async (mode: string) => {
        if (mode === 'query') {
            const result = await getStudents7Years();
            setSearchStudent({ students: result, status: true });
        } else if (mode === 'reset') {
            setSearchStudent({ students: studentData, status: false });
        }
    }

    return (
        <div className="flex gap-4 my-2">
            <div>
                <div className="block mb-1">
                    <Label htmlFor="email1" value="Advance Search" className="truncate" />
                </div>
                <TextInput onChange={(e) => handleAdvanceSearch(e)} id="email1" type="email" placeholder="Name, Surname or ID" required />
            </div>
            <div className="max-w-[15rem]">
                <div className="block mb-1">
                    <Label htmlFor="classroom" value="Select classroom" className="truncate" />
                </div>
                <Select id="classroom" value={search.classroom ?? 0}
                    onChange={(e) => handleSearchMultiMode(e, 'classroom')}>
                    <option value={0}>All</option>
                    {classrooms.map((cm, index) => (
                        <option key={index} value={cm.id}>
                            Number: {cm.roomNumber} | Name: {cm.roomName}
                        </option>
                    ))}
                </Select>
            </div>
            <div className="max-w-md">
                <div className="block mb-1">
                    <Label htmlFor="grade-level" value="Select grade level" className="truncate" />
                </div>
                <Select id="grade-level" value={search.gradeLevel ?? 0}
                    onChange={(e) => handleSearchMultiMode(e, 'gradeLevel')}>
                    <option value={0}>All</option>
                    <option value={1}>Grade 1</option>
                    <option value={2}>Grade 2</option>
                    <option value={3}>Grade 3</option>
                </Select>
            </div>
            <div className="max-w-md">
                <div className="block mb-1">
                    <Label htmlFor="school-year" value="Select school year" className="truncate" />
                </div>
                <Select id="school-year" value={search.schoolYear ?? 0}
                    onChange={(e) => handleSearchMultiMode(e, 'schoolYear')}>
                    <option value={0}>All</option>
                    {schoolYears.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>
            </div>
            <div className="max-w-md">
                <div className="block mb-1">
                    <Label htmlFor="sql-raw-query" value="SQL Raw Query" className="truncate" />
                </div>
                <Button.Group>
                    <Button id="sql-raw-query"
                        onClick={()=>handleSQLRawQuery('query')}>
                        Click to Query
                    </Button>
                    <Button id="reset" color="light"
                        onClick={()=>handleSQLRawQuery('reset')}>
                        Reset
                    </Button>
                </Button.Group>
            </div>
        </div >
    )
}
