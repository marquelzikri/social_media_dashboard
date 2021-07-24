function Header(props: any) {
  return (
    <header className="flex justify-end">
      <div className="p-4 bg-white shadow-lg w-44 rounded-2xl dark:bg-gray-800">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-white">
              Charlie
            </span>
            <span className="text-xs text-gray-400">
              Admin
            </span>
          </div>
          <div className="flex-shrink-0">
            <a href="#" className="relative block">
              <img alt="profile" src="https://www.tailwind-kit.com/images/person/1.jpg" className="object-cover w-10 h-10 mx-auto rounded-full " />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
