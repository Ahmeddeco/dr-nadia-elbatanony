"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import SubmitButton from "../shared/SubmitButton"
import { Textarea } from "../ui/textarea"
import MaterialSchema from "@/schemas/materialSchema"
import { editMaterialAction } from "@/actions/materialAction"
import MultiSelect from "../shared/MultiSelect"
import { getOneMaterialType } from "@/types/materialTypes"

export default function EditMaterial({
	defaultValues,
	allCourses,
}: {
	defaultValues: getOneMaterialType
	allCourses:
		| {
				id: string
				title: string
				code: string
		  }[]
		| undefined
}) {
	const [lastResult, action] = useActionState(editMaterialAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: MaterialSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={defaultValues?.id} name="id" />

			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={defaultValues?.title}
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
					defaultValue={defaultValues?.author}
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
					defaultValue={defaultValues?.description ?? ""}
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
					defaultValue={defaultValues?.url}
					placeholder="mb-001"
				/>
				<FieldError>{fields.url.errors}</FieldError>
			</Field>

			<MultiSelect
				allSelectedData={allCourses}
				inputName={"courses"}
				label={"courses"}
				defaultValues={defaultValues?.course}
			/>

			<SubmitButton text={"edit material"} />
		</Form>
	)
}
