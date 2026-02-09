interface SchemePageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchemePage({ params }: SchemePageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Scheme: {slug}</h1>
    </div>
  );
}
