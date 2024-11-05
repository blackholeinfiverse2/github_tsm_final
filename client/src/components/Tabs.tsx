import { Tab } from "@headlessui/react";
import React, { ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface TabItem {
  title: string;
  icon: ReactNode; // Use ReactNode to allow for JSX elements as icons
}

interface TabsProps {
  tabs: TabItem[];
  setSelected: (index: number) => void;
  children: ReactNode; // This will be the content of the selected tab
}

const Tabs: React.FC<TabsProps> = ({ tabs, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex overflow-x-auto space-x-4 rounded-xl p-1 scrollbar-hide">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "flex items-center outline-none gap-2 px-3 py-2 text-sm md:text-base font-medium leading-5 bg-white",
                  selected
                    ? "text-blue-700 border-b-2 border-blue-600"
                    : "text-gray-800 hover:text-blue-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
