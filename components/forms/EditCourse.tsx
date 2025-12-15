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
import { addCourseAction } from "@/actions/courseAction"
import { Textarea } from "../ui/textarea"
import CourseSchema, { Course } from "@/schemas/CourseSchema"

type Props = {
	course: Course
}

export default function EditCourse({ course }: Props) {
	const [lastResult, action] = useActionState(addCourseAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CourseSchema })
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
					defaultValue={course.title}
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
					defaultValue={course.author}
					placeholder="Micro Biology"
				/>
				<FieldError>{fields.author.errors}</FieldError>
			</Field>

			{/* ---------------------------------- description --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea key={fields.description.key} name={fields.description.name} defaultValue={course.description ?? ""} />
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ---------------------------------- code ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.code.name}>{fields.code.name}</FieldLabel>
				<Input
					type="text"
					key={fields.code.key}
					name={fields.code.name}
					defaultValue={course.code}
					placeholder="mb-001"
				/>
				<FieldError>{fields.code.errors}</FieldError>
			</Field>

			{/* --------------------------------- level -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.level.name}>level</FieldLabel>
				<Select key={fields.level.key} name={fields.level.name} defaultValue={course.level}>
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
				<FieldError>{fields.level.errors}</FieldError>
			</Field>

			<SubmitButton text={"edit course"} />
		</Form>
	)
}
