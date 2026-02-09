interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Job: {slug}</h1>
    </div>
  );
}
