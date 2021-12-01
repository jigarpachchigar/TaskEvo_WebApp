import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading } from "@chakra-ui/layout";
import React, { memo, useState } from "react";
import { useLocation } from "react-router";
import Card from "../../components/common/Card";
import CustomTable from "../../components/common/Table";
import Layout from "../../components/Layout/Layout";
import AddStatusModal from "../../components/modals/AddStatusModal";
import moment from "moment";

const TasksPage = (props) => {
	const params = useLocation();
	console.log(params, props, "propssss");
	const projectsData = params?.state?.task?.task;

	const ActionComponent = (props) => {
		const [statusModal, setStatusModal] = useState(false);
		return (
			<>
				<Button
					colorScheme="purple"
					onClick={() => setStatusModal(true)}
					size="sm"
				>
					Add status
				</Button>
				<AddStatusModal
					id={3}
					isOpen={statusModal}
					onClose={() => setStatusModal(false)}
				/>
			</>
		);
	};
	const taskColumns = [
		{ Header: "Task", accessor: "task" },
		{ Header: "Description", accessor: "Description" },
		{ Header: "Assigned to", accessor: "assigned_to" },
		{ Header: "From date", accessor: "from_date" },
		{ Header: "To date", accessor: "to_date" },
		{ Header: "Status", accessor: "status" },
		// { Header: "Actions", accessor: "actions" },
	];

	const taskRows = [
		{
			task: "Task 1",
			Description: "Task 1 Description",
			assigned_to: "Rajat Thakur",
			from_date: "2020-01-01",
			to_date: "2020-01-01",
			status: "In Progress",
			// actions: <ActionComponent />,
		},
	];

	const projectRows = () => {
		if (Array?.isArray(projectsData) && projectsData.length > 0) {
			return (projectsData || []).map((project) => {
				return {
					task: project?.title,
					Description: project?.description,
					assigned_to: project.user[0].name,
					from_date: moment(project?.start_time).format("YYYY/M/DD"),
					to_date:moment(project?.end_time).format("YYYY/M/DD"),
					status: project?.status,
					// actions: <ActionComponent />,
				};
			});
		} else {
			return [];
		}
	};




	return (
		<Layout>
			<Card mt="50px">
				<Box w="full" my="30px">
					<Center>
						<Heading>Tasks</Heading>
					</Center>
					{/* <Flex alignItems="flex-end" justifyContent="flex-end" w="full">
						<Button colorScheme="blue">Add Task</Button>
					</Flex> */}
					<Flex w="full" my="50px" overflow="auto">
						<CustomTable columns={taskColumns} data={projectRows()} />
					</Flex>
				</Box>
			</Card>
		</Layout>
	);
};

export default memo(TasksPage);
