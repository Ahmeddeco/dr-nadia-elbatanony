"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import SubmitButton from "../shared/SubmitButton"
import { Textarea } from "../ui/textarea"
import MultiSelect from "../shared/MultiSelect"
import ResearchSchema from "@/schemas/ResearchSchema"
import DatePicker from "../shared/DatePicker"
import { editResearchAction } from "@/actions/researchAction"

type Props = {
	professors:
		| {
				id: string
				name: string
		  }[]
		| undefined
	research:
		| ({
				authors: {
					id: string
					name: string
				}[]
		  } & {
				id: string
				title: string
				description: string
				publicationDate: Date
				journal: string
				volume: string
				issue: string
				link: string
				createdAt: Date
				updatedAt: Date
		  })
		| null
		| undefined
}

export default function EditResearch({ professors, research }: Props) {
	const [lastResult, action] = useActionState(editResearchAction, undefined)
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
			<Input type="hidden" value={research?.id} name="id" />

			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={research?.title}
					placeholder="Micro Biology"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ------------------------------- authors ------------------------------- */}
			<MultiSelect
				allSelectedData={professors?.map((prof) => ({ id: prof.id, title: prof.name }))}
				inputName={"authors"}
				label={"authors"}
				defaultValues={research?.authors.map((prof) => ({ id: prof.id, title: prof.name }))}
			/>

			{/* ---------------------------------- description --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea key={fields.description.key} name={fields.description.name} defaultValue={research?.description} />
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ------------------------------ publicationDate ----------------------------- */}
			<DatePicker
				key={fields.publicationDate.key}
				name={fields.publicationDate.name}
				defaultValue={research?.publicationDate.toISOString()}
			/>

			{/* ---------------------------------- journal ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.journal.name}>{fields.journal.name}</FieldLabel>
				<Input
					type="text"
					key={fields.journal.key}
					name={fields.journal.name}
					defaultValue={research?.journal}
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
					defaultValue={research?.volume}
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
					defaultValue={research?.issue}
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
					defaultValue={research?.link}
					placeholder="mb-001"
				/>
				<FieldError>{fields.link.errors}</FieldError>
			</Field>

			<SubmitButton text={"edit research"} />
		</Form>
	)
}
