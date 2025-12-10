import { CassetteTape, HouseHeart, Palette } from "lucide-react";


export const tagIcons = {
    "Art & Design": <Palette />,
    "Recording & Mixing": <CassetteTape />,
    "Rehearsal Space": <HouseHeart />,
};

// Static service data (can later come from API)
export const services = [
    {
        id: "1",
        provider: "LunaVisuals",
        tagLabel: "Art & Design",
        tag: "art",
        tagIcon: tagIcons["Art & Design"],
        title: "Custom visuals for your next release",
        excerpt:
            "Album covers, tour posters, and stage visuals crafted to reflect your sound and style. Work directly with an artist experienced in branding for musicians.",
        location: "Aarhus",
        time: "4h ago",
        image_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
    {
        id: "2",
        provider: "EchoLab Studios",
        tagLabel: "Recording & Mixing",
        tag: "recording",
        tagIcon: tagIcons["Recording & Mixing"],
        title: "Full-service recording and mixing",
        excerpt:
            "Studio sessions, mixing and mastering by engineers who have worked with indie and electronic acts. Fully equipped live room and vintage gear.",
        location: "Odense",
        time: "1d ago",
        image_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
    {
        id: "3",
        provider: "MusicRock APS",
        tagLabel: "Rehearsal Space",
        tag: "Rehearsal space",
        tagIcon: tagIcons["Rehearsal Space"],
        title: "Rehearsal space for rent in højbjerg",
        excerpt: "3 studio rooms available for rent every day",
        location: "Odense",
        time: "1d ago",
        image_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
];