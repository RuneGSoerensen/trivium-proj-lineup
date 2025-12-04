'use client';
import Input from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { closeOverlay } from '@/utils/helpers';
import { Tabs, TabsList, TabContentList, TabContent, TabItem } from '@/ui/Tab/Tab';
import Image from 'next/image';
import { useSearch } from '@/utils/useSearch';
import { useState } from 'react';

const TABS = [
    "For you", "People", "Collaborations", "Services", "Tags"
];

const EMPTY_RESULTS =
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

export default function SearchOverlay() {
    const router = useRouter();
    const handleClose = () => closeOverlay(router);
    const [activeTab, setActiveTab] = useState(null)
    const {
        query,
        setQuery,
        results,
        isLoading,
        error,
        recentSearches,
    } = useSearch({
        endpoint: "/search",
        minLength: 1,
        debounceMs: 300,
        mapResponse: (data) => ({
            recent: data,
            forYou: {
                people: data,
                collaborations: [],
                services: [],
                tags: [],
            },
            people: data,
            collaborations: [],
            services: [],
            tags: [],
        }),
    });

    const renderUserItem = (user) => (
        <div
            key={user.id}
            className="flex items-center gap-8 py-4 border-b border-muted last:border-b-0">
            {user.imageUrl ? (
                <Image
                    src={user.imageUrl}
                    alt={`${user.name}'s profile picture`}
                    width={40}
                    height={40}
                    className="h-32 w-32 rounded-full object-cover bg-alt"
                />
            ) : (
                <div className="h-32 w-32 rounded-full bg-alt flex items-center justify-center color-muted font-semibold">
                    {user.name?.[0]?.toUpperCase() ?? '?'}
                </div>
            )}
            <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                {user.position && (
                    <span className="text-xs color-muted">{user.position}</span>
                )}
            </div>
        </div>
    )

    // Generic handler used by People, Services, Tags, etc.
    const renderPeopleList = (items, label) => {
        if (isLoading) return <p className="text-sm color-muted/40">Searching...</p>
        if (error) return <p className="text-base color-error">{error}</p>

        if (!items || items.length === 0) {
            return (
                <p className="text-base color-muted/50">
                    No {label.toLowerCase()} found for &apos;{query.trim()}&apos;.
                </p>
            )
        }
        return <div className="flex flex-col gap-4">{items.map(renderUserItem)}</div>;
    };

    // Renderer for the "For you" tab with grouped selections
    const renderForYou = () => {
        const { people, collaborations, services, tags } = results?.forYou || EMPTY_RESULTS.forYou;
        const hasAny = people.length || collaborations.length || services.length || tags.length;

        if (isLoading) return <p className="text-sm color-muted/40">Searching...</p>;
        if (error) return <p className="text-sm color-error">{error}</p>;

        if (!hasAny && activeTab) {
            return (
                <p className="text-base color-muted/50">
                    No results found for &apos;{query.trim()}&apos;.
                </p>
            );
        }
        return (
            <div className="flex flex-col gap-12">
                {people.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h6 className="text-h6">People</h6>
                        <div className="flex flex-col gap-4">
                            {people.map(renderUserItem)}
                        </div>
                    </section>
                )}
            </div>
        )
    };

    return (
        <section className="fixed inset-0 bg-default z-50 p-12 flex flex-col gap-8" role='overlay'>
            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center gap-8">
                    <div className="relative grow mb-4">

                        {/* Search Input */}
                        <Input
                            icon={<Search size={18} stroke="var(--color-base-content)" strokeWidth={2} />}
                            type="text"
                            placeholder="Search"
                            className="grow mb-4 py-6 bg-muted/30 border-0 placeholder:color-muted/90"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {query && (
                            <Button
                                icon={<X />}
                                type="icon"
                                variant="ghost"
                                className="absolute right-8 top-0 text-sm color-muted hover:color-default hover:bg-transparent"
                                onClick={() => setQuery('')}
                                aria-label="Clear search"
                            />

                        )}
                    </div>
                    {/* Close overlay button */}
                    <Button type="default" variant="ghost" className="mb-4 pl-8! pr-4!" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
            {/* Tabs navigation */}
            <Tabs>
                <TabsList className="flex overflow-x-auto p-0! justify-start">
                    {/* TODO: remove tab separator */}
                    {TABS.map((tab) => (
                        <TabItem
                            key={tab}
                            className="flex w-fit px-0! gap-4 color-muted/80 font-normal! focus:underline! focus:font-normal!"
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </TabItem>
                    ))}
                </TabsList>

                <TabContentList className="search-tabs">
                    <TabContent>{renderForYou()}</TabContent>
                    <TabContent>{renderPeopleList(results?.people, 'People')}</TabContent>
                    <TabContent>{renderPeopleList(results?.collaborations, 'Collaborations')}</TabContent>
                    <TabContent>{renderPeopleList(results?.tags, 'Tags')}</TabContent>
                    <TabContent>{renderPeopleList(results?.services, 'Services')}</TabContent>
                </TabContentList>
            </Tabs>
            {/* Default state: no tab selected, show recent searches */}
            {!query.trim() && !activeTab && (
                <div className="flex flex-col gap-4 mb-4">
                    <h5 className="text-sm color-muted/50">Recent</h5>
                    {recentSearches.length === 0 ? (
                        <p className="text-base color-muted/30">No recent searches</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {recentSearches.map((term) => (
                                <Button
                                    key={term}
                                    variant="ghost"
                                    className="px-8 py-4 text-sm"
                                    onClick={() => setQuery(term)}
                                >
                                    {term}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
