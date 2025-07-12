import PageHeader from "@/components/page-header";
import PageWrapper from "@/components/page-wrapper";
import { LayoutDashboard } from "lucide-react";

export default function HomePage() {
  return (
    <PageWrapper
      pageHeader={
        <PageHeader
          icon={<LayoutDashboard className="w-8 h-8" />}
          title="Beranda"
        />
      }
    >
      <p className="text-gray-500">
        Selamat datang di halaman utama portalDJKA!
      </p>
    </PageWrapper>
  );
}
