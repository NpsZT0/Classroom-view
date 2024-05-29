import { Button, Modal } from "flowbite-react";
import { useContext } from "react";
import { Context } from "../context/UseContext";

export default function ModalComponent({ modalBody, formLabel, buttonLabel }: { modalBody: JSX.Element, formLabel: string, buttonLabel: string }) {
    const { openModal, setOpenModal, setStudentId, setClassroomId } = useContext(Context)

    return (
        <>
            <Button onClick={() => { setOpenModal(true); setStudentId(-1); setClassroomId(-1) }}>+ Add {buttonLabel}</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>{formLabel}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {modalBody}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
