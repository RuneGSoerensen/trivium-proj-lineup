'use client';

import React from 'react';
import Input from '@/ui/Input/Input';
import { Search } from 'lucide-react';


/**
 * FlyonUI Combo Box wrapper
 * - bruger FlyonUI's data-attributter, så deres JS kan hooke sig på
 * - kan senere udvides med props (apiUrl, placeholder, osv.)
 */
export default function SearchUser() {

    return (
        <div className="w-full max-w-sm">
            {/* FlyonUI combo box
            API response format: { items: [ { id, name, image, position }, ... ] }
            configuration options: groupingType, apiUrl, apiGroupField, apiQueryParam, outputItemTemplate, groupingTitleTemplate
            how to integrate: https://flyon-ui.com/docs/components/combo-box
            
            How to use:
            1. Add data-combo-box attribute to a container div with configuration JSON
            2. Inside, add an input with data-combo-box-input attribute
            3. Add a div with data-combo-box-output attribute for the dropdown items
            */}
            <div
                className="relative"
                data-combo-box={`{
          "groupingType": "default",
          "isOpenOnFocus": true,
          "apiUrl": "/api/search",
          "apiGroupField": "position",
            "apiQueryParam": "query",
            "outputItemTemplate": "<div class=\\"dropdown-item combo-box-selected:dropdown-active\\" data-combo-box-output-item> <div class=\\"flex items-center justify-between\\"> <div class=\\"flex items-center w-full\\"> <div class=\\"flex items-center justify-center rounded-full bg-base-200 size-6 overflow-hidden me-2.5\\"> <img class=\\"shrink-0\\" data-combo-box-output-item-attr='[{\\\\\\"valueFrom\\\\\\": \\\\\\"image\\\\\\", \\\\\\"attr\\\\\\": \\\\\\"src\\\\\\"}, {\\\\\\"valueFrom\\\\\\": \\\\\\"name\\\\\\", \\\\\\"attr\\\\\\": \\\\\\"alt\\\\\\"}]' /> </div> <div data-combo-box-output-item-field=\\"name\\" data-combo-box-search-text data-combo-box-value></div> </div> <span class=\\"icon-[tabler--check] text-primary combo-box-selected:block hidden size-4 shrink-0\\"> </span> </div> </div>",
          "groupingTitleTemplate": "<div class=\\"block text-xs text-base-content/50 m-3 mb-1\\"></div>"
        }`}
            >
                {/* SearchBox */}
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search or type a name"
                        role="combobox"
                        aria-controls="searchbox-list"
                        aria-expanded="false"
                        autoFocus
                        data-combo-box-input=""
                    />
                    <Search strokeWidth={1.5} className="text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2" />
                </div>

                {/* SearchBox Body */}
                <div
                    className="bg-base-100 rounded-box absolute z-50 max-h-56 w-full space-y-0.5 overflow-y-auto"
                    style={{ display: 'flex' }}
                    data-combo-box-output=""
                />
            </div>
        </div>
    );
}