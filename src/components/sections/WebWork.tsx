import ProjectShowcase from "@/components/ProjectShowcase";
import SectionHeading from "@/components/SectionHeading";

export default function WebWork() {
  return (
    <section id="web-products" aria-labelledby="web-products-title" className="scroll-mt-24 py-20 md:py-28">
      <SectionHeading id="web-products-title" index="05" eyebrow="Web products" title="Websites I’ve built for businesses">
        End-to-end delivery for small brands: an installable PWA catalogue, a web-3D studio site and a multilingual storefront.
      </SectionHeading>
      <ProjectShowcase />
    </section>
  );
}
