// app/(public)/layout.js

export default function PublicLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {children}
    </main>
  );
}