import { Fragment } from "react";
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
            <CreateNotes />
          </TabContent>
          <TabContent>
            <CreateStory />
          </TabContent>
          <TabContent>
            <CreateRequest />
          </TabContent>
        </TabContentList>
      </Tabs>
    </Fragment>
  );
}
