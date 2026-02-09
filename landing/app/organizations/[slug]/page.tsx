interface OrganizationPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganizationPage({
  params,
}: OrganizationPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Organization: {slug}</h1>
    </div>
  );
}
