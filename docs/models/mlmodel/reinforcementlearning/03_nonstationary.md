---
id: rl_nonstationary
sidebar_position: 2
title: Nonstationary
---

# Nonstationary Scenario

Nonstationary Scenario의 대표적이고 가장 잘 알려진 예시는 **슬롯머신**이다. 조작 없는 슬로머신.

Nonstationary Scenario에서 Agent는 항상 똑같은 환경에 처한다. 

강화학습의 목적은 **장기 총 보상의 기댓값 최대화**이다. 

Nonstationary에서는? state가 변하지 않기때문에 **현 state에서의 보상 극대화**가 목적이 된다.

어떻게 보상을 최대화할 수 있을까? 모든 머신러닝이 그렇지만, 조건을 정확히 알아야한다.

## Condition

- 환경, environment의 변화가 없다. state가 동일하다.

- agent는 초기에느 action에 따른 reward 를 알 수 없다.

- agent는 action이후에 reward를 확인할 수 있다.

- action에 따른 reward는 고정이 아니다. stochastic하게 주어진다.
  - 

## What Agent Do?

Agent가 해야하는 ㅇ