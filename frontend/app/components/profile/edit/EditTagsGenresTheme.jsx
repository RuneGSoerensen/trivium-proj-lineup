"use client";
import { Tag } from "@ui/Tag/Tag.jsx";
import MultiSelectInput from "@ui/MultiSelectButton/MultiSelectButton.jsx";

export default function EditTagsGenresTheme({
  formData,
  setFormData,
  allGenres,
  allTags,
  showTagSelect,
  setShowTagSelect,
  showGenresEdit,
  setShowGenresEdit,
  showThemeEdit,
  setShowThemeEdit,
  themeColors,
}) {
  return (
    <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20">
      <div className="flex m-4 items-center ">
        <label className="text-default font-semibold  mb-8 ">What i am looking</label>

        <div className="flex flex-wrap gap-2 mb-2">
          {formData.looking_for_tags.map((tag) => (
            <Tag key={tag} colorScheme="info" className="px-8 py-2 flex items-center gap-1">
              {tag}
              {showTagSelect && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      looking_for_tags: formData.looking_for_tags.filter((t) => t !== tag),
                    })
                  }
                >
                  ×
                </button>
              )}
            </Tag>
          ))}
          <button onClick={() => setShowTagSelect((s) => !s)} className="text-muted ">
            {showTagSelect ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {showTagSelect && (
        <div className="mt-2 w-full">
          <select
            value=""
            onChange={(e) => {
              const tagName = e.target.value;
              if (!formData.looking_for_tags.includes(tagName)) {
                setFormData({ ...formData, looking_for_tags: [...formData.looking_for_tags, tagName] });
              }
            }}
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="" disabled>
              Select a tag...
            </option>
            {allTags.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <hr className="border-gray-300 ml-30 mb-16" />

      <div className="flex m-4 items-center">
        <label className="text-default font-semibold  mb-8 ">Genres</label>

        <div className="flex flex-wrap gap-2 ml-10">
          {formData.genres.map((g) => (
            <Tag key={g} colorScheme="info" className="px-8 py-2 flex items-center gap-1">
              {g}
              {showGenresEdit && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, genres: formData.genres.filter((x) => x !== g) })}
                >
                  ×
                </button>
              )}
            </Tag>
          ))}

          <button onClick={() => setShowGenresEdit((s) => !s)} className="text-muted ">
            {showGenresEdit ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {showGenresEdit && (
        <div className="m-4 mt-6 ml-10">
          <MultiSelectInput
            options={allGenres}
            values={formData.genres}
            setValues={(vals) => setFormData({ ...formData, genres: vals })}
            placeholder="Add or search genres..."
            allowNew={true}
          />
        </div>
      )}

      <hr className="border-gray-300 ml-30 mb-16" />

      <div className="flex m-4 items-center">
        <label className="text-default font-semibold  mb-8 ">Theme</label>
        <div className="flex items-center gap-4 ml-10">
          <div
            className="w-40 h-40 rounded-full "
            style={{
              backgroundColor: formData.theme,
            }}
          />
          <button onClick={() => setShowThemeEdit((s) => !s)} className="text-muted ">
            {showThemeEdit ? "Done" : "Edit"}
          </button>
        </div>
      </div>
      {showThemeEdit && (
        <div className="flex gap-3 mt-4">
          {themeColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setFormData({ ...formData, theme: color.value })}
              className={`w-40 h-40 rounded-full border-2 ${
                formData.theme === color.value ? "border-brand-primary" : "border-transparent"
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
