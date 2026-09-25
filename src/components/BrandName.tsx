export function BrandName({ name }: { name: string }) {
  const hasEntity = name.endsWith(" LLC");
  return (
    <>
      {hasEntity ? name.slice(0, -4) : name}
      {hasEntity && <span className="entity-suffix"> LLC</span>}
    </>
  );
}
