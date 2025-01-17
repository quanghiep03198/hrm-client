import { cn } from "@/common/utils/cn";
import { Icon } from "@/components/ui";
import React from "react";
import { FormLabel, useFormField } from "../@shadcn/form";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../@shadcn/tooltip";

type FormTooltipLabelProps = {
	labelText: string;
	htmlFor?: string;
	messageMode: "tooltip" | "text";
};

const FormTooltipLabel: React.FC<FormTooltipLabelProps> = ({
	labelText,
	htmlFor,
	messageMode
}) => {
	const { error } = useFormField();

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger
					type='button'
					className='inline-flex items-center gap-x-2'>
					<Icon
						name='TriangleAlert'
						className={cn("stroke-destructive", { hidden: !error })}
					/>
					<FormLabel htmlFor={htmlFor}>{labelText}</FormLabel>
				</TooltipTrigger>
				<TooltipContent
					side='right'
					align='end'
					sideOffset={8}
					hidden={messageMode !== "tooltip" || !error}
					className='bg-destructive'>
					{String(error?.message)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default FormTooltipLabel;
