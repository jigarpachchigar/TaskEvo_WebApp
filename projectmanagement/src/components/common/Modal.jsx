import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/react";
import React from "react";

const CustomModal = (props) => {
	const { children, isOpen, onClose, title, ...rest } = props;
	return (
		<Modal isOpen={isOpen} onClose={onClose} {...rest}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody p="24px">{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CustomModal;
