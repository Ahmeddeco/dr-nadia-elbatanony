"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { UploadOneImagesDropZone } from "../shared/UploadImagesDropZone"
import SubmitButton from "../shared/SubmitButton"
import CountryInput from "../shared/CountryInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender } from "@/generated/prisma/enums"
import ProfessorSchema, { Professor } from "@/schemas/ProfessorSchema"
import { editProfessorAction } from "@/actions/professorAction"

type Props = {
	professor: Professor
}

export default function EditProfessor({ professor }: Props) {
	const [lastResult, action] = useActionState(editProfessorAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProfessorSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={professor.id!} name="id" />
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input
					type="text"
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={professor.name}
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
					defaultValue={professor.email}
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
					defaultValue={professor.mobile ?? ""}
					placeholder="0123456789"
				/>
				<FieldError>{fields.mobile.errors}</FieldError>
			</Field>

			{/* ------------------------------- Gender ------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.gender.name}>{fields.gender.name}</FieldLabel>
				<Select key={fields.gender.key} name={fields.gender.name} defaultValue={professor.gender}>
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
				<Input
					type="number"
					key={fields.age.key}
					name={fields.age.name}
					defaultValue={professor.age!}
					placeholder="45"
				/>
				<FieldError>{fields.age.errors}</FieldError>
			</Field>

			{/* ------------------------------- address ------------------------------- */}
			<CountryInput
				userCity={professor.city ?? ""}
				userCountry={professor.country ?? ""}
				userState={professor.state ?? ""}
			/>

			{/* ------------------------------- image ------------------------------ */}
			<UploadOneImagesDropZone
				imageKey={fields.image.key}
				imageName={fields.image.name}
				label={fields.image.name}
				errors={fields.image.errors}
				dbImage={professor.image ?? ""}
			/>

			<SubmitButton text={"edit professor"} />
		</Form>
	)
}
