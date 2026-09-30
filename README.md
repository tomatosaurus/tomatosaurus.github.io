# Dev Notes — Astro 블로그 (GitHub Pages)

비용 $0 기술 블로그: **Astro** + **GitHub Pages** + **TinaCMS**(웹 에디터) + **Giscus**(댓글) + 전문(full-content) **RSS**(Dev.to 크로스포스팅용).

## 로컬 개발

```bash
npm install
npm run dev          # http://localhost:4321  (에디터: http://localhost:4321/admin/)
npm run dev:astro    # Tina 없이 Astro만 실행
npm run build        # dist/ 에 정적 빌드
```

`draft: true` 글은 `dev`에서만 보이고 프로덕션 빌드에서는 제외됩니다.

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/consts.ts` | **사이트 URL, 제목, 작성자, Giscus 설정** — 가장 먼저 수정 |
| `src/categories.ts` | **계층형 카테고리 트리** (사이드바·카테고리 페이지·Tina 선택지에 반영) |
| `src/content/blog/*.md(x)` | 글 (frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `category`, `tags`, `draft`) |
| `src/content.config.ts` | 글 frontmatter 스키마 (`tina/config.ts`와 같이 유지) |
| `src/components/BaseHead.astro` | canonical, OG/Twitter, `BlogPosting` JSON-LD |
| `src/components/Giscus.astro` | 댓글 |
| `src/pages/rss.xml.ts` | 본문 전체 포함 RSS (Dev.to 가져오기용) |
| `tina/config.ts` | TinaCMS 에디터 스키마 |
| `.github/workflows/deploy.yml` | `main` 푸시 시 GitHub Pages 자동 배포 |

## 카테고리

`src/categories.ts`에서 관리합니다. 하위 카테고리는 `children`에 추가하면 되고 깊이 제한은 없습니다.

```ts
{
	slug: 'study',
	label: 'Study',
	children: [
		{ slug: 'ml', label: 'Machine Learning' },
		{ slug: 'cloud', label: 'Cloud', children: [{ slug: 'aws', label: 'AWS' }] },
	],
},
```

글에는 경로로 지정합니다: `category: study/ml`. 정의되지 않은 경로를 쓰면 빌드가 실패하며 사용 가능한 값 목록을 보여줍니다.
상위 카테고리 페이지(`/category/study/`)와 사이드바 숫자는 하위 카테고리 글까지 포함합니다. 카테고리를 옮겨도 글 URL(`/blog/<slug>/`)은 바뀌지 않습니다.

## 배포 셋업 (1회)

1. **GitHub 저장소 생성 후 푸시**
   - 커스텀 도메인을 안 쓰면 저장소 이름을 `<username>.github.io`로 하세요. (다른 이름이면 `/<repo>/` 하위 경로가 되어 `base` 설정이 추가로 필요합니다.)
2. **`src/consts.ts` 수정** — `SITE_URL`, `SITE_TITLE`, `AUTHOR_*`
3. **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택
4. `main`에 푸시하면 Actions가 빌드·배포합니다.

### 커스텀 도메인

1. `public/CNAME` 파일에 도메인 한 줄 작성 (예: `blog.example.com`)
2. DNS: 서브도메인이면 `CNAME → <username>.github.io`, 루트 도메인이면 `A` 레코드 `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Settings → Pages → Custom domain 입력 후 **Enforce HTTPS** 체크
4. `src/consts.ts`의 `SITE_URL`을 도메인으로 변경

### Giscus 댓글

1. 저장소를 **Public**으로 두고 Settings → General → Features에서 **Discussions** 활성화
2. [giscus 앱](https://github.com/apps/giscus) 설치 → 해당 저장소 허용
3. [giscus.app](https://giscus.app)에서 저장소 입력 → 나오는 `data-repo-id`, `data-category-id`를 `src/consts.ts`의 `GISCUS`에 입력 (`repoId`가 비어 있으면 댓글 섹션은 숨겨집니다)

### TinaCMS 웹 에디터 (배포 사이트의 `/admin`)

로컬 `/admin`은 설정 없이 동작하며 파일을 직접 수정합니다(이후 직접 커밋). 배포된 사이트에서 브라우저로 글을 쓰고 GitHub에 자동 커밋하려면:

1. [app.tina.io](https://app.tina.io)에서 무료 프로젝트 생성 → GitHub 저장소 연결
2. 프로젝트의 **Site URL**에 블로그 주소 추가
3. Client ID와 Read-only Token 발급
4. 저장소 Settings → Secrets and variables → Actions에 `TINA_CLIENT_ID`, `TINA_TOKEN` 등록

시크릿이 있으면 워크플로가 `npm run build:cms`로 `/admin`까지 빌드하고, 없으면 에디터 없이 사이트만 빌드합니다.
본문 이미지는 `public/uploads/`에 저장됩니다. (`heroImage`는 Astro 이미지 최적화를 위해 `src/assets/`의 상대 경로로 파일에서 직접 지정)

## Dev.to 크로스포스팅 (POSSE)

- **자동**: Dev.to → Settings → Extensions → *Publishing to DEV Community from RSS*에 `https://<내 도메인>/rss.xml` 입력, **"Mark the RSS source as canonical URL by default"** 체크. 가져온 글은 Dev.to에 초안으로 들어오니 검토 후 발행하세요.
- **수동**: 글 복사 후 Dev.to frontmatter에 `canonical_url: https://<내 도메인>/blog/<slug>/` 지정.
- RSS 본문의 `/uploads/...` 같은 상대 링크·이미지는 자동으로 절대 URL로 바뀌어 Dev.to에서도 깨지지 않습니다.

## SEO 체크리스트

- 배포 후 [Google Search Console](https://search.google.com/search-console)에 도메인 등록 → `sitemap-index.xml` 제출
- 글마다 `description`(검색 결과 스니펫)을 에러 메시지·키워드 중심으로 작성
- 제목에 정확한 에러 문자열을 넣는 것이 롱테일 검색에 유리합니다 (예시 글 참고)
