"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import SubmitButton from "../shared/SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DegreeProgram } from "@/generated/prisma/enums"
import { Textarea } from "../ui/textarea"
import MultiSelect from "../shared/MultiSelect"
import { addResearchAction } from "@/actions/researchAction"
import ResearchSchema from "@/schemas/ResearchSchema"
import DatePicker from "../shared/DatePicker"

type Props = {
	professors:
		| {
				id: string
				name: string
		  }[]
		| undefined
}

export default function AddResearch({ professors }: Props) {
	const [lastResult, action] = useActionState(addResearchAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ResearchSchema })
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

			{/* ------------------------------- authors ------------------------------- */}
			<MultiSelect
				allSelectedData={professors?.map((prof) => ({ id: prof.id, title: prof.name }))}
				inputName={"authors"}
				label={"authors"}
			/>

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

			{/* ------------------------------ DatePicker ----------------------------- */}
			<DatePicker
				key={fields.publicationDate.key}
				name={fields.publicationDate.name}
				defaultValue={fields.publicationDate.initialValue}
			/>

			{/* ---------------------------------- journal ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.journal.name}>{fields.journal.name}</FieldLabel>
				<Input
					type="text"
					key={fields.journal.key}
					name={fields.journal.name}
					defaultValue={fields.journal.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.journal.errors}</FieldError>
			</Field>

			{/* ---------------------------------- volume ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.volume.name}>{fields.volume.name}</FieldLabel>
				<Input
					type="text"
					key={fields.volume.key}
					name={fields.volume.name}
					defaultValue={fields.volume.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.volume.errors}</FieldError>
			</Field>

			{/* ---------------------------------- issue ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.issue.name}>{fields.issue.name}</FieldLabel>
				<Input
					type="text"
					key={fields.issue.key}
					name={fields.issue.name}
					defaultValue={fields.issue.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.issue.errors}</FieldError>
			</Field>

			{/* ---------------------------------- link ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.link.name}>{fields.link.name}</FieldLabel>
				<Input
					type="url"
					key={fields.link.key}
					name={fields.link.name}
					defaultValue={fields.link.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.link.errors}</FieldError>
			</Field>

			<SubmitButton text={"add research"} />
		</Form>
	)
}
