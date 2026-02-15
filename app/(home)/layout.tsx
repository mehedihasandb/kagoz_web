import Header from "@/components/Header";
export const metadata = {
  title: "BOF Golf Club",
  description: "Welcome to BOF Golf Club Gazipur",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-monda">
      <Header />
      {children}
    </main>
  );
}
