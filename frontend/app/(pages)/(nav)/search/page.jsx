'use client';
import Input from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { closeOverlay } from '@/utils/helpers';
import { Tabs, TabsList, TabContentList, TabContent, TabItem } from '@/ui/Tab/Tab';
import Image from 'next/image';
import { useSearch } from '@/utils/useSearch';
import { useCallback, useMemo, useState } from 'react';
import User from '@/ui/User/User';

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

const isSearching = () => <p className="text-sm color-muted">Searching...</p>;

const noResults = (query, label) => (
    <p className="text-base color-muted/50">
        No {label.toLowerCase()} found for &apos;{query.trim()}&apos;
    </p>
);

const startSearching = (label) => (
    <p className="text-base color-subtle">
        Start typing to search {label.toLowerCase()}.
    </p>
);

const errorMsg = (error) => (
    <p className="text-base color-error">{error}</p>
)

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
        <User key={user.id} userName={user.name} avatarUrl={user.imageUrl} />
    );

    // Generic handler used by People, Services, Tags, etc.
    const renderPeopleList = (items, label) => {
        const trimmedQuery = query.trim();
        const hasItems = Array.isArray(items) && items.length > 0;

        if (!hasItems) {
            if (!trimmedQuery) {
                return startSearching(label);
            }
            // First-time search in progress (no previous results) -> show searching
            if (isLoading && !error && results === null) {
                return isSearching();
            }
            // Error with no items -> show error
            if (error) {
                return errorMsg(error);
            }

            // At this point:
            // - there IS a query
            // - we are NOT loading
            // - there is NO error
            // - and there are NO items
            // => show noResults for this tab
            return noResults(trimmedQuery, label);
        }


        if (error && !isLoading) {
            return errorMsg(error);
        }

        // Only map when items is a non-empty array
        return <div className="flex flex-col gap-4">
            <section className="flex flex-col gap-8">
                <p className="text-sm font-medium">People</p>
                <div className="flex flex-col gap-4">
                    {items.map(renderUserItem)}
                </div>
            </section></div>;
    };

    // Renderer for the "For you" tab with grouped selections
    const forYouData = useMemo(() => results?.forYou || EMPTY_RESULTS.forYou, [results]);

    const renderForYou = () => {
        const { people, collaborations, services, tags } = forYouData;
        const hasAny = people.length || collaborations.length || services.length || tags.length;
        const trimmedQuery = query.trim();

        if (!hasAny) {
            if (!trimmedQuery) {
                return null
            };
            if (isLoading && !error && results === null) {
                return isSearching("For you")
            };

            if (error) return errorMsg(error);

            return noResults(trimmedQuery, "results")

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
        <section className="fixed inset-0 bg-default z-60 p-12 flex flex-col gap-8" role='dialog' aria-modal='true' aria-labelledby='search-overlay'>
            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center gap-8">
                    <div className="relative grow mb-4" id="search-overlay">
                        {/* Search Input */}
                        <Input
                            icon={<Search size={18} stroke="var(--color-neutral-medium)" strokeWidth={2} />}
                            type="text"
                            placeholder="Search"
                            className="placeholder:text-left! flex py-6 bg-muted/30 border-0 placeholder:color-muted/90"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search input"
                        />
                        {query && (
                            <Button
                                icon={<X />}
                                type="icon"
                                iconSize='md'
                                variant="ghost"
                                className="absolute right-0 top-1/2 translate-y-[-50%] text-sm color-subtle hover:color-default hover:bg-transparent"
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
            <Tabs isActive={activeTab !== null} defaultActiveTab={TABS[0]} onTabChange={(tab) => setActiveTab(tab)} activeClassName="search-tabs">
                <TabsList className="flex p-0! gap-24 ">
                    {/* TODO: remove tab separator */}
                    {TABS.map((tab) => (
                        <TabItem
                            key={tab}
                            className="flex justify-start p-0! px-0! w-fit "
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </TabItem>
                    ))}
                </TabsList>

                <TabContentList className="search-tabs-content">
                    <TabContent>{renderForYou()}</TabContent>
                    <TabContent>{renderPeopleList(results?.people, 'People')}</TabContent>
                    <TabContent>{renderPeopleList(results?.collaborations, 'Collaborations')}</TabContent>
                    <TabContent>{renderPeopleList(results?.services, 'Services')}</TabContent>
                    <TabContent>{renderPeopleList(results?.tags, 'Tags')}</TabContent>
                </TabContentList>
            </Tabs>
            {/* Default state: no tab selected, show recent searches */}
            {!query.trim() && !activeTab && (
                <div className="flex flex-col gap-4 mb-4">
                    <h5 className="text-sm color-muted/50">Recent</h5>
                    {recentSearches.length === 0 ? (
                        <p className="text-base color-muted/30">No recent searches</p>
                    ) : (
                        <div className="flex flex-col justify-start items-start gap-4">
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
            )
            }
        </section>
    );
}
