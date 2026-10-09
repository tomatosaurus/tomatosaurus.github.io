---
title: Authentication & Authroization
description: Core Concepts and Practical Skills of Authentication & Authorization
pubDate: 2026-10-09T05:31:07.081Z
tags: []
draft: true
---

**Authentication** -> **Identity** an user 

* Returns Session, ID token

**Authorization** -> check **Permission** of an user

* Returns Access token

## Authentication

### Authentication Factors

the actual pieces of evidence a user provides to prove their identity

* Knowledge, Possession(OTP, YubiKey, Authentication Key), Inherence(fingerprint), MFA(Multi-Factor Authentication), Password
* Defends against unauthorized access by requiring hard-to-fake proof.

### Authentication Protocols & Standards

communication rules systems uses to securely transmit, verify, and share that evidence across networks

* SAML, OICN, FIDO/WebAuthentication
* Defends against network interception, replay attacks, and enables Single Sign-On(SSO).

#### Examples of Authentication Protocols & Standards

* SAML: Security Assertion Markup Language
  * As companies began adopting multiple web-based software systems in the early 2000s, employees suffered from “password fatigue”.
    * account management + security problem
  * Passing heavily structured, cryptographically signed XML documents called “assertions” between an Identity Provider(IdP, like Microsoft), and a Service Provider(SP, like Salesforce). When you login, the IdP hands the SP a signed XML certificate vouching for your identity.
  * To enable, centralized Enterprise SSO.
    * Battle-tested security, highly standardized for complex enterprise env, and universally supported by legacy B2B software
    * XML is incredibly bulky and complex. extremely difficult to implement in modern mobile apps or Single-Page Applications(SPAs) as it was designed for traditional web browsers.
