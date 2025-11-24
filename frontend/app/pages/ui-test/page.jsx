'use client';

import { Button, IconButton } from "@/app/components/ui/Button";
import { ServiceCard } from "@/app/components/ui/Card";
import { TabItem, TabsList } from "@/app/components/ui/Tabs";
import { Tag } from "@/app/components/ui/Tag";
import Image from "next/image";

export default function TestPage() {
    //Temporary icon import for IconButton
    const iconSrc = (
        <Image src="/icons/plus.svg" alt="Add" width={14} height={14} />
    );

    return (
        <article className="trvm-page">
            <Button>Primary</Button>
            <Button variant="secondary" onClick={() => alert("Clicked!")}>
                Secondary
            </Button>

            <IconButton icon={iconSrc} variant="primary" size="sm" />

            <Tag className="mr-2" variant="outlined">Tag</Tag>

            <TabsList>
                <TabItem>Overview</TabItem>
                <TabItem>Details</TabItem>
                <TabItem>Settings</TabItem>
            </TabsList>


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
