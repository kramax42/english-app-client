import { useUserWords } from 'hooks';
import { useUserWordsCount } from 'hooks/useUserWords';
import React from 'react';
import { Icon, Menu, Pagination, PaginationProps, Table } from 'semantic-ui-react';
import { Row } from '../Row/Row';
import { RowWithEdit } from '../Row/RowWithEdit';
import { WordsTableProps } from './WordsTable.props';


const defaultWordsPerPageCount = 5;

export const WordsTable = ({ }: WordsTableProps): JSX.Element => {
	const { count } = useUserWordsCount();
	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [skip, setSkip] = React.useState(0);
	const [wordsPerPageCount, setWordsPerPageCount] = React.useState(0);
	const [rowsEditStatus, setRowsEditStatus] = React.useState<boolean[]>([]);

	const { words, loading } = useUserWords(skip, wordsPerPageCount);

	// Pagination logic.
	React.useEffect(() => {
		if (count) {
			const pages = count > defaultWordsPerPageCount ? Number(Math.ceil(count / defaultWordsPerPageCount)) : 1
			setTotalPages(pages);
		}
	}, [count])

	// Logic for correct display rows count.
	React.useEffect(() => {
		let tmpWordsPerPage = 0;
		if (count) {
			if (count < defaultWordsPerPageCount) {
				tmpWordsPerPage = count;
			} else if (page == (totalPages)) { // for last page
				tmpWordsPerPage = count - (page - 1) * defaultWordsPerPageCount;
			} else {
				tmpWordsPerPage = defaultWordsPerPageCount;
			}
		}
		setWordsPerPageCount(tmpWordsPerPage)
		setSkip((page - 1) * tmpWordsPerPage);
		setRowsEditStatus(new Array(tmpWordsPerPage).fill(false))
	}, [page, count])


	// Handlers.
	const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: PaginationProps) => {
		setPage(Number(activePage) || 1);
	}

	const toggleIsEditingNow = (index: number) => {
		setRowsEditStatus(rowsRowsEdit => {
			const newRowsEditStatus = [...rowsEditStatus];
			newRowsEditStatus[index] = !rowsRowsEdit[index];
			return newRowsEditStatus;
		})
	}

	if (loading) {
		return <h1>loadign</h1>
	}

	if (!words?.length) {
		return <h1>No words</h1>
	}

	return (
		<>
			<Table basic style={{ width: '98%', backgroundColor: 'white' }}>
				<Table.Header >
					<Table.Row textAlign='center'>
						<Table.HeaderCell >Id</Table.HeaderCell>
						<Table.HeaderCell >English</Table.HeaderCell>
						<Table.HeaderCell >Transcription</Table.HeaderCell>
						<Table.HeaderCell >Translation</Table.HeaderCell>
						<Table.HeaderCell >Status</Table.HeaderCell>
						<Table.HeaderCell ></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{rowsEditStatus.map((rowEditStatus, index) => {
						console.log(index)
						return rowEditStatus ? (
							<RowWithEdit rowData={words[index]} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						) : (
							<Row rowData={words[index]} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Pagination
								activePage={page}
								onPageChange={handlePaginationChange}
								// boundaryRange={boundaryRange}
								// onPageChange={this.handlePaginationChange}
								// size='mini'
								// siblingRange={siblingRange}
								totalPages={totalPages}
							// // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
							// ellipsisItem={showEllipsis ? undefined : null}
							// firstItem={showFirstAndLastNav ? undefined : null}
							// lastItem={showFirstAndLastNav ? undefined : null}
							// prevItem={showPreviousAndNextNav ? undefined : null}
							// nextItem={showPreviousAndNextNav ? undefined : null}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};
