'use client';

import { Button, IconButton } from "@/app/components/ui/Button/Button";
import { ServiceCard } from "@/app/components/ui/Card/Card";
import Input from "@/app/components/ui/Input/Input";
import { TabItem, TabsList } from "@/app/components/ui/Tab/Tab";
import { Tag } from "@/app/components/ui/Tag/Tag";
import Image from "next/image";
import { Angry } from "lucide-react";
import { Apple } from "lucide-react";

export default function TestPage() {


    return (
        <article className="trvm-page">
            <Button rightIcon={<Angry />} rightIconSize="md" rightIconStroke="sm">Primary</Button>
            <Button leftIcon={<Apple fill="inherit" />} variant="secondary" onClick={() => alert("Clicked!")}>
                Secondary
            </Button>
            <Button variant="glass">Glass Button</Button>

            <IconButton stroke="sm" icon={<Angry/>} />

            <Tag checkable={true} onCheckableChange={(checked) => console.log("Tag checked:", checked)} className="mr-2">Checkable tag</Tag>
            <Tag variant="outlined">Tag</Tag>

            <TabsList>
                <TabItem>Overview</TabItem>
                <TabItem>Details</TabItem>
                <TabItem>Settings</TabItem>
            </TabsList>

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
