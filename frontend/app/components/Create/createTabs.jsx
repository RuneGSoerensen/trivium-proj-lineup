"use client";

import { Fragment, useState, useEffect } from "react";
import {
  TabContent,
  TabContentList,
  TabItem,
  Tabs,
  TabsList,
} from "../ui/Tab/Tab";
import CreateNotes from "./createNotes.jsx";
import CreateRequest from "./createRequest.jsx";
import CreateStory from "./createStory.jsx";

export default function CreateTabs() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("Name");
  const [currentUserImage, setCurrentUserImage] = useState(
    "/placeholder-image.png"
  );

  // Load current user data on mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("1. UserId from localStorage:", userId);

        if (userId) {
          const url = `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${userId}`;
          console.log("2. Fetching from:", url);

          const res = await fetch(url);
          console.log("3. Response status:", res.status, res.ok);

          if (res.ok) {
            const data = await res.json();
            console.log("4. Full response data:", data);
            console.log("5. User name:", data.user?.name);

            setCurrentUserId(userId);
            setCurrentUserName(data.user.name || "Name");
            setCurrentUserImage(
              data.user.image_url || "/placeholder-image.png"
            );

            console.log("6. State set to:", data.user.name);
          }
        }
      } catch (error) {
        console.error("Error loading current user:", error);
      }
    };
    loadCurrentUser();
  }, []);

  console.log("7. Rendering with userName:", currentUserName);

  return (
    <Fragment>
      <Tabs className="bg-white">
        <TabsList
          hasSeparator={false}
          className="bg-white rounded border-b border-gray-300"
        >
          <TabItem activeClassName="bg-brand-primary p-2">Note</TabItem>
          <TabItem activeClassName="bg-brand-primary p-2">Story</TabItem>
          <TabItem activeClassName="bg-brand-primary p-2">Request</TabItem>
        </TabsList>
        <TabContentList className="bg-white">
          <TabContent>
            <CreateNotes
              userName={currentUserName}
              userImage={currentUserImage}
            />
          </TabContent>
          <TabContent>
            <CreateStory
              userName={currentUserName}
              userImage={currentUserImage}
            />
          </TabContent>
          <TabContent>
            <CreateRequest
              userName={currentUserName}
              userImage={currentUserImage}
            />
          </TabContent>
        </TabContentList>
      </Tabs>
    </Fragment>
  );
}
