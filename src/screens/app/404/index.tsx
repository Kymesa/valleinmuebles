import { HousePlug, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router";

export const Comp404 = () => {
  const navigate = useNavigate();
  return (
    <Empty className="min-h-svh from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <a className="flex items-center gap-2 font-medium">
            <div className="bg-[#7168D3] text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <HousePlug className="size-4" />
            </div>
          </a>
        </EmptyMedia>
        <EmptyTitle>Informacion no encontrada</EmptyTitle>
        <EmptyDescription>
          No existe o no esta disponible en el momento
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => navigate("/auth")} size="sm">
          <ChevronLeft />
          Volver al inicio
        </Button>
      </EmptyContent>
    </Empty>
  );
};
