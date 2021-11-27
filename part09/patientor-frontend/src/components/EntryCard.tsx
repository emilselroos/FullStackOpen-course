import React from 'react';
import { Entry } from '../types';
import { Card } from "semantic-ui-react";

import { useStateValue } from "../state";

interface EntryCardProps {
	entry: Entry,
}

const EntryCard = (props: EntryCardProps) => {

	const [{ diagnosis }] = useStateValue();
	// const colorMapping = [ 'green', 'yellow', 'red', 'pink' ];
	// console.log(diagnosis['Z57.1']);

	switch (props.entry.type) {
		case "OccupationalHealthcare":
			return (
				<Card key={props.entry.date} fluid>
					<h3>{props.entry?.date} - {props.entry.type} - {props.entry.employerName}</h3>
					<p><em>{props.entry?.description}</em></p>
					{props.entry?.diagnosisCodes && props.entry?.diagnosisCodes?.length > 0 && (
						<ul>
							{props.entry?.diagnosisCodes?.map(single => (
								<li key={single}><strong>{single}</strong>{' '}{diagnosis[single].name}</li>
							))}
						</ul>
					)}
				</Card>
			);
		case "HealthCheck":
			return (
				<Card key={props.entry.date} fluid>
					<h3>{props.entry?.date} - {props.entry.type}</h3>
					<p><em>{props.entry?.description}</em></p>
					{props.entry?.diagnosisCodes && props.entry?.diagnosisCodes?.length > 0 && (
						<ul>
							{props.entry?.diagnosisCodes?.map(single => (
								<li key={single}><strong>{single}</strong>{' '}{diagnosis[single].name}</li>
							))}
						</ul>
					)}
					<p>Health Check Rating: {props.entry.healthCheckRating}</p>
					{/** <Icon name="heart" size="large" /> */}
				</Card>
			);
		case "Hospital":
			return (
				<Card key={props.entry.date} fluid>
					<h3>{props.entry?.date} - {props.entry.type}</h3>
					<p><em>{props.entry?.description}</em></p>
					{props.entry?.diagnosisCodes && props.entry?.diagnosisCodes?.length > 0 && (
						<ul>
							{props.entry?.diagnosisCodes?.map(single => (
								<li key={single}><strong>{single}</strong>{' '}{diagnosis[single].name}</li>
							))}
						</ul>
					)}
				</Card>
			);
			default:
				return <div></div>;
	}

};

export default EntryCard;
