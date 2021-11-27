import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
	part: CoursePart,
}

const Part = (props: PartProps) => {

	switch (props.part.type) {
		case "normal":
			return (
				<div>
					<p><strong>{props.part.name} ({props.part.exerciseCount})</strong></p>
					<p><em>{props.part.description}</em></p>
				</div>
			);
		case "groupProject":
			return (
				<div>
					<p><strong>{props.part.name} ({props.part.exerciseCount})</strong></p>
					<p>Project exercises: {props.part.groupProjectCount}</p>
				</div>
			);
		case "submission":
			return (
				<div>
					<p><strong>{props.part.name} ({props.part.exerciseCount})</strong></p>
					<p><em>{props.part.description}</em></p>
					<p>Submit to: {props.part.exerciseSubmissionLink}</p>
				</div>
			);
		case "special":
			return (
				<div>
					<p><strong>{props.part.name} ({props.part.exerciseCount})</strong></p>
					<p><em>{props.part.description}</em></p>
					<p>Required skills: {props.part.requirements.join(', ')}</p>
				</div>
			);
	}
}

export default Part;
