import React, { useCallback } from "react";
import { useState } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import { fetchSuggestions } from "../app/features/search";

import "./Search.css";

const Search = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const onChange = useCallback((event, { newValue }) => {
    setValue(newValue);
  }, []);

  const renderSuggestion = useCallback((suggestion, { query }) => {
    const suggestionText = `${suggestion.title}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={"suggestion-content " + suggestion.twitter}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </span>
      </span>
    );
  }, []);

  const onSuggestionsFetchRequested = useCallback(({ value }) => {
    fetchSuggestions(value).then((suggestions) => {
      setSuggestions(suggestions);
    });
  }, []);

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  const getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  const onSuggestionSelected = useCallback((event, { suggestion }) => {
    console.log(suggestion);
    window.location.href = `/article/${suggestion.id}`;
  }, []);

  const inputProps = {
    placeholder: "Search...",
    value,
    onChange,
  };

  return <Autosuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={inputProps}
    onSuggestionSelected={onSuggestionSelected}
  />;
}

export default React.memo(Search);
