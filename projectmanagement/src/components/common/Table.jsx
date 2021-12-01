import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";

const CustomTable = (props) => {
	const { columns, data } = props;
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);
	return (
		<Table {...getTableProps()} variant="stripped" colorScheme="teal">
			<Thead bg="gray.300">
				{headerGroups.map((headerGroup) => (
					<Tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th
								{...column.getHeaderProps(column.getSortByToggleProps())}
								isNumeric={column.isNumeric}
							>
								{column.render("Header")}
								<chakra.span pl="4">
									{column.isSorted ? (
										column.isSortedDesc ? (
											<TriangleDownIcon aria-label="sorted descending" />
										) : (
											<TriangleUpIcon aria-label="sorted ascending" />
										)
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{rows.length > 0 ? (
					rows.map((row) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<Td
										{...cell.getCellProps()}
										isNumeric={cell.column.isNumeric}
									>
										{cell.render("Cell")}
									</Td>
								))}
							</Tr>
						);
					})
				) : (
					<Tr>
						<Td colSpan={columns?.length} textAlign="center">
							No Data Found
						</Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
};
export default CustomTable;
