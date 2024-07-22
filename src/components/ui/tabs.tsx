"use client";
import { ReactNode, Suspense, useState } from "react";

type Tab = {
    title: string,
    content: ReactNode
};

type Tabs = Record<string, Tab>;
type Props = {
    tabs: Tabs
}

export default function Tabs({ tabs }: Props) {
    const [selectedTab, setSelectedTab] = useState<keyof typeof tabs>(() => Object.keys(tabs)[0] as keyof typeof tabs);

    return <>
        <div role="tablist" className="tabs tabs-boxed">
            {
                Object.entries(tabs).map(([key, tab]) => <a
                    key={key}
                    role="tab"
                    className={`tab ${selectedTab === key && "tab-active text-primary"}`}
                    onClick={() => setSelectedTab(key)}
                >
                    {tab.title}
                </a>)
            }
        </div>

        <Suspense fallback={<span>loading...</span>}>
            {tabs[selectedTab]?.content}
        </Suspense>
    </>
};