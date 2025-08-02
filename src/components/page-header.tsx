export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="pb-6">
      <h1 className="text-4xl font-bold tracking-tighter font-headline text-primary sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description && <p className="mt-4 text-lg text-muted-foreground md:text-xl">{description}</p>}
    </div>
  );
}
