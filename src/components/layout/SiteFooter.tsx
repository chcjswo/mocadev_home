export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-gray-900">© {new Date().getFullYear()} MokaDev</p>
          <p>생활을 바꾸는 작은 실험실</p>
        </div>
      </div>
    </footer>
  );
}
