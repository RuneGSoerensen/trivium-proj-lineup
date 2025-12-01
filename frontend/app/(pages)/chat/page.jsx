'use client';
import { TabContent, TabContentList, TabItem, Tabs, TabsList } from '@/ui/Tab/Tab';
import { Button } from '@/ui/Button/Button';
import { Edit } from 'lucide-react';
import ChatThreads from '@/components/Chat/ChatThreads';
import { fetchThreads, createThread, fetchMessages } from '@/utils/api';
import { useEffect, useState } from 'react';
import SearchUser from '@/comps/Chat/SearchUser';
import ActiveChatView from '@/comps/Chat/ChatView';

export default function ChatPage() {
    const [threads, setThreads] = useState([]);
    const [activeThread, setActiveThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]); // [{id, name, ...}, ...]

    useEffect(() => {
        // Fetch threads and set state
        fetchThreads().then((res) => {
            setThreads(res.threads ?? res ?? []);
        }).catch((err) => {
            console.error("Error fetching threads:", err);
        })
    }, []);

    const handleSelectThread = async (threadId) => {
        const thread = threads.find((t) => t.id === threadId);
        if (!thread) {
            console.warn("No thread found for id:", threadId);
            return;
        };

        setActiveThread(thread);
        try {
            const res = await fetchMessages(threadId);
            console.log("Messages response", res);
            setMessages(res.messages ?? res ?? []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }

    };

    const handleBack = () => {
        setActiveThread(null);
        setMessages([]);
    }


    const handleCreateThread = async () => {
        if (selectedUsers.length === 0) return;

        if (selectedUsers.length === 1) {
            // 1:1
            const other = selectedUsers[0];
            await createThread({
                isGroup: false,
                participantId: other.id,
            });
        } else {
            // group
            await createThread({
                isGroup: true,
                title: customTitle || null, // optional
                participantIds: selectedUsers.map((u) => u.id),
            });
        }
    };

    return (
    
            <Tabs className="bg-default text-default w-full">
                {!activeThread ? (
                    <TabsList className="mb-8 w-full justify-between">
                        <TabItem>Chats</TabItem>
                        <TabItem>Groups</TabItem>
                    </TabsList>
                ) : null}

                <TabContentList>
                    <TabContent>
                        {/* <SearchUser selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} /> */}
                        <div className="flex flex-col gap-4">
                            {activeThread ? (
                                <ActiveChatView thread={activeThread} messages={messages} onBack={handleBack} />
                            ) : (
                                <ChatThreads
                                    threads={threads.filter(t => !t.isGroup)}
                                    activeThreadId={activeThread?.id}
                                    onSelectThread={handleSelectThread}
                                />
                            )}

                        </div>
                    </TabContent>
                    <TabContent>
                        <div className="flex flex-col gap-4">

                            <Button icon={<Edit />} variant="secondary" onClick={() => alert("Oops! Feature not implemented yet.")}>
                                Create New Group
                            </Button>
                        </div>
                    </TabContent>
                </TabContentList>
            </Tabs>
       
    );
}
