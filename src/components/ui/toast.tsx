import { toast } from "sonner";

export const toasts = (descripcion, title?: string) =>
  toast(title ?? "Notificacion", {
    description: descripcion,
    action: {
      label: "Entendido",
      onClick: () => {},
    },
    cancelButtonStyle: { backgroundColor: "#7168D3" },
    position: "top-center",
    actionButtonStyle: { backgroundColor: "#7168D3", borderRadius: 20 },
    style: { borderRadius: 20, backgroundColor: "white" },
  });
