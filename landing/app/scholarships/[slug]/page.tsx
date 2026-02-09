interface ScholarshipPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ScholarshipPage({
  params,
}: ScholarshipPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Scholarship: {slug}</h1>
    </div>
  );
}
