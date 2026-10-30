---
title: Why Google Stores Billions of Lines of Code In a Single Repository?
description: Do you know that Google stores most of their code in a SINGLE repository? How does it work? Why Google select this strategy?
pubDate: 2026-10-29T15:40:52.261Z
category: engineering
tags: []
draft: true
---

# Why Google Stores Billions of Lines of Code In a Single Repository?

> [https://research.google/pubs/why-google-stores-billions-of-lines-of-code-in-a-single-repository](https://research.google/pubs/why-google-stores-billions-of-lines-of-code-in-a-single-repository/)

Google utilizes a monolithic repository. About 1B files, 35M commit histories, 86TB data and 2B+ lines of source codes are included in this monolithic repository. Moreover, 95% of Google SWEs all over the world use this single repository. Finally, 40K commits are made per day on average.

Most developers would have a few questions.

* How it works? How does Google sustain such a huge system?
* Why a monolithic repository?

### How? Core Infrastructure & Workflow

Google constructed and is utilizing their own internal infrastructures to support a huge monolithic repository. These infrastructures includes not only git-style code management system, but also extra features like web IDE, code search, code review, build system and so on. Following is some examples listed in the reference paper:

* **Piper**: As normal, commercial version management system like git cannot properly handle billions of lines. **Piper** is Google's internal code version management system.
* **CitC** (Clients in the Cloud): Google's internal Workspace which is based on the Cloud storage. TEngineers in Google doesn't have to waste their time waiting for cloning a billion-scale code repository to their local laptop or workspace.
* **Trunk-based development**: Most Google SWEs changes (yeah, I'm using the word “change”, not “commit” or “push”.) the codebase directly at the head, trunk or mainline of the code. By this, Engineers are released from notorious *code merging problem*. Engineers can ensure the consistency and stability of their commit once it passes the test. This is why Google always emphasize the importance of the test! Indeed, Google Engineers also use branch-like things occasionally, but basically they work at the trunk of the codebase.
* **Code Edit System**: To back SWEs working with a huge codebase, Google provides many internal development tools. One of them is code edit system. 

### Why? Metris of a Single Repository

Previous paragraph covers how Google manages a huge monolithic repository. But Why is always much more important then How. A monolithic codebase has a few strong merits besides a few side-effects. 

* **Single source of truth**: 모든 코드가 한 곳에 있으므로 단일화된 버전을 제공하며, 어떤 버전이 공식적인 코드인지 혼란이 없습니다.
* Diamond Dependency Problem
  * ![](/uploads/Screenshot-2026-10-30-at-10.48.38-AM.png)

다이아몬드 종속성 문제 해결: 공통 라이브러리에 대한 종속성 버전 충돌로 인해 발생하는 '다이아몬드 종속성' 문제를 원천적으로 방지합니다. 라이브러리를 업데이트할 때 관련 종속성을 한 번에 같이 업데이트할 수 있습니다.

원자적 변경 (Atomic Changes): 단 한 번의 커밋으로 수백, 수천 개의 파일과 여러 프로젝트에 걸친 대규모 변경 사항을 빌드 실패 없이 일관성 있게 반영할 수 있습니다.

광범위한 코드 공유 및 재사용: 팀 간의 경계가 유연하며, 다른 팀의 코드를 쉽게 검색하고 참조할 수 있어 협업에 유리합니다.

### Side Effects of a Single Repository

물론 이러한 구조를 유지하는 데는 상당한 비용과 노력이 따릅니다.

도구에 대한 대규모 투자: 단일 저장소를 감당할 수 있는 빌드 시스템, 코드 검색(CodeSearch), 정적 분석(Tricorder), 코드 리뷰(Critique) 등의 거대한 자체 툴 인프라를 구축하고 실행해야 합니다.

코드베이스 복잡성: 코드를 가져다 쓰기 너무 쉽기 때문에, 개발자들이 불필요한 종속성을 무분별하게 추가하여 빌드와 테스트 시간이 길어질 수 있습니다.

코드 건강성 (Code Health) 유지: 거대한 코드를 깔끔하게 유지하기 위해 Rosie와 같은 대규모 자동화 리팩토링 도구를 사용하고 지속적으로 코드를 정리하는 막대한 인적, 물리적 자원이 투자되어야 합니다.

## Conclusion

Git과 같은 분산 버전 관리 시스템(DVCS)이 대세가 되었음에도, 구글은 Git으로 전환하기 위해 저장소를 수천 개로 쪼개는 것(Repository splitting)은 구글에 득이 되지 않는다고 결론 내렸습니다. 자체 시스템 유지에 지속적인 투자가 필요하지만, 개방적이고 협업을 중시하는 조직에게는 단일 저장소 모델이 제공하는 확장성과 코드 공유의 이점이 훨씬 크기 때문입니다.
