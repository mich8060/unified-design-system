import React from "react";
import { SearchInput } from "./SearchInput";

export default { title: "Components/SearchInput", component: SearchInput };

export const Default = {
  args: {
    placeholder: "Search",
    value: "",
  },
};

export const WithInlineDropdown = {
  render: function WithInlineDropdownStory() {
    const [query, setQuery] = React.useState("");
    const [scope, setScope] = React.useState("all");

    return (
      <SearchInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
        dropdownOptions={[
          { label: "All", value: "all" },
          { label: "Users", value: "users" },
          { label: "Teams", value: "teams" },
        ]}
        dropdownValue={scope}
        onDropdownChange={setScope}
        dropdownPlaceholder="All"
      />
    );
  },
};
