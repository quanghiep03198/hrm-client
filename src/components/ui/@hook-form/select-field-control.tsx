import { cn } from "@/common/utils/cn";
import React, { useId } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import {
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "..";
import { BaseFieldControl } from "./hook-form";
import FormTooltipLabel from "./form-tooltip-label";

export type SelectFieldControlProps<T extends FieldValues> =
	BaseFieldControl<T> &
		React.ComponentProps<typeof Select> & {
			options: Array<{
				label: string;
				value: PathValue<T, Path<T>>;
			}>;
		};

export function SelectFieldControl<T extends FieldValues>(
	props: SelectFieldControlProps<T>
) {
	const {
		control,
		name,
		hidden,
		label,
		layout,
		className,
		defaultValue,
		placeholder,
		messageMode = "tooltip",
		onValueChange,
		...restProps
	} = props;
	const id = useId();
	const { getFieldState } = useFormContext();

	return (
		<FormField
			name={name!}
			control={control}
			render={({ field }) => {
				return (
					<FormItem
						className={cn({
							hidden,
							"grid grid-cols-[1fr_2fr] items-center gap-2 space-y-0":
								layout === "horizontal"
						})}>
						<FormTooltipLabel
							htmlFor={id}
							labelText={String(label)}
							messageMode={messageMode}
						/>
						<Select
							defaultValue={field.value}
							onValueChange={(value) => {
								field.onChange(value);
								if (onValueChange) {
									onValueChange(value);
								}
							}}
							{...restProps}>
							<SelectTrigger
								className={cn("bg-background", className, {
									"!border-destructive focus:!border-destructive focus:!ring-0 active:!border-destructive":
										!!getFieldState(name).error
								})}
								ref={(e) => field.ref(e)}
								id={id}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>

							<SelectContent>
								{Array.isArray(props.options) &&
									props.options.map((option) => (
										<SelectItem
											key={option?.value}
											value={String(option?.value)}>
											{option?.label}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						{props.description && (
							<FormDescription>{props.description}</FormDescription>
						)}
						{messageMode === "text" && <FormMessage />}
					</FormItem>
				);
			}}
		/>
	);
}

SelectFieldControl.displayName = "SelectFieldControl";
SelectFieldControl.defaultProps = {
	placeholder: "Select..."
};
