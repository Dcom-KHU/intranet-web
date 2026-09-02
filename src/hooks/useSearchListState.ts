import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type NormalizeKeyword = (keyword: string) => string;

const defaultNormalizeKeyword: NormalizeKeyword = (keyword) => keyword.trim();

const getPageFromParams = (pageParam: string | null) => {
  const page = Number(pageParam);
  return Number.isInteger(page) && page > 0 ? page - 1 : 0;
};

export default function useSearchListState(
  normalizeKeyword: NormalizeKeyword = defaultNormalizeKeyword,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedKeyword = searchParams.get("q") ?? "";
  const page = getPageFromParams(searchParams.get("page"));
  const [searchDraft, setSearchDraft] = useState(() => ({
    value: appliedKeyword,
    basedOn: appliedKeyword,
  }));
  const searchKeyword =
    searchDraft.basedOn === appliedKeyword
      ? searchDraft.value
      : appliedKeyword;

  const setSearchKeyword = (value: string) => {
    setSearchDraft({ value, basedOn: appliedKeyword });
  };

  const applySearch = () => {
    const keyword = normalizeKeyword(searchKeyword);
    const nextParams = new URLSearchParams(searchParams);

    // Update the search keyword in the URL parameters
    // /{category}?q={keyword}&page={page}
    if (keyword) nextParams.set("q", keyword);
    else nextParams.delete("q");

    nextParams.delete("page");
    setSearchParams(nextParams);
  };

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextPage > 0) nextParams.set("page", String(nextPage + 1));
    else nextParams.delete("page");

    setSearchParams(nextParams);
  };

  return {
    page,
    setPage,
    searchKeyword,
    setSearchKeyword,
    appliedKeyword,
    applySearch,
  };
}
