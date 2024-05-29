import { DarkThemeToggle, Sidebar } from "flowbite-react";
import { HiOfficeBuilding, HiUserGroup } from "react-icons/hi";

export default function SidebarComponent() {
    return (
        <Sidebar aria-label="Default sidebar" className="order-first h-auto min-h-screen shadow-lg w-fit">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href={`/`} icon={HiOfficeBuilding}>
                        Classrooms
                    </Sidebar.Item>
                    <Sidebar.Item href={`/students`} icon={HiUserGroup}>
                        Students
                    </Sidebar.Item>
                    <DarkThemeToggle />
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
