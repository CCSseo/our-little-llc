import { ArrowIcon } from "@/components/ArrowIcon";
import type { Brand } from "@/lib/content";
import { Artwork } from "./Artwork";
import { BrandName } from "./BrandName";

export function BrandRow({ brand, index }: { brand: Brand; index: number }) {
  return (
    <a href={`/brands/${brand.slug}`} className="brand-row group">
      <span className="brand-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
      <div className="brand-row-copy">
        <p className="brand-status">{brand.category}</p>
        <h3 className="brand-row-title"><BrandName name={brand.name} /></h3>
        <p className="brand-descriptor">{brand.descriptor}</p>
      </div>
      <Artwork name={`${brand.slug}-premium`} className="brand-row-art" decorative sizes="(max-width: 767px) 1px, 160px" />
      <span className="brand-arrow"><ArrowIcon /></span>
    </a>
  );
}
