import { cn } from "@/lib/utils";

export function TypographyH1({ children, className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(["my-3  text-5xl font-extrabold tracking-tight text-balance", className])}
      {...props}
    >
      {children}
    </h1>
  );
}
export function TypographyH2({ children, className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn([" border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className])}
      {...props}
    >
      {children}
    </h2>
  );
}
export function TypographyH3({ children, className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn([" text-2xl font-semibold tracking-tight", className])} {...props}>
      {children}
    </h3>
  );
}
export function TypographyH4({ children, className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn([" text-xl font-semibold tracking-tight", className])} {...props}>
      {children}
    </h4>
  );
}

export function TypographyP({ children, className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn([className])} {...props}>
      {children}
    </p>
  );
}
