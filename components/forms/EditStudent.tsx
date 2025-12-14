"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { UploadOneImagesDropZone } from "../shared/UploadImagesDropZone"
import SubmitButton from "../shared/SubmitButton"
import StudentSchema, { Student } from "@/schemas/StudentSchema"
import CountryInput from "../shared/CountryInput"
import { editStudentAction } from "@/actions/studentAction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DegreeProgram, Gender } from "@/generated/prisma/enums"

type Props = {
	student: Student
}

export default function EditStudent({ student }: Props) {
	const [lastResult, action] = useActionState(editStudentAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: StudentSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={student.id!} name="id" />
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input
					type="text"
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={student.name}
					placeholder="Ahmed Mohammed"
				/>
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* ---------------------------------- email --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>{fields.email.name}</FieldLabel>
				<Input
					type="email"
					key={fields.email.key}
					name={fields.email.name}
					defaultValue={student.email}
					placeholder="email@example.com"
				/>
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			{/* --------------------------------- mobile --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.mobile.name}>{fields.mobile.name}</FieldLabel>
				<Input
					type="number"
					key={fields.mobile.key}
					name={fields.mobile.name}
					defaultValue={student.mobile}
					placeholder="0123456789"
				/>
				<FieldError>{fields.mobile.errors}</FieldError>
			</Field>

			{/* ------------------------------ degreeProgram ----------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.degreeProgram.name}>degree Program</FieldLabel>
				<Select key={fields.degreeProgram.key} name={fields.degreeProgram.name} defaultValue={student.degreeProgram}>
					<SelectTrigger>
						<SelectValue placeholder={DegreeProgram.master} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(DegreeProgram).map((degreeProgram) => (
							<SelectItem value={degreeProgram} key={degreeProgram}>
								{degreeProgram}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.gender.errors}</FieldError>
			</Field>

			{/* ------------------------------- Gender ------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.gender.name}>{fields.gender.name}</FieldLabel>
				<Select key={fields.gender.key} name={fields.gender.name} defaultValue={student.gender}>
					<SelectTrigger>
						<SelectValue placeholder={Gender.male} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(Gender).map((gender) => (
							<SelectItem value={gender} key={gender}>
								{gender}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.gender.errors}</FieldError>
			</Field>

			{/* --------------------------------- age -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.age.name}>{fields.age.name}</FieldLabel>
				<Input type="number" key={fields.age.key} name={fields.age.name} defaultValue={student.age!} placeholder="35" />
				<FieldError>{fields.age.errors}</FieldError>
			</Field>

			{/* --------------------------- studentIdNumber -------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.studentIdNumber.name}>student Id Number</FieldLabel>
				<Input
					type="number"
					key={fields.studentIdNumber.key}
					name={fields.studentIdNumber.name}
					defaultValue={student.studentIdNumber!}
					placeholder="8934567456"
				/>
				<FieldError>{fields.studentIdNumber.errors}</FieldError>
			</Field>

			{/* ------------------------------- address ------------------------------- */}
			<CountryInput userCity={student.city ?? ""} userCountry={student.country ?? ""} userState={student.state ?? ""} />

			{/* ------------------------------- image ------------------------------ */}
			<UploadOneImagesDropZone
				imageKey={fields.image.key}
				imageName={fields.image.name}
				label={fields.image.name}
				errors={fields.image.errors}
				dbImage={student.image}
			/>

			<SubmitButton text={"edit student"} />
		</Form>
	)
}
