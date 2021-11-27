import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Container, Table, TableCell, Button } from "semantic-ui-react";

import EntryCard from '../components/EntryCard';

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Patient } from '../types';
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from '../constants';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {

	const { id } = useParams<{ id: string }>();
	const [{ patient }, dispatch] = useStateValue();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	React.useEffect(() => {

		// patient

		const fetchPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

				// console.log(patientFromApi);

				dispatch(setPatient(patientFromApi));

			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatient();

	}, [dispatch]);

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const { data: newEntry } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch({ type: "SET_PATIENT", payload: newEntry });
			closeModal();
		} catch (e) {
			console.error(e);
			// setError(e.response?.data?.error || 'Unknown error');
			setError('Unkown error');
		}
	};

	return (
		<div>
			<Container textAlign="center">
				<h3>Patient</h3>
			</Container>
			<Table celled>
				<Table.Body>

					<Table.Row>
						<TableCell>
							{patient?.name}
						</TableCell>
					</Table.Row>

					<Table.Row>
						<TableCell>
							{patient?.dateOfBirth}
						</TableCell>
					</Table.Row>

					<Table.Row>
						<TableCell>
							{patient?.gender}
						</TableCell>
					</Table.Row>

					<Table.Row>
						<TableCell>
							{patient?.occupation}
						</TableCell>
					</Table.Row>

					<Table.Row>
						<TableCell>
							{patient?.ssn}
						</TableCell>
					</Table.Row>

				</Table.Body>
			</Table>

			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>

			<Button onClick={() => openModal()}>Add New Entry</Button>

			{patient?.entries.map((entry) => (
				<EntryCard key={entry.date} entry={entry} />
			))}

		</div>
	);
};

export default PatientPage;
