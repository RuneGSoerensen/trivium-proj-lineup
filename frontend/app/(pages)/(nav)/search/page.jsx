'use client';
import Input from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { closeOverlay } from '@/utils/helpers';
import { Tabs, TabsList, TabContentList, TabContent, TabItem } from '@/ui/Tab/Tab';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TABS = [
    "For you", "People", "Collaborations", "Services", "Tags"
];

const EMPTY_RESULTS = [
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
]
export default function SearchOverlay() {
    const router = useRouter();
    const handleClose = () => closeOverlay(router);

    // Current search query typed by user
    const [query, setQuery] = useState("");
    // Loading state while fetching search results
    const [isLoading, setIsLoading] = useState(false);
    // Error message shown if API call fails
    const [error, setError] = useState(null);
    // Search resulst grouped by category / tyoe
    const [results, setResults] = useState(EMPTY_RESULTS);
    // List of users latest search terms
    const [recentSearches, setRecentSearches] = useState([]);
    // Ref used for debouncing the API request(s)
    const debounceRef = useRef(null);

    // Triggers when search query changes
    useEffect(() => {
        const trimmed = query.trim();
        // If input empty, reset results and return
        if (trimmed === "") {
            setResults(EMPTY_RESULTS);
            return;
        }
        setIsLoading(true);
        setError(null);
        // Clear any previous debounce timer
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Debounce API call by 300ms
        debounceRef.current = setTimeout(async () => {
            try {
                // Call backend search endpoint
                const response = await fetch(`/api/search?query=${encodeURIComponent(trimmed)}`);
                if (!response.ok) {
                    throw new Error("Failed to search");
                }

                const data = await response.json();
                // Currently: Backend returns only users
                // They are mapped into relevant categories
                setResults({
                    recent: data,
                    forYou: {
                        people: data,
                        collaborations: [], // TODO: Fetch collaborations
                    },
                    people: data,
                    collaborations: [], // TODO: Fetch collabs
                    services: [], // TODO: Fetch services
                    tags: [], // TODO: Fetch tags
                })

                // Save recent searches locally (max 5 unique entries)
                setRecentSearches((prev) => {
                    const next = [trimmed, ...prev.filter((item) => item !== trimmed)];
                    return next.slice(0, 5); // First 5 as recent searche
                })
            } catch (error) {
                console.error("Error while searching:", error);
                setError("Something went wrong while searching");
            } finally {
                setIsLoading(false);
            }
        }, 300);
        //Cleanup debounce timer when query changes or component unmounts
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        }
    }, [query]);

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
        if (isLoading) return <p className="text-sm color-muted">Searching...</p>
        if (error) return <p className="text-sm color-error">{error}</p>

        if (!query.trim()) {
            return (
                <p className="text-sm color-muted">
                    Start typing in search field to find {label.toLowerCase()}.
                </p>
            );
        }
        if (!items || items.length === 0) {
            return (
                <p className="text-sm color-muted">
                    No {label.toLowerCase()} found for &apos;{query.trim()}&apos;.
                </p>
            )
        }
        return <div className="flex flex-col gap-4">{items.map(renderUserItem)}</div>;
    };

    // Renderer for the "For you" tab with grouped selections
    const renderForYou = () => {
        const { people, collaborations, services, tags } = results.forYou;
        const hasAny = people.length || collaborations.length || services.length || tags.length;

        if (isLoading) return <p className="text-sm color-muted">Searching...</p>;
        if (error) return <p className="text-sm color-error">{error}</p>;

        if (!query.trim()) {
            return (
                <p className="text-sm color-muted">
                    Start typing in search field to find relevant results.
                </p>
            );
        }
        if (!hasAny) {
            return (
                <p className="text-sm color-muted">
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
                    {/* Close overlay button */}
                    <Button type="default" variant="ghost" className="mb-4 pl-8! pr-4!" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
            {/* Default state: no tab selected, show recent searches */}
            {!query.trim() && (
                <div className="flex flex-col gap-4 mb-4">
                    <h6 className="text-sm font-semibold color-subtle">Recent</h6>
                    {recentSearches.length === 0 ? (
                        <p className="text-sm color-muted">No recent searches</p>
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
            {/* Tabs navigation */}
            <Tabs>
                <TabsList className="flex gap-8 overflow-x-auto">
                    {TABS.map((tab) => (
                        <TabItem key={tab}>{tab}</TabItem>
                    ))}
                </TabsList>

                <TabContentList>
                    <TabContent>{renderForYou()}</TabContent>
                    <TabContent>{renderPeopleList(results.people, 'People')}</TabContent>
                    <TabContent>{renderPeopleList(results.collaborations, 'Collaborations')}</TabContent>
                    <TabContent>{renderPeopleList(results.services, 'Services')}</TabContent>
                    <TabContent>{renderPeopleList(results.tags, 'Tags')}</TabContent>
                </TabContentList>
            </Tabs>
        </section>
    );
}
