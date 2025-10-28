export function JsonLd({ json }: { json: object }) {
  const script = JSON.stringify(json);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: script }} />;
}
