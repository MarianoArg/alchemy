import Logo, { Iso } from "~/components/shared/Logo";
import ComponentSection from "./ComponentSection";

export default function Sidebar() {
  return (
    <aside className="w-14 md:w-80 bg-white shadow-md h-full flex flex-col transition-all duration-300 border-none py-6 px-4 overflow-hidden">
      <div className="flex items-center justify-start space-x-4 p-2 mb-5">
        <Iso />
        <Logo className="hidden md:block" />
      </div>
      <div className="flex flex-col">
        <ul className="space-y-2 text-base">
          <li>
            <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-sky-50 focus:shadow-outline">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </span>
              <span className="font-semibold">Components</span>
            </div>
            <div className="space-x-4 p-2 my-2">
              <ComponentSection />
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
