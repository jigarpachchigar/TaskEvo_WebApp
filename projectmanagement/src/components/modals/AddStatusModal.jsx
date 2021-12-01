import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, emptyHomeReducer } from "../../redux/actions/home";
import { getTask } from "../../redux/actions/task";
import CustomModal from "../common/Modal";
import CustomText from "../common/Text";
import microValidator from "micro-validator";
import { pxToEm } from "../../utils/commonMethods";

const AddStatusModal = (props) => {
	const { isOpen, onClose, id, task } = props;
	console.log(moment(task).format("DD-MM-YYYY"), "ttttttttttttttttttttttttttt");
	const dispatch = useDispatch();
	const status = useSelector((state) => state?.home?.statusAdd);
	const date = moment().utc().format();
	const [error, setError] = useState({ work_hour: "" });
	const [resMessage, setResMessage] = useState("");
	const [data, setData] = useState({
		work_date: date,
		work_hour: "",
		status: "",
		id: id,
	});

	const validate = (data) => {
		const errors = microValidator.validate(
			{
				work_hour: {
					required: {
						errorMsg: `Work hours are required`,
					},
				},
			},
			data
		);
		setError({ ...error, work_hour: errors.work_hour });
		return errors;
	};

	useEffect(() => {
		if (status?.data?.status === 1 && status?.data?.success) {
			dispatch(getTask(date));
			dispatch(emptyHomeReducer());
			setResMessage("Status updated successfully");
		}
		if (
			status?.data?.status &&
			status?.data?.status !== 1 &&
			status?.data?.success === false
		) {
			setResMessage("Something went wrong");
		}
	}, [dispatch, status]);

	const inputChange = (e) => {
		console.log(e.target.name, e.target.value, "llllllllllll");
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const err_resp = validate(data) || {};
		if (Object.keys(err_resp).length === 0) {
			dispatch(addStatus(data));
		}
	};

	return (
		<CustomModal isOpen={isOpen} onClose={onClose} title="Add Status">
			<form onSubmit={handleSubmit}>
				<VStack alignItems="flex-start" w="full" spacing={5}>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Name</CustomText>
						<Input name="name" value={task?.title} disabled />
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Description</CustomText>
						<Textarea name="description" value={task?.description} disabled />
					</VStack>
					{/* <VStack w="full" alignItems="flex-start">
						<CustomText>Start date</CustomText>
						<Input
							name="startDate"
							type="date"
							value={moment(task?.start_time).format("DD-MM-YYYY")}
							disabled
						/>
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>End date</CustomText>
						<Input
							name="endDate"
							type="date"
							value={moment(task?.end_time).format("DD-MM-YYYY")}
							disabled
						/>
					</VStack> */}
					<VStack w="full" alignItems="flex-start">
						<CustomText>Status</CustomText>
						<Select
							placeholder="Select option"
							defaultValue={task?.status || data?.status}
							name="status"
							onChange={inputChange}
						>
							<option value="todo">Pending</option>
							<option value="inprogress">In Progress</option>
							<option value="complete">Complete</option>
						</Select>
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Hours spent</CustomText>
						<Input
							isInvalid={error?.work_hour?.length ? true : false}
							name="work_hour"
							type="number"
							onChange={inputChange}
						/>
						{error?.work_hour?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.work_hour}
							</CustomText>
						)}
					</VStack>
					{resMessage === "Status updated successfully" ? (
						<Alert status="success">
							<AlertIcon />
							{resMessage}
						</Alert>
					) : resMessage === "Something went wrong" ? (
						<Alert status="error">
							<AlertIcon />
							{resMessage}
						</Alert>
					) : null}
					<Button colorScheme="blue" size="sm" type="submit">
						Add Status
					</Button>
				</VStack>
			</form>
		</CustomModal>
	);
};

export default memo(AddStatusModal);
