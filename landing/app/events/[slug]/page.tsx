interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Event: {slug}</h1>
    </div>
  );
}
