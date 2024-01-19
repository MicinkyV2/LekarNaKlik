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

export default function LoginModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
        <Button onClick={onOpen} color="primary" variant="light">Přihlásit se</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Přihlášení</ModalHeader>
                <ModalBody>
                    <Input type="email" label="E-mail" />
                    <Input type="password" label="Heslo" />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onOpenChange}>Cancel</Button>
                    <Button color="primary" onClick={onOpenChange}>Přihlásit se</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}