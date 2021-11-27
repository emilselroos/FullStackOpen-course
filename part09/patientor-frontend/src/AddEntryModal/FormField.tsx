import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis } from "../types";

// structure of a single option
export type TypeOption = {
	value: string;
	label: string;
};

// structure of a single option
export type HealthCheckOption = {
	value: number,
	label: string,
};

// props for select field component
type TypeSelectFieldProps = {
	name: string;
	label: string;
	options: TypeOption[];
};

type HealthCheckOptionFieldProps = {
	name: string;
	label: string;
	options: HealthCheckOption[];
};




export const TypeSelectField = ({
	name,
	label,
	options
}: TypeSelectFieldProps) => (
	<Form.Field>
		<label>{label}</label>
		<Field as="select" name={name} className="ui dropdown">
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label || option.value}
				</option>
			))}
		</Field>
	</Form.Field>
);

export const HealthSelectField = ({
	name,
	label,
	options
}: HealthCheckOptionFieldProps) => (
	<Form.Field>
		<label>{label}</label>
		<Field as="select" name={name} className="ui dropdown">
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label || option.value}
				</option>
			))}
		</Field>
	</Form.Field>
);



interface TextProps extends FieldProps {
	label: string;
	placeholder: string;
}

export const TextField = ({
	field,
	label,
	placeholder
}: TextProps) => (
	<Form.Field>
		<label>{label}</label>
		<Field placeholder={placeholder} {...field} />
		<div style={{ color: 'red' }}>
			<ErrorMessage name={field.name} />
		</div>
	</Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
	label: string;
	errorMessage?: string;
	min: number;
	max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => (
	<Form.Field>
		<label>{label}</label>
		<Field {...field} type='number' min={min} max={max} />

		<div style={{ color: 'red' }}>
			<ErrorMessage name={field.name} />
		</div>
	</Form.Field>
);

export const DiagnosisSelection = ({
	diagnoses,
	setFieldValue,
	setFieldTouched
}: {
	diagnoses: Diagnosis[];
	setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
	setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
	const field = "diagnosisCodes";
	const onChange = (
		_event: React.SyntheticEvent<HTMLElement, Event>,
		data: DropdownProps
	) => {
		setFieldTouched(field, true);
		setFieldValue(field, data.value);
	};

	const stateOptions = diagnoses.map(diagnosis => ({
		key: diagnosis.code,
		text: `${diagnosis.name} (${diagnosis.code})`,
		value: diagnosis.code
	}));

	return (
		<Form.Field>
			<label>DIAGNOSES</label>
			<Dropdown
				fluid
				multiple
				search
				selection
				options={stateOptions}
				onChange={onChange}
			/>
			<ErrorMessage name={field} />
		</Form.Field>
	);
};
