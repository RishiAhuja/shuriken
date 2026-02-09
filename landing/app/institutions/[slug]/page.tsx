interface InstitutionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InstitutionPage({
  params,
}: InstitutionPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Institution: {slug}</h1>
    </div>
  );
}
