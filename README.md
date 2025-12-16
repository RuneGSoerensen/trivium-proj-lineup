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

<img width="715" height="820" alt="image" src="https://github.com/user-attachments/assets/b9d8737b-cc9f-4ab7-b4b1-ef715ba1bb1c" />

- **User profil**

<img width="710" height="655" alt="image" src="https://github.com/user-attachments/assets/9cddbb87-2574-496e-ab53-7cb20215ab64" />

- **User feed side**

<img width="718" height="748" alt="image" src="https://github.com/user-attachments/assets/09982e60-5b68-426a-bf6f-8590fea6ba9f" />

- **Services side**

<img width="725" height="858" alt="image" src="https://github.com/user-attachments/assets/8d8a44a2-f292-46a3-8868-2a2eb4e0d3d5" />

- **Create side**

<img width="708" height="720" alt="image" src="https://github.com/user-attachments/assets/4c3340e7-a06a-4fa1-8374-1bbbb8204167" />

- **Chats side**

<img width="717" height="243" alt="image" src="https://github.com/user-attachments/assets/4373717a-962b-4008-82d5-e82731ff41ac" />

- **Search**

<img width="719" height="842" alt="image" src="https://github.com/user-attachments/assets/46fc6b2a-4f0f-450d-b54c-d201e332ff42" />

- **Navigation**
  <img width="455" height="104" alt="image" src="https://github.com/user-attachments/assets/29ee6660-3e45-48ed-8b14-3cc7f2d830be" />
  <img width="273" height="673" alt="image" src="https://github.com/user-attachments/assets/11db6084-5c46-4914-b66f-12c2e363902d" />
  <img width="450" height="657" alt="image" src="https://github.com/user-attachments/assets/8fd969e1-1fe4-4e75-b9d6-5b58b722f029" />

- **Mobile-first design with desktop mode**

## Kendte issues

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

## Manglende features

- **Chat**
  - Vi har en velfungerende chat funktion der
    endda undersøtter gruppechats, men desværre er
    det pt ikke muligt at _oprette_ hverken
    privat- eller gruppechats.

## Ekstra implementerede features

- Vores desktop-design er originalt, vi ønskede at
  vise samme indhold som i mobil-udgaven på en
  mere desktop-venlig måde.

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
