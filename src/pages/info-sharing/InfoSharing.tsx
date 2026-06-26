import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiUpload } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

import { Button } from "../../components/ui/Button";
import DataTable, { type DataTableColumn } from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import { useInfos } from "../../features/info-sharing/hooks/useInfos";
import type { InfoPostList } from "../../features/info-sharing/types/info-sharing.type";


const INFOSHARING_TEXT = {
  pageTitle: "정보 공유 게시판",
  description: "D.COM 부원들과 유익한 정보를 나누는 게시판입니다.",
  number: "번호",
  title: "제목",
  author: "작성자",
  date: "작성일",
  empty: "등록된 게시글이 없습니다.",
  searchPlaceholder: "검색어를 입력하세요",
};

const InfoSharing = () => {
  const navigate = useNavigate();
  const { data: infos } = useInfos();
  // const { currentUser } = useAuth();
  // const isAdmin = currentUser?.role === "ADMIN";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const filteredInfos = useMemo(() => {
    const keyword = appliedKeyword.trim().toLowerCase();

    if (!keyword) {
      return infos ?? [];
    }

    return (infos ?? []).filter(
      (info) =>
        info.title.toLowerCase().includes(keyword) ||
        info.author.name.toLowerCase().includes(keyword),
    );
  }, [infos, appliedKeyword]);

  const columns: DataTableColumn<InfoPostList>[] = [
    {
      key: "id",
      header: INFOSHARING_TEXT.number,
      width: "w-[8%]",
      cellClassName: "text-sm text-gray-500",
      render: (info) => info.id,
    },
    {
      key: "title",
      header: INFOSHARING_TEXT.title,
      width: "w-[55%]",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (info) => (
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate font-medium text-gray-800">
            {info.title}
          </span>

          {info.hasAttachment && (
            <MdAttachFile className="text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: "author",
      header: INFOSHARING_TEXT.author,
      width: "w-[20%]",
      cellClassName: "truncate text-sm text-gray-600",
      render: (info) => info.author.name,
    },
    {
      key: "date",
      header: INFOSHARING_TEXT.date,
      width: "w-[17%]",
      cellClassName: "truncate text-sm text-gray-500",
      render: (info) => info.date,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          {INFOSHARING_TEXT.pageTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {INFOSHARING_TEXT.description}
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between gap-4">
        <SearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={() => setAppliedKeyword(searchKeyword)}
          placeholder={INFOSHARING_TEXT.searchPlaceholder}
        />

        <Button
            variant="third"
            className="flex w-40 items-center justify-center gap-2 text-sm"
            onClick={() => navigate("/info/upload")}
        >
            <HiUpload />
            UPLOAD
        </Button>
      </section>

      <section>
        <DataTable
          columns={columns}
          data={filteredInfos}
          rowKey={(info) => info.id}
          emptyMessage={INFOSHARING_TEXT.empty}
          onRowClick={(info) => navigate(`/info/${info.id}`)}
        />
      </section>
    </div>
  );
};

export default InfoSharing;
