---
id: rl_intro
sidebar_position: 1
title: Introduction
---

# Introduction

**Reinforcement Learning**은 갓 태어난 생명이 자연에서 배우는 것과 같다. 명확한 선생님 없이 **interacation**과 **effect**로부터 학습해나간다.

> the learner is not told which actions to take, but instaed must discover which actions yield the most reward by trying them.

reinforcment learning은 supervised learning과도 다르고, unsupervised learning과도 다르다. 지도 과정이 없기 때문에 supervised learning이 아니다. 또한 구조나 패턴을 밝혀내는 것 역시 reinforcement learning이 아니다. **구조나 패턴을 파악하는 것은 Reinforcement learning의 procedure일 수 있지만 목적**은 아니다.

Reinforcement Learning에서 중요한 challenge 중 하나는 **trade-off between exploration and exploitation**이다. 보상을 극대화하기 위해서 학습자는 과거 시도 중 가장 많은 보상을 얻는 행동 방식을 선택해야 한다. 하지만 더 좋은 선택지를 찾기 위해서는 시도 되지 않은 새로운 방법을 찾아야 한다. 이는 앞으로 살펴볼 모든 reinforcement learning 개념에서 싸우고 있는 문제다. 

**Reinforcement Learning**은 단일 행동의 명확한 지침은 주어지지 않지만 단일 또는 연쇄적인 행동의 결과가 주어질 떄 활용되어진다.

예를 들어,

- 체스 게임의 특정 상황에서 어떤 움직임을 취해야할지 누구도 알려주지 않는다. 하지만 게임의 규칙을 알고 게임을 이기고 지는 경험을 통해 사람은 특정 상황에서 어떤 행동을 해야하는지 계획을 세우고 판단한다.
  - 체스 게임의 매동작 : interaction, 최종적인 게임의 승패 : reward

- 갓 태어난 동물은 다리의 근육을 어떻게 움직여야 걸을 수 있는지 모른다. 하지만 동물은 수없이 많은 다리 움직임의 연속으로 마침내 걷는 데 성공한다. 
  - 동물의 다리 근육 움직임 : interaction, 최종적인 걷기 유무 : reward

