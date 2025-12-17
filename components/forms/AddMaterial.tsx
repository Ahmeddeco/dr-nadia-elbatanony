"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import SubmitButton from "../shared/SubmitButton"
import { Textarea } from "../ui/textarea"
import CourseMaterialSchema from "@/schemas/materialSchema"
import MultiSelect from "../shared/MultiSelect"
import { addMaterialAction } from "@/actions/materialAction"

type Props = {
	allCourses: {
		id: string
		title: string
	}[]
}

export default function AddMaterial({ allCourses }: Props) {
	const [lastResult, action] = useActionState(addMaterialAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CourseMaterialSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={fields.title.initialValue}
					placeholder="Micro Biology"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* --------------------------------- author --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.author.name}>{fields.author.name}</FieldLabel>
				<Input
					type="text"
					key={fields.author.key}
					name={fields.author.name}
					defaultValue="Dr.Nadia Elbatanony"
					placeholder="Dr.Nadia Elbatanony"
				/>
				<FieldError>{fields.author.errors}</FieldError>
			</Field>

			{/* ---------------------------------- description --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea
					key={fields.description.key}
					name={fields.description.name}
					defaultValue={fields.description.initialValue}
				/>
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ---------------------------------- url ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.url.name}>{fields.url.name}</FieldLabel>
				<Input
					type="url"
					key={fields.url.key}
					name={fields.url.name}
					defaultValue={fields.url.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.url.errors}</FieldError>
			</Field>

			<MultiSelect allSelectedData={allCourses} inputName={"courses"} label={"courses"} />

			<SubmitButton text={"add material"} />
		</Form>
	)
}
