import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://intranet.dcom.club";
const DEFAULT_DESCRIPTION =
  "경희대학교 컴퓨터공학부 D.COM(디닷컴) 공식 인트라넷입니다.";

const getPageTitle = (pathname: string) => {
  if (pathname === "/") return "경희대학교 D.COM | 디닷컴 인트라넷";
  if (pathname === "/register") return "회원가입 | D.COM 디닷컴";
  if (pathname === "/forgot-password") return "비밀번호 찾기 | D.COM 디닷컴";
  if (pathname.startsWith("/notice")) return "공지사항 | D.COM 디닷컴";
  if (pathname.startsWith("/info")) return "정보공유 | D.COM 디닷컴";
  if (pathname.startsWith("/gallery")) return "활동사진 | D.COM 디닷컴";
  if (pathname.startsWith("/exam-archive")) return "족보 | D.COM 디닷컴";
  if (pathname.startsWith("/manage")) return "회원 관리 | D.COM 디닷컴";
  if (pathname === "/my-page") return "마이페이지 | D.COM 디닷컴";
  if (pathname === "/home") return "홈 | D.COM 디닷컴";
  return "D.COM 디닷컴 인트라넷";
};

const setMeta = (selector: string, attributeName: string, attributeValue: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = getPageTitle(pathname);
    const isIndexable = pathname === "/";
    const pageUrl = isIndexable ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;

    document.title = title;
    setMeta(
      'meta[name="description"]',
      "name",
      "description",
      DEFAULT_DESCRIPTION,
    );
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      isIndexable ? "index, follow" : "noindex, nofollow",
    );
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      DEFAULT_DESCRIPTION,
    );
    setMeta('meta[property="og:url"]', "property", "og:url", pageUrl);

    document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", pageUrl);
  }, [pathname]);

  return null;
}
