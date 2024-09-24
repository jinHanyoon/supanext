export default function Footer() {

  return (
    <footer className="rounded-lg shadow">
    <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowra text-white"></span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/" className="hover:underline me-4 md:me-6"></a>
                </li>
                <li>
                    <a href="/" className="hover:underline me-4 md:me-6"></a>
                </li>
                <li>
                    <a href="/" className="hover:underline me-4 md:me-6"></a>
                </li>
                <li>
                    <a href="/" className="hover:underline"></a>
                </li>
            </ul>
        </div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"> <a href="https://flowbite.com/" className="hover:underline"></a></span>
    </div>
</footer>
  );
}
