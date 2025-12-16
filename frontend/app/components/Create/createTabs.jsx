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
import { authenticatedFetch, getUserId } from "@/utils/auth";

export default function CreateTabs() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState(
    "/placeholder-image.png"
  );

  // Load current user data on mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userId = await getUserId();

        if (!userId) return;

        const url = `${API_BASE_URL}/users/${userId}`;
        const res = await authenticatedFetch(url);

        if (res.ok) {
          const data = await res.json();

          setCurrentUserName(data.user.name);
          setCurrentUserImage(data.user.image_url || "/placeholder-image.png");
        } else {
          console.error(
            `Failed to fetch user: ${res.status} ${res.statusText}`
          );
        }
      } catch (error) {
        console.error("Error loading current user:", error);
      }
    };
    loadCurrentUser();
  }, [API_BASE_URL]);

  console.log("7. Rendering with userName:", currentUserName);

  return (
    <Fragment>
      <Tabs className="bg-white">
        <TabsList
          hasSeparator={false}
          className="bg-white rounded border-b border-gray-300 pb-24"
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
