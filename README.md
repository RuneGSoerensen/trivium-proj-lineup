# Trivium

> Udviklet af: Thomas, Morten, Rune og Victoria

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?style=flat&logo=postgresql)](https://supabase.com/)
[![Zod](https://img.shields.io/badge/Zod-TypeScript-yellow?style=flat&logo=typescript)](https://zod.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat&logo=vercel)](https://vercel.com/)
[![Commander](https://img.shields.io/badge/Commander-CLI-purple?style=flat&logo=command-line-interface)](https://github.com/tj/commander.js)
[![Winston](https://img.shields.io/badge/Winston-Logging-orange?style=flat&logo=logstash)](https://github.com/winstonjs/winston)
[![Morgan](https://img.shields.io/badge/Morgan-HTTP%20Logger-red?style=flat&logo=logstash)](https://github.com/expressjs/morgan)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Design-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Flyonui](https://img.shields.io/badge/Flyonui-Component%20Library-yellow?style=flat&logo=react)](https://flyonui.com/)

---

## Table of Contents

- [Links](#links)
- [Projekt Board](#projekt-board)
- [Login Test brugere](#login-test-brugere)
- [Tech Stack beskrivelse](#tech-stack-beskrivelse)
- [Implementeret features](#implementeret-features)
- [Kendte issues](#kendte-issues)
- [Manglende features](#manglende-features)
- [Ekstra implementeret features](#ekstra-implementeret-features)
- [Interne design beslutninger, samt arguementation](#interne-design-beslutninger-samt-arguementation)
- [GitHub issues eksempler](#github-issues-eksempler)
- [ER Diagram](#er-diagram)
- [Opsummering og refleksion](#opsummering-og-refleksion)

## Links

- **Frontend**: `https://trivium.lol`
  - Omdirigerer til: `https://trivium-proj-lineup.vercel.app/`
- **Backend API**: `https://trivium.lol/api`

## Projekt board

https://github.com/orgs/eaaa-dob-wu-e25a/projects/17`

---

## Login Test brugere

    - Morten Pedersen:
      - Email:
      - Password:
    - John Pork:
      - Email: `john@pork.com`
      - Password: `password123`

---

## Tech Stack beskrivelse

- Backend: `node.js` REST API
  - Backend står for kontakt med Postgres databasen
    hos Supabase. Frontend sender `fetch` requests
    til backend, som så gemmer/henter osv fra database
  - De fleste endpoints er sikret med en middleware,
    der forkaster requests uden en `Authorization` header og
    valid JWT token. Vi validerer tokens hos Supabase
  - Vi bruger følgende dependencies:
    - `express.js`
    - `cors`
    - `postgres`
    - `uuid`
    - `@supabase/supabase-js`
    - `commander`
    - `morgan`
    - `winston`
    - `zod`
- Frontend: `next.js` app med server-side
  rendering
  - **tailwind**
    - Utility-first CSS framework der gør det nemt
      og hurtigt at style komponenter direkte i JSX
      uden at skulle skrive separate CSS-filer
  - **flyonui**
    - Komponent-bibliotek bygget oven på Tailwind
      som giver os pre-designede, responsive komponenter
      (modals, buttons, cards osv.) Det her tilaldt os at gøre komponenter markant hurtigere at udvikle.

---

## Implementeret features

- En liste og kort beskrivelse af de features, I
  har implementeret, med angivelse af den
  primære ansvarlige udvikler for hver feature,
  hvor det er relevant
  - **Onboarding flow**
  - **User profil**
  - **User feed side**
  - **Services side**
  - **Create side**
  - **Chats side**
  - **Search**
  - **Navigation**
  - **Mobile design** (mobile-first)
  - **Desktop design**

---

## Kendte issues

-

## Manglende features

- Create Stories(mangler design)
- Notifications

## Ekstra implementeret features

- ***

## Interne design beslutninger, samt arguementation

- ??

---

## GitHub issues eksempler

- Et eksempel på et af jeres GitHub issues,
  der illustrerer analyse og planlægning af en
  feature eller user story
- Et eksempel på et af jeres pull requests,
  der viser konstruktiv feedback og
  forbedringer på en feature

---

## ER Diagram

- Vi bruger Supabase som vores
  database-provider, og samtidig til vores
  bruger-authentication.
- Vores backend har en forbindelse til
  Supabase gennem deres sql transaction
  pooler. Vi bruger også Supabase's JS library
  til at verificere brugernes JWT-token når de
  laver backend-requests.
- Vores frontend bruger også Supabase's JS
  library til at oprette nye brugere og til
  authorization, bl.a. for at få en ny JWT
  token når brugere logger ind.

---

## Opsummering og refleksion

> Post-mortem: En kort opsummering og refleksion
> over hvad har fungeret godt i projektet, og
> hvad I ville gøre anderledes hvis I skulle
> lave projektet igen — både i forhold til
> tekniske valg, samarbejde og projektstyring

- **Following/connections**
  - Vi har fejl og mangler i vores
    following-system som det er nu. I designet
    er der lagt op til, at "connections" er en
    to-vejs following, altså hvis bruger A
    følger bruger B, gælder det samme omvendt.
    Til det har vi lavet en "pending-state"
    når man anmoder om at følge andre, men vi
    har endnu ikke funktionalitet til at
    godkende følgning. Et andet problem vi har
    er, at "A-vil-følge-B" og "B-vil-følge-A"
    bliver gemt i databasen som to forskellige
    rækker. Det bør ikke være muligt at lave
    en follow request fra B til A, hvis der
    allerede er en fra A til B.
- **Backend request-validering**
  - I enkelte endpoints har vi brugt Zod som løsning
    på at få valideret den input, der sendes til backend.
    Da man bør anse alt data i en backend request som
    upålidelig er det vigtigt den bliver valideret før
    den fx gemmes i databasen, ellers er der stor risiko
    for at vi gemmer invalid data eller crasher backenden helt.
    Zod genererer også en liste over valideringsfejl, der kan gøre
    det nemmere at implementere fejlbeskeder i frontend.

---
