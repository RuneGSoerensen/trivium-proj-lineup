'use client';

import {Button} from "@/components/ui/Button/Button";
import { ServiceCard } from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import { TabContent, TabContentList, TabItem, Tabs, TabsList } from "@/components/ui/Tab/Tab";
import { Tag } from "@/components/ui/Tag/Tag";
import Image from "next/image";
import { Angry, ArrowLeftCircle, Apple, MoreVertical, MoonIcon, ChevronDownIcon } from "lucide-react";
import React from "react";

const documentElement = typeof window !== "undefined" ? window.document.documentElement : null;
const dataTheme = documentElement ? documentElement.getAttribute("data-theme") : null;
const isDark = dataTheme === "lineup-dark";
const toggleTheme = () => {
    const newTheme = isDark ? "lineup-light" : "lineup-dark";
    document.documentElement.setAttribute("data-theme", newTheme);
};
export default function TestPage() {

    return (
        <article className="space-y-12">
            <Button rightIcon={<Angry />}>Primary</Button>
            <Button leftIcon={<Apple fill="inherit" />} variant="secondary" onClick={() => alert("Clicked!")}>
                Secondary
            </Button>
            <Button size="sm" variant="glass">Glass Button</Button>

            <Button
                type="dropdown"
                rightIcon={<ChevronDownIcon />}
                dropdownitems={
                    <ul className="flex flex-col">
                        <li className="py-4 hover:bg-base-200 px-4 rounded">Item 1</li>
                        <li className="py-4 hover:bg-base-200 px-4 rounded">Item 2</li>
                        <li className="py-4 hover:bg-base-200 px-4 rounded">Item 3</li>
                    </ul>
                }
            />


            <Tag checkable={true} onCheckableChange={(checked) => console.log("Tag checked:", checked)} className="mr-2">Checkable tag</Tag>
            <Tag>Tag</Tag>

            <Tabs>
                <TabsList>
                    <TabItem>Overview</TabItem>
                    <TabItem>Details</TabItem>
                    <TabItem>Settings</TabItem>
                </TabsList>
                <TabContentList className="mt-4">
                    <TabContent>
                        <p>Overview content goes here.</p>
                    </TabContent>
                    <TabContent>
                        <p>Details content goes here.</p>
                    </TabContent>
                    <TabContent>
                        <p>Settings content goes here.</p>
                    </TabContent>
                </TabContentList>
            </Tabs>

            <Input placeholder="Enter your name" label="Name" />


            <ServiceCard
                avatarSrc="/icons/chat.svg"
                avatarAlt="LunaVisuals"
                authorName="LunaVisuals"
                tag="offers #art"
                title="Custom visuals for your next release"
                imageAlt="Band artwork"
                description="Album covers, tour posters, and stage visuals crafted to reflect your sound and style. Work directly with an artist…"
                ctaLabel="Read more"
                location="Aarhus"
                timeAgo="4h ago"
            />

        </article>
    );
}
