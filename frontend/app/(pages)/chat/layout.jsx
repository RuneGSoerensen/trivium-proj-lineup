'use client';

export default function ChatLayout({ children }) {
    return (
      <section className="flex flex-col w-full h-full bg-brand-secondary">
        {children}
      </section>
  )
}