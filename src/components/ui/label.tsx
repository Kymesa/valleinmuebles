import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  subtitle,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  subtitle?: boolean;
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
          subtitle ? `text-[#17143380]` : "text-[#171433]"
        }`,
        className
      )}
      {...props}
    />
  );
}

export { Label };
