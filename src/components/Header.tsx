import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full py-8 px-8 md:px-16 z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-[22px] tracking-wide text-white">
          <Link href="/">Hema</Link>
        </div>
      </div>
    </header>
  );
}
