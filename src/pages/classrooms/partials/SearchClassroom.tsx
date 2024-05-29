import { Label, TextInput } from "flowbite-react";
import { IClassroom } from "../../../types";
import { useContext } from "react";
import { Context } from "../../../context/UseContext";

export default function SearchClassroom({ classroomData }: { classroomData: IClassroom[] }) {
    const { setSearchClassroom } = useContext(Context);

    const handleSearchClassroom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();

        const searchResult = classroomData.filter((item) =>
            (item.roomNumber.toLowerCase()).includes(searchTerm)
            || (item.roomName.toLowerCase()).includes(searchTerm)
            || (item.schoolYear.toLowerCase()).includes(searchTerm)
            || (item.teacherName.toString().toLowerCase()).includes(searchTerm)
        )

        if (searchResult) {
            setSearchClassroom({ classrooms: searchResult, status: true });
        } else {
            setSearchClassroom({ classrooms: [], status: false });
        }
    };

    return (
        <form className="flex max-w-md gap-4 my-2">
            <div>
                <div className="block mb-1">
                    <Label htmlFor="email1" value="Advance Search" />
                </div>
                <TextInput onChange={(e) => { handleSearchClassroom(e) }} id="email1" type="email" placeholder="Number, Name or Teacher" required />
            </div>
        </form>
    )
}
