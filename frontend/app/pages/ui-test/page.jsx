'use client';

import { Button, IconButton } from "@/app/components/ui/Button";
import { ServiceCard } from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";
import { TabItem, TabsList } from "@/app/components/ui/Tabs";
import { Tag } from "@/app/components/ui/Tag";
import Image from "next/image";
import { Angry } from "lucide-react";
import { AngryIcon } from "lucide-react";

export default function TestPage() {
    //Temporary icon import for IconButton


    return (
        <article className="trvm-page">
            <Button strokeW="md" iconSz="lg" rightIcon={<AngryIcon />}>Primary</Button>
            <Button leftIcon={<AngryIcon />} variant="secondary" onClick={() => alert("Clicked!")}>
                Secondary
            </Button>

            <IconButton stroke="sm" icon={<Angry/>} />

            <Tag checkable={true} onCheckableChange={(checked) => console.log("Tag checked:", checked)} className="mr-2">Tag</Tag>
            <Tag variant="outlined">Tag</Tag>

            <TabsList className="tabs--list">
                <TabItem>Overview</TabItem>
                <TabItem>Details</TabItem>
                <TabItem>Settings</TabItem>
            </TabsList>

            <Input variant="disabled" placeholder="Enter your name" label="Name" />


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
