'use client';
import Input from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { closeOverlay } from '@/utils/helpers';
import { Tabs, TabsList, TabContentList, TabContent, TabItem } from '@/ui/Tab/Tab';
import { useSearch } from '@/utils/useSearch';
import { useEffect, useMemo, useState } from 'react';
import {
    SEARCH_SECTIONS,
    TABS,
    EMPTY_RESULTS,
    isSearching,
    noResults,
    startSearching,
    errorMsg,
    renderUserItem,
    renderServiceItem,
} from './searchResults';
import { services as SERVICE_DATA } from '@/(pages)/services/serviceData';
import { getUserId } from '@/utils/auth';


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
                services: SERVICE_DATA,
                tags: [],
            },
            people: data,
            collaborations: [],
            services: SERVICE_DATA,
            tags: [],
        }),
    });

    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        getUserId().then(setCurrentUserId);
    }, []);


    // Generic handler used by People, Services, Tags, etc.
    const renderList = (items, label, type) => {
        const trimmedQuery = query.trim();

        const itemsArray = Array.isArray(items) ? items : [];
        const hasItems = itemsArray.length > 0;

        // Filter out current user from people results
        const filteredItems =
            type === "people" && currentUserId
                ? itemsArray.filter((user) => user.id !== currentUserId)
                : itemsArray;

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

        // CHOOSE RENDERER BASED ON TYPE
        let renderItem;
        switch (type) {
            case "people":
                renderItem = renderUserItem;
                break;
            case "services":
                renderItem = renderServiceItem;
                break;
            default:
                renderItem = (item) => (
                    <div key={item.id || item.slug || item.name}>
                        {item.title || item.name || JSON.stringify(item)}
                    </div>
                );
                break;
        }

        // RENDER LIST
        return (
            <div className="flex flex-col gap-4">
                <section className="flex flex-col gap-8">
                    <p className="text-sm color-muted">{label}</p>
                    <div className="flex flex-col gap-4">
                        {filteredItems.map(renderItem)}
                    </div>
                </section>
            </div>
        );
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
                {SEARCH_SECTIONS.map((section) => {
                    const rawItems = forYouData[section.key] || [];
                    const items = section.key === "people" && currentUserId
                        ? rawItems.filter((user) => user.id !== currentUserId)
                        : rawItems;

                    if (!Array.isArray(items) || items.length === 0) {
                        return null;
                    }

                    // Choose renderer based on section key
                    const renderItem =
                        section.key === "people"
                            ? renderUserItem
                            : section.key === "services"
                                ? renderServiceItem
                                : (item) => (
                                    <div key={item.id || item.slug || item.name}>
                                        {item.title || item.name || JSON.stringify(item)}
                                    </div>
                                );

                    return (
                        <section className="flex flex-col gap-4" key={section.key}>
                            <p className="text-sm color-muted">{section.label}</p>
                            <div className="flex flex-col gap-4">
                                {items.map(renderItem)}
                            </div>
                        </section>
                    );
                })}
            </div>
        )
    };

      return noResults(trimmedQuery, "results");
    }
    return (
      <div className="flex flex-col gap-12">
        {people.length > 0 && (
          <section className="flex flex-col gap-4">
            <h6 className="text-h6">People</h6>
            <div className="flex flex-col gap-4">
              {people.map(renderUserItem)}
            </div>
            {/* Tabs navigation */}
            <Tabs isActive={activeTab !== null} defaultActiveTab={TABS[0]} onTabChange={(tab) => setActiveTab(tab)} activeClassName="search-tabs">
                <TabsList className="flex p-0! gap-24 rounded-none! justify-start!">

                    {TABS.map((tab) => (
                        <TabItem
                            key={tab}
                            className="flex justify-start! p-0! px-0! w-fit! rounded-none!"
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </TabItem>
                    ))}
                </TabsList>

                <TabContentList className="search-tabs-content overflow-y-auto hide-scrollbar pb-8">
                    <TabContent>{renderForYou()}</TabContent>
                    {SEARCH_SECTIONS.map((section) => (
                        <TabContent key={section.key}>
                            {renderList(results?.[section.key], section.label, section.type)}
                        </TabContent>
                    ))}
                </TabContentList>
            </Tabs>
            {/* Default state: no tab selected, show recent searches */}
            {!query.trim() && !activeTab && (
                <div className="flex flex-col gap-4 mb-4">
                    <p className="text-sm color-muted">Recent</p>
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
  };

  return (
    <section
      className="fixed inset-0 bg-default z-60 p-12 flex flex-col gap-8 lg:max-w-[600px] mx-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-overlay"
    >
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center gap-8">
          <div className="relative grow mb-4" id="search-overlay">
            {/* Search Input */}
            <Input
              icon={
                <Search
                  size={18}
                  stroke="var(--color-neutral-medium)"
                  strokeWidth={2}
                />
              }
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
                iconSize="md"
                size="icon-md"
                variant="ghost"
                className="absolute w-fit! right-0 top-1/2 translate-y-[-50%] text-sm color-subtle hover:color-default hover:bg-transparent"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              />
            )}
          </div>
          {/* Close overlay button */}
          <Button
            type="default"
            variant="ghost"
            className="mb-4 pl-8! pr-4!"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
      {/* Tabs navigation */}
      <Tabs
        isActive={activeTab !== null}
        defaultActiveTab={TABS[0]}
        onTabChange={(tab) => setActiveTab(tab)}
        activeClassName="search-tabs"
      >
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
          <TabContent>{renderPeopleList(results?.people, "People")}</TabContent>
          <TabContent>
            {renderPeopleList(results?.collaborations, "Collaborations")}
          </TabContent>
          <TabContent>
            {renderPeopleList(results?.services, "Services")}
          </TabContent>
          <TabContent>{renderPeopleList(results?.tags, "Tags")}</TabContent>
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
      )}
    </section>
  );
}
