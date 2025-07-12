import Footer from "@/components/layouts/footer-layout";

type PageWrapperProps = {
  children: React.ReactNode;
  pageHeader: React.ReactNode;
};
export default function PageWrapper({
  children,
  pageHeader,
}: PageWrapperProps) {
  return (
    <div className="h-full flex flex-col">
      {pageHeader}
      <div className="p-5">{children}</div>
      <Footer />
    </div>
  );
}
