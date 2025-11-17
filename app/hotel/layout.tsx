export default function ItemsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "2px solid #ddd", padding: "1rem" }}>      
      {children}
    </div>
  );
}
