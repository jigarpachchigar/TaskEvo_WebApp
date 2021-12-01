import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createTask, emptyReducer, getUsers } from "../../redux/actions/task";
import CustomModal from "../common/Modal";
import CustomText from "../common/Text";
import moment from "moment";
import { getAllProjects } from "../../redux/actions/home";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import microValidator from "micro-validator";
import { pxToEm } from "../../utils/commonMethods";
const AddTaskModal = (props) => {
	const { isOpen, onClose, id } = props;
	const dispatch = useDispatch();
	const users = useSelector((state) => state?.task?.Users?.data?.data);
	const taskCreate = useSelector((state) => state?.task?.Task?.data);
	const [error, setError] = useState({
		name: "",
		description: "",
		start_time: "",
		end_time: "",
		assign_to: "",
		cost: "",
	});
	const toast = useToast();
	const [message, setMessage] = useState("");
	useEffect(() => {
		if (taskCreate?.status === 201 && taskCreate?.success) {
			setMessage("Task created successfully");
			dispatch(getAllProjects());
			dispatch(emptyReducer());
		}
		if (
			taskCreate?.status &&
			taskCreate?.status !== 201 &&
			taskCreate?.success === false
		) {
			setMessage("Something went wrong");
		}
	}, [taskCreate, emptyReducer]);

	const [data, setData] = useState({
		projectid: id,
		name: "",
		description: "",
		start_time: "",
		end_time: "",
		assign_to: "",
		cost: "",
	});

	const validate = (data) => {
		const errors = microValidator.validate(
			{
				name: {
					required: {
						errorMsg: `Name is required`,
					},
				},
				description: {
					required: {
						errorMsg: `Description is required`,
					},
				},
				start_time: {
					required: {
						errorMsg: `Start time is required`,
					},
				},
				end_time: {
					required: {
						errorMsg: `End time is required`,
					},
				},
				assign_to: {
					required: {
						errorMsg: `This field is required`,
					},
				},
				cost: {
					required: {
						errorMsg: `Cost is required`,
					},
				},
			},
			data
		);
		setError({
			...error,
			name: errors.name,
			description: errors.description,
			start_time: errors.start_time,
			end_time: errors.end_time,
			assign_to: errors.assign_to,
			cost: errors.cost,
		});
		return errors;
	};

	const inputChange = (e) => {
		console.log(e.target.name, e.target.value);
		setData({
			...data,
			[e.target.name]:
				e.target.name === "start_time"
					? moment(e.target.value).utc().format()
					: e.target.name === "end_time"
					? moment(e.target.value).utc().format()
					: e.target.value,
		});
	};

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const handleTaskSubmit = (e) => {
		e.preventDefault();
		const err_resp = validate(data) || {};
		if (Object.keys(err_resp).length === 0) {
			dispatch(createTask(data));
		}
	};
	return (
		<CustomModal isOpen={isOpen} onClose={onClose} title="Add Task">
			<form onSubmit={handleTaskSubmit}>
				<VStack alignItems="flex-start" w="full" spacing={5}>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Name</CustomText>
						<Input
							name="name"
							onChange={inputChange}
							isInvalid={error?.name?.length ? true : false}
						/>
						{error?.name?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.name}
							</CustomText>
						)}
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Description</CustomText>
						<Textarea
							name="description"
							onChange={inputChange}
							isInvalid={error?.description?.length ? true : false}
						/>
						{error?.description?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.description}
							</CustomText>
						)}
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Start date</CustomText>
						<Input
							name="start_time"
							type="date"
							onChange={inputChange}
							isInvalid={error?.start_time?.length ? true : false}
						/>
						{error?.start_time?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.start_time}
							</CustomText>
						)}
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>End date</CustomText>
						<Input
							name="end_time"
							type="date"
							onChange={inputChange}
							isInvalid={error?.end_time?.length ? true : false}
						/>
						{error?.end_time?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.end_time}
							</CustomText>
						)}
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Assign to</CustomText>
						<Select
							placeholder="Select option"
							name="assign_to"
							onChange={inputChange}
							isInvalid={error?.assign_to?.length ? true : false}
						>
							{(users || []).map((user) => {
								return (
									<option value={user?._id} key={user?._id}>
										{user?.name}
									</option>
								);
							})}
						</Select>
						{error?.assign_to?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.assign_to}
							</CustomText>
						)}
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<CustomText>Hourly Cost</CustomText>
						<InputGroup>
							<InputLeftAddon children="$" />
							<Input
								name="cost"
								onChange={inputChange}
								type="number"
								isInvalid={error?.cost?.length ? true : false}
							/>
						</InputGroup>
						{error?.cost?.length > 0 && (
							<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
								{/* <WarningFill /> */}
								&nbsp;{error?.cost}
							</CustomText>
						)}
					</VStack>
					{message === "Task created successfully" ? (
						<Alert status="success">
							<AlertIcon />
							{message}
						</Alert>
					) : message === "Something went wrong" ? (
						<Alert status="error">
							<AlertIcon />
							{message}
						</Alert>
					) : null}

					<Button colorScheme="blue" type="submit" size="sm">
						Add task
					</Button>
				</VStack>
			</form>
		</CustomModal>
	);
};

export default memo(AddTaskModal);
