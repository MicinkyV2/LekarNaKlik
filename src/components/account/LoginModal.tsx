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

    const login = () => {
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        if (email.value === "admin" && password.value === "admin") {
            console.log("Logged in");
            window.location.href = "/profile";
        } else {
            console.log("Wrong credentials");
        }
    };

    return (
        <>
        <Button onClick={onOpen} color="primary">Přihlásit se</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Přihlášení</ModalHeader>
                <ModalBody>
                    <Input type="email" label="E-mail" id="email" />
                    <Input type="password" label="Heslo" id="password" />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onOpenChange}>Zrušit</Button>
                    <Button color="primary" onClick={login}>Přihlásit se</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}