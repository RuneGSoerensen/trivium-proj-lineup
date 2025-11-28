'use client';
import { TabContent, TabContentList, TabItem, Tabs, TabsList } from '@ui/Tab/Tab';
import { Button } from '@ui/Button/Button';
import { Edit, Edit2, Search } from 'lucide-react';
import { ChatThreads } from '@comps/Chat/Threads';
import { fetchThreads } from '@utils/api';
import { useEffect, useState } from 'react';

export default function ChatPage() {
    const [threads, setThreads] = useState([]);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => { 
        // Fetch threads from API
        const loadThreads = async () => { 
            try {
                const data = await fetchThreads();
                setThreads(data.threads || [])
            } catch (error) {
                
            }
        }
    }
    return (
        <>
            {/*  */}
            <Tabs className="bg-default text-default w-full">
                <TabsList className="mb-8 w-full justify-between">
                    <TabItem>Chats</TabItem>
                    <TabItem>Groups</TabItem>
                </TabsList>
                <TabContentList className="p-8">
                    <TabContent>
                        <div className="flex flex-col gap-4">
                            <ChatThreadItem
                                threads={ }
                                activeThreadId={activeId}
                                onSelectThread={setActiveId}
                            />
                            <p>Your chat messages will appear here.</p>
                            <Button icon={<Search />} variant="secondary" onClick={() => alert("Oops! Feature not implemented yet.")}>
                                Search Chats
                            </Button>
                        </div>
                    </TabContent>
                    <TabContent>
                        <div className="flex flex-col gap-4">
                            <p>Your group conversations will appear here.</p>
                            <Button icon={<Edit />} variant="secondary" onClick={() => alert("Oops! Feature not implemented yet.")}>
                                Create New Group
                            </Button>
                        </div>
                    </TabContent>
                </TabContentList>
            </Tabs>
        </>
    );
}
