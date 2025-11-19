---
id: rl_intro
sidebar_position: 1
title: Introduction
---

# Introduction

**Reinforcement Learning** 은 명확한 지도(Guidance)없이 **interaction**과 **effect**로부터 학습. 반대로 이야기해서, 명확한 지도 방향을 제시하기는 어렵지만 결과를 평가할 수 있는 상황에서 강화 학습은 매우 효과적인 선택지가 될 수 있다.

> the learner is not told which actions to take, but instaed must discover which actions yield the most reward by trying them.

:::note
**Reinforcement Learning의 예시**

- 보드 게임, 예를 들어 체스 게임을 배울 떄 우리는 "이런 상황에서 어떤 말을 어떻게 움직여야 한다." 라는 식으로 배우지 않는다. 게임의 규칙과 승리 조건을 이해하고 스스로 승리하기 위해 취해야하는 행동을 판단한다. 베테랑 플레이어라면 더 많은 경험으로부터 더 좋은 선택을 내릴 수 있다.

- 갓 태어난 동물에게 다리 근육을 어떻게 써야하는지 아무도 알려주지 않는다. 하지만 동물은 스스로 근육을 움직여서 걷는다. 
:::

Reinforcement Learning은 Unsupervised Learning도 아니다. 숨겨진 구조나 패턴을 파악하는 것은 Reinforcement learning의 procedure일 수 있지만 목적은 아니다. Reinforcement Learning의 목적은 단 하나, **보상 극대화**이다.