import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
    useDisclosure,
    Button,
    Input
} from "@nextui-org/react";

export default function RegisterModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
        <Button onClick={onOpen} color="primary" variant="light">Registrace</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Registrace</ModalHeader>
                <ModalBody>
                    <Input type="email" label="E-mail" />
                    <Input type="password" label="Heslo" />
                    <Input type="password" label="Znovu heslo" />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onOpenChange}>Zrušit</Button>
                    <Button color="primary" onClick={onOpenChange}>Registrovat se</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}