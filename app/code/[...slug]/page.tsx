import DsaBrowser from "../../../components/DsaBrowser";
import indexData from "@/data/dsa-index.json";

// Pre-generate static params for every file path so deep links are SSG'd
export function generateStaticParams() {
  const data = indexData as { files: { path: string }[] };
  return data.files.map((f) => ({ slug: f.path.split("/") }));
}

// Next.js 15 App Router infers the prop shape; keep it simple to avoid type constraint issues.
export default function DsaSlugPage(props: unknown) {
  const p = props as { params?: { slug?: string[] } };
  const slugSegments: string[] = p.params?.slug || [];
  const slugPath = slugSegments.join("/");
  return <DsaBrowser initialPath={slugPath} />;
}
