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

## Indholdsfortegnelse

TODO: indsæt når teksten er færdig.

## Links

- **Frontend**: <https://trivium.lol>
  - Omdirigerer til:
    <https://trivium-proj-lineup.vercel.app/>
- **Backend API**: <https://trivium.lol/api>
- **Projekt board**:
  <https://github.com/orgs/eaaa-dob-wu-e25a/projects/17>

## Login til test-brugere

- John Pork:
  - Email: `john@pork.com`
  - Password: `password123`

## Tech Stack beskrivelse

- Backend: `node.js` REST API
  - Backend står for kontakt med Postgres
    databasen hos Supabase. Frontend sender
    `fetch` requests til backend, som så
    gemmer/henter osv fra database
  - De fleste endpoints er sikret med en
    middleware, der forkaster requests uden en
    `Authorization` header og valid JWT token. Vi
    validerer tokens hos Supabase
  - Vi bruger følgende dependencies m.m.:
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
  rendering samt:
  - `react.js`
  - `tailwind`
  - `flyonui`

---

# Implementeringsdetaljer

## Implementerede features

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

## Kendte issues

## Manglende features

- **Bruger-profil tilgang**
  - Der er pt ikke nogen måde at komme ind på
    andre brugeres profil, uden manuelt at
    indtaste deres bruger-id i addressebaren. Her
    er et fungerende link til en brugerprofil:
    <https://trivium.lol/profile/1d83fc00-a50e-48f4-9e23-e423d1112dee>
- **Login tjek**
  - Vi har en fungerende redirect til `/login` i
    frontend, når brugeren ikke er logget ind, men
    pga vores Supabase opsætning kunne vi ikke få
    det til at ske server-side, så der er et kort
    "content-flash" inden man lander på
    login-formularen.
- **Following/connections**
  - Vi har fejl og mangler i vores
    following-system som det er nu. I designet er
    der lagt op til, at "connections" er en
    to-vejs following, altså hvis bruger A følger
    bruger B, gælder det samme omvendt. Til det
    har vi lavet en "pending-state" når man
    anmoder om at følge andre, men vi har endnu
    ikke funktionalitet til at godkende følgning.
    Et andet problem vi har er, at "A-vil-følge-B"
    og "B-vil-følge-A" bliver gemt i databasen som
    to forskellige rækker. Det bør ikke være
    muligt at lave en follow request fra B til A,
    hvis der allerede er en fra A til B.
- **Backend request-validering**
  - I enkelte endpoints har vi brugt Zod som
    løsning på at få valideret den input, der
    sendes til backend. Da man bør anse alt data i
    en backend request som upålidelig er det
    vigtigt den bliver valideret før den fx gemmes
    i databasen, ellers er der stor risiko for at
    vi gemmer invalid data eller crasher backenden
    helt. Zod genererer også en liste over
    valideringsfejl, der kan gøre det nemmere at
    implementere fejlbeskeder i frontend.

## Ekstra implementerede features

## Database og bruger-autorisering

- Vi bruger Supabase som vores database-provider,
  og samtidig til vores bruger-autorisering.
  - Supabase har et indbygget bruger-system
    (`auth.users`), hvori vi opretter brugere. Ved
    siden har vi vores egen bruger-tabel med data
    til brugernes personlige profil
    (`public.users`), hvor primary key matcher
    primary key i den tilsbarende Supabase bruger.
- Vores backend har en forbindelse til Supabase
  gennem deres sql transaction pooler. Vi bruger
  også Supabase's JS library til at verificere
  brugernes JWT-token når de laver
  backend-requests.
- Vores frontend bruger også Supabase's JS library
  til at oprette nye brugere og til authorization,
  bl.a. for at få en ny JWT token når brugere
  logger ind.

---

# Arbejdsproces

## Interne design beslutninger, samt argumentation

## GitHub issues eksempler

---

## Opsummering og refleksion

> Post-mortem: En kort opsummering og refleksion
> over hvad har fungeret godt i projektet, og hvad
> I ville gøre anderledes hvis I skulle lave
> projektet igen — både i forhold til tekniske
> valg, samarbejde og projektstyring

---
