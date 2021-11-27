import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, TypeSelectField, HealthSelectField, TypeOption, DiagnosisSelection, HealthCheckOption } from "./FormField";
import { Entry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

const typeOptions: TypeOption[] = [
	{ value: "Hospital", label: "Hospital" },
	{ value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
	{ value: "HealthCheck", label: "HealthCheck" },
];

const healthCheckOptions: HealthCheckOption[] = [
	{ value: 0, label: "0 = Healthy" },
	{ value: 1, label: "1 = Low Risk" },
	{ value: 2, label: "2 = High Risk" },
	{ value: 3, label: "3 = Critical Risk" },
];

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

	const [{ diagnosis }] = useStateValue();

	return (
		<Formik
			initialValues={{
				type: "HealthCheck",
				description: "",
				date: "",
				specialist: "",
			}}
			onSubmit={onSubmit}
			validate={values => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<TypeSelectField
							label="TYPE"
							name="type"
							options={typeOptions}
						/>
						<Field
							label="DESCRIPTION"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<Field
							label="DATE"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="SPECIALIST"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>

						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>

						<HealthSelectField
							label="HEALTH CHECK RATING"
							name="healthCheckRating"
							options={healthCheckOptions}
						/>

						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
									Add entry
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
