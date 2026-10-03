import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-base-850 group-[.toaster]:text-ink-100 group-[.toaster]:border-base-700 group-[.toaster]:shadow-card",
          description: "group-[.toast]:text-ink-300",
          actionButton: "group-[.toast]:bg-gold-gradient group-[.toast]:text-base-950",
          cancelButton: "group-[.toast]:bg-base-700 group-[.toast]:text-ink-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
