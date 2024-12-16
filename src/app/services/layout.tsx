import SubmitBriefModal from '@/components/ServicePage/SubmitBriefModal';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <SubmitBriefModal />
      <div className="container mx-auto py-32 px-6">{children}</div>
    </div>
  );
}
