import { Card } from "@/components/ui/Card/Card";
import User from "@/components/ui/User/User";
import Image from "next/image";

export const TABS = [
    "For you", "People", "Collaborations", "Services", "Tags"
];

export const EMPTY_RESULTS =
{
    "recent": [],
    "forYou": {
        "people": [],
        "collaborations": [],
        "services": [],
        "tags": [],
    },
    "people": [],
    "collaborations": [],
    "services": [],
    "tags": []
}

export const SEARCH_SECTIONS = [
    { key: 'people', label: 'People', type: 'people' },
    { key: 'collaborations', label: 'Collaborations', type: 'collaborations' },
    { key: 'services', label: 'Services', type: 'services' },
    { key: 'tags', label: 'Tags', type: 'tags' },
];

export const isSearching = (label) => (
    <p className="text-sm color-muted">
        Searching{label ? ` ${label.toLowerCase()}` : '...'}...
    </p>
)

export const noResults = (query, label) => (
    <p className="text-base color-muted/50">
        No results found for <b>{query}</b> {label ? `in ${label.toLowerCase()}` : ''}
    </p>
);

export const startSearching = (label) => (
    <p className="text-base color-subtle">
        Start typing to search {label ? `in ${label.toLowerCase()}` : ''}
    </p>
);

export const errorMsg = (error) => (
    <p className="text-base color-error">
        Error: {error.message || 'An unexpected error occurred.'}
    </p>
)

export const renderUserItem = (user) => (
    <User key={user.id} userName={user.name} avatarUrl={user.imageUrl} />
);

export const renderServiceItem = (s) => (
    // <div key={service.id} className="flex items-center gap-4">
    //     <Image
    //         src={service.image_url}
    //         alt={service.title}
    //         width={48}
    //         height={48}
    //         className="w-12 h-12 rounded-md object-cover"
    //     />
    //     <div className="flex flex-col">
    //         <p className="text-sm font-medium">{service.title}</p>
    //         <p className="text-xs color-subtle">{service.provider}</p>
    //     </div>
    // </div>
    <Card
        key={s.id}
        type="Service" 
        variant="small"
        title={s.title}
        timeAgo={s.time}
        location={s.location}
        serviceIcon={s.tagIcon}
        avatarSrc={s.image_url}
        avatarAlt={s.title}
        authorName={s.provider}
        tag={s.tag}
        description={s.excerpt}
        className="mb-15" />
);

export const renderRecentSearches = (recentSearches) => {
    if (!Array.isArray(recentSearches) || recentSearches.length === 0) {
        return <p className="text-sm color-muted">No recent searches.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {recentSearches.map((search, index) => (
                <div key={index} className="text-sm color-subtle">
                    {search}
                </div>
            ))}
        </div>
    );
};
