# CampusFind — College Lost & Found Website

> **Advanced Programming (AP) | Four-Member Mini Project**  
> **Node.js • Express.js • EJS • HTML/CSS • JavaScript • Prisma • SQLite**

**Project status:** Planned — implementation has not started  
**Team:** Four students  
**Project type:** Simple full-stack college website  
**Main idea:** Students report lost and found items, and the website suggests possible matches based on item details.

> **Important:** This README is our project plan and contribution guide. The features and file names below are *proposed*, not already implemented. We will update the progress table and add GitHub commit/PR links as work is completed.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement and Objectives](#2-problem-statement-and-objectives)
3. [How the Website Works](#3-how-the-website-works)
4. [Project Scope and Features](#4-project-scope-and-features)
5. [Technology Stack](#5-technology-stack)
6. [Website Pages](#6-website-pages)
7. [Simple Project Architecture](#7-simple-project-architecture)
8. [Proposed Folder Structure](#8-proposed-folder-structure)
9. [Equal Work Distribution for Four Members](#9-equal-work-distribution-for-four-members)
10. [Database Design](#10-database-design)
11. [Simple Smart-Matching Logic](#11-simple-smart-matching-logic)
12. [Routes and API Plan](#12-routes-and-api-plan)
13. [Advanced Programming Topics Covered](#13-advanced-programming-topics-covered)
14. [Setup Instructions](#14-setup-instructions)
15. [Team Workflow and Contribution Tracking](#15-team-workflow-and-contribution-tracking)
16. [Testing Checklist](#16-testing-checklist)
17. [Project Development Plan](#17-project-development-plan)
18. [Limitations and Future Scope](#18-limitations-and-future-scope)

---

## 1. Project Overview

**CampusFind** is a college lost-and-found website. A student who loses something can submit a **Lost Item** report. A student who finds something can submit a **Found Item** report. The website saves both reports and compares their details to show **possible matches**.

Each report contains simple information:

- Item name (for example, *Water Bottle*)
- Category (for example, *Bottle*, *Electronics*, *Books*)
- Color
- College location (for example, *Library*, *Canteen*, *Lab*)
- Date the item was lost or found
- Short description

The matching feature uses **simple JavaScript comparisons**, not a trained AI model or a paid AI API. This keeps the project easy to build, understand, explain, and demonstrate in AP.

**Project flow:**

```text
Student reports LOST item             Student reports FOUND item
          |                                       |
          v                                       v
      Lost Form                               Found Form
          |                                       |
          +-------------------+-------------------+
                              |
                              v
                      Save in SQLite
                              |
                              v
                    Compare report details
                              |
                              v
                      Show likely matches
                              |
                              v
                Students verify at college
                     helpdesk / office
```

> A match is only a **suggestion**, not proof that the item belongs to someone. A real item should be returned only after checking ownership through the college helpdesk or an agreed supervised handover.

## 2. Problem Statement and Objectives

### Problem

Students frequently lose bottles, ID cards, notebooks, calculators, earphones, keys, and other belongings. A person who finds an item may not know who lost it. Notices in different groups are easy to miss.

### Objectives

1. Give the college one place for lost and found reports.
2. Make reporting simple through short forms.
3. Store reports using Prisma and SQLite.
4. Let students browse and search reports.
5. Show probable lost/found matches using clear rules.
6. Build a working Express.js project connected to the AP syllabus.
7. Give **all four members similarly sized, understandable coding tasks**.

## 3. How the Website Works

### Example

1. **Student A** loses a **black water bottle** near the library on **16 November**.
2. Student A opens **Report Lost**, fills in the details, and submits the form.
3. **Student B** finds a black bottle near the library on **17 November**.
4. Student B opens **Report Found** and submits the details.
5. The website compares category, name, color, location, and date.
6. It displays the reports as a **possible match** with a similarity score.
7. The students can refer to the report IDs at the college helpdesk to check ownership and arrange the return.

No automatic ownership decision is made by the website.

## 4. Project Scope and Features

### Features included in the first version

| Feature | What it does | Difficulty |
|---|---|---|
| Home page | Introduction and links to the main sections | Beginner-friendly |
| Report Lost | Form to add a lost item | Beginner-friendly |
| Report Found | Form to add a found item | Beginner-friendly |
| Browse Reports | Show all saved reports as cards | Beginner-friendly |
| Search and Filter | Search by item name, category, or report type | Beginner-friendly |
| Item Details | Show information for one report | Beginner-friendly |
| Smart Match Suggestions | Compare five fields with simple `if` conditions | Beginner-friendly |
| Database | Save reports in a local SQLite file | Beginner-friendly with shared setup |
| Responsive Design | Make pages usable on laptop and mobile | Beginner-friendly |

### Features intentionally left out of the first version

- User accounts and personal dashboards
- Complex ownership-claim workflows
- Messaging or notifications
- Photo uploads
- Live GPS tracking
- Machine-learning models or external AI services
- Editing or deleting someone else's reports

This limited scope is deliberate: **we want a complete, understandable project rather than many incomplete features.**

## 5. Technology Stack

| Part | Technology | Why we use it |
|---|---|---|
| Frontend | HTML, CSS, EJS | Simple pages rendered by Express |
| Browser scripting | Vanilla JavaScript | Basic form interactions |
| Backend | Node.js + Express.js | Routes, requests, responses |
| Database | SQLite | Runs locally without separate DB setup |
| Database tool | Prisma ORM (v6 for this planned setup) | Models, migrations, simple queries |
| Template engine | EJS | Display database data in HTML |
| Development tool | Nodemon | Restart the server automatically |
| Version control | Git + GitHub | Show each member's individual work |

**Why this stack?** We only need **one Express server** for the whole website. We do not need a separate React frontend or another backend application.

## 6. Website Pages

| Page | URL | Content | Responsible member |
|---|---|---|---|
| Home | `/` | Introduction and buttons for the main features | Shared |
| Report Lost | `/lost` | Lost item form and success message | Member 1 |
| Report Found | `/found` | Found item form and success message | Member 2 |
| Browse Reports | `/browse` | Report cards, search and filters | Member 3 |
| Item Details | `/reports/:id` | Full details of one report | Member 3 |
| Possible Matches | `/matches/:id` | Matching reports and similarity scores | Member 4 |

### UI idea

```text
 --------------------------------------------------------
| CampusFind        Home  Lost  Found  Browse Reports     |
 --------------------------------------------------------
|                                                        |
|            Lost something on campus?                  |
|       Find it faster with CampusFind.                 |
|                                                        |
|       [ Report Lost ]  [ Report Found ]               |
|                                                        |
|             [ Browse All Reports ]                    |
|                                                        |
 --------------------------------------------------------
```

Use the same navbar, footer, font, buttons, and card design throughout the website. Keep all pages clean and mobile-friendly.

## 7. Simple Project Architecture

We will follow a **small MVC-style structure**:

```text
Browser
  |
  | Form submission / page request
  v
Express Router
  |
  v
Controller (reads form data, calls DB, sends response)
  |
  +----> Prisma ----> SQLite database
  |
  +----> Matching function (only for match page)
  |
  v
EJS Template + CSS
  |
  v
Browser
```

**Simple explanation of each layer:**

- **Route:** Which URL should run which function?
- **Controller:** What should happen when that URL is opened or a form is submitted?
- **Prisma:** How do we save and read reports?
- **EJS view:** How do we show information on the page?
- **Matching service:** How similar are a lost report and a found report?

We will avoid unnecessary extra layers and complicated folder nesting.

## 8. Proposed Folder Structure

```text
campusfind/
|
|-- prisma/
|   |-- schema.prisma             # One Report model
|   `-- migrations/              # Database changes
|
|-- public/
|   |-- css/
|   |   `-- style.css             # Common styling
|   `-- js/
|       `-- main.js               # Small browser interactions
|
|-- views/
|   |-- partials/
|   |   |-- navbar.ejs
|   |   `-- footer.ejs
|   |-- home.ejs                   # Shared home page
|   |-- lost.ejs                   # Member 1
|   |-- found.ejs                  # Member 2
|   |-- browse.ejs                 # Member 3
|   |-- details.ejs                # Member 3
|   `-- matches.ejs                # Member 4
|
|-- src/
|   |-- app.js                    # Express app configuration
|   |-- server.js                 # Starts the server
|   |-- db.js                     # Shared Prisma client
|   |
|   |-- routes/
|   |   |-- lost.routes.js        # Member 1
|   |   |-- found.routes.js       # Member 2
|   |   |-- browse.routes.js      # Member 3
|   |   `-- match.routes.js       # Member 4
|   |
|   |-- controllers/
|   |   |-- lost.controller.js    # Member 1
|   |   |-- found.controller.js   # Member 2
|   |   |-- browse.controller.js  # Member 3
|   |   `-- match.controller.js   # Member 4
|   |
|   |-- services/
|   |   `-- match.service.js      # Member 4: scoring logic
|   |
|   `-- events/
|       `-- report.events.js      # Tiny EventEmitter demo (shared)
|
|-- scripts/
|   |-- seed.js                   # Optional sample reports
|   `-- cli-demo.js               # Optional readline/process demo
|
|-- docs/
|   `-- TESTING.md                # Shared test observations
|
|-- .env.example                  # Example database setting
|-- .gitignore
|-- package.json
|-- package-lock.json
`-- README.md
```

**Folder ownership rule:** Every member edits their own route, controller, and view first. Files such as `app.js`, `db.js`, `schema.prisma`, and `style.css` are shared and should be changed only after discussing with the team.

## 9. Equal Work Distribution for Four Members

### Our team rule

**Divide work by feature, not by technology.** Every member gets hands-on practice with:

- **One frontend feature** using EJS/HTML/CSS
- **One Express route file**
- **One controller file**
- **Simple Prisma database reads or writes**
- **Input handling or logic**
- **Testing and a short explanation of their code**

This is more balanced than assigning one student *all frontend work* and another student *all backend work*.

### Team assignment summary

| Member | Main feature | Frontend task | Backend / database task | Additional small task |
|---|---|---|---|---|
| **Member 1 — [Name]** | Lost Item | Lost-item form | Save lost report in SQLite | Required-field validation |
| **Member 2 — [Name]** | Found Item | Found-item form | Save found report in SQLite | Required-field validation |
| **Member 3 — [Name]** | Browse Items | Report cards and search bar | Read/filter reports from SQLite | Item details page |
| **Member 4 — [Name]** | Matching | Possible-matches page | Read reports and calculate scores | Explain match reasons |

### Member 1 — Lost Item Module

**Goal:** Make the Lost Item form work.

- Create `views/lost.ejs` with item name, category, color, location, date, and description.
- Add `GET /lost` to show the form.
- Add `POST /lost` to read submitted data and save a `LOST` report using Prisma.
- Show a success/error message when a student submits the form.
- Test a valid report and a form with missing required details.

**Own files:** `lost.ejs`, `lost.routes.js`, `lost.controller.js`  
**Easy concepts learned:** EJS forms, GET/POST, `req.body`, validation, Prisma `create()`.

### Member 2 — Found Item Module

**Goal:** Make the Found Item form work.

- Create `views/found.ejs` with the same easy fields as the Lost form.
- Add `GET /found` to show the form.
- Add `POST /found` to save a `FOUND` report using Prisma.
- Show a success/error message when a student submits the form.
- Test a valid report and a form with missing required details.

**Own files:** `found.ejs`, `found.routes.js`, `found.controller.js`  
**Easy concepts learned:** EJS forms, GET/POST, `req.body`, validation, Prisma `create()`.

### Member 3 — Browse and Search Module

**Goal:** Display the saved reports and let students find them.

- Create `views/browse.ejs` to display report cards.
- Add `GET /browse` to load reports using Prisma `findMany()`.
- Add a simple search input and **Lost / Found** filter.
- Create `views/details.ejs` and `GET /reports/:id` for one report's details.
- Test search and the empty-results message.

**Own files:** `browse.ejs`, `details.ejs`, `browse.routes.js`, `browse.controller.js`  
**Easy concepts learned:** `req.query`, `req.params`, Prisma `findMany()` / `findUnique()`, EJS loops.

### Member 4 — Smart Matching Module

**Goal:** Suggest similar reports using understandable JavaScript.

- Create `views/matches.ejs` to display likely matches.
- Add `GET /matches/:id` for an item report.
- Load reports of the **opposite type** from the database.
- Compare category, item-name words, color, location, and date using a small scoring function.
- Show a score and simple reasons such as **same category** or **same color**.
- Test one clear match and one clear non-match.

**Own files:** `matches.ejs`, `match.routes.js`, `match.controller.js`, `match.service.js`  
**Easy concepts learned:** `req.params`, arrays, functions, `filter()`, `map()`, sorting, Prisma reads.

### Why this is balanced

- Members **1 and 2** each build one complete form and its save functionality.
- Member **3** builds a list/details display and simple filters, with no complicated writing logic.
- Member **4** builds one match display and a **short rule-based function**, not a machine-learning system.
- All four members work on **frontend + Express + Prisma** and can explain their own features in a viva.
- Shared setup, styling decisions, documentation, and final testing are completed **together**.

**Estimated difficulty:** All four modules are designed for beginners who know basic JavaScript and Express. The team will walk through the scoring function together before Member 4 implements it. If one member finishes early, they should help with integration or tests rather than take over someone else's code.

## 10. Database Design

The first version needs **only one table/model**, named `Report`.

### Report fields

| Field | Type | Purpose |
|---|---|---|
| `id` | Integer | Automatic report number |
| `type` | String | `LOST` or `FOUND` |
| `title` | String | Item name |
| `category` | String | Bottle, Book, Electronics, etc. |
| `color` | String | Item color |
| `location` | String | College location |
| `itemDate` | DateTime | Date item was lost or found |
| `description` | String (optional) | Short public description |
| `status` | String | `OPEN` initially |
| `createdAt` | DateTime | Time report was submitted |

### Planned Prisma schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Report {
  id          Int      @id @default(autoincrement())
  type        String
  title       String
  category    String
  color       String
  location    String
  itemDate    DateTime
  description String?
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
}
```

**Why one model?** It is easier to understand than separate user, claim, match, and item tables. Both lost and found records are saved in `Report`; only the `type` changes. Match scores are **calculated when requested** and do not need their own table.

**Data-entry tip:** Use fixed choices for category and location in both forms, so the matching logic stays simple. Do not collect personal phone numbers, passwords, or other unnecessary private information in public reports.

## 11. Simple Smart-Matching Logic

### Is this really AI?

This MVP uses **rule-based smart matching** (an AI-inspired feature), not a trained AI model. We should describe it accurately in our demonstration: *"The website recommends likely matches by comparing structured fields using JavaScript."*

### Comparison rules

First, compare a selected report only with reports of the **opposite type** that are still `OPEN`.

| Field | Rule | Maximum score |
|---|---|---:|
| Category | Same category (ignoring uppercase/lowercase) | 25 |
| Item name | Exact name: 25; one name contains the other: 15 | 25 |
| Color | Same color | 20 |
| Location | Same selected campus location | 20 |
| Date | Within 3 days: 10; within 7 days: 5 | 10 |
| **Total** | | **100** |

**Showing results:**

- **60–100 points:** Show as a possible match.
- **0–59 points:** Do not show by default.
- Sort results from highest score to lowest.

### Basic algorithm (easy to explain)

```js
// Example idea — implemented in src/services/match.service.js
function normalize(text = "") {
  return text.trim().toLowerCase();
}

function nameScore(nameA, nameB) {
  const a = normalize(nameA);
  const b = normalize(nameB);

  if (a === b) return 25;
  if (a.includes(b) || b.includes(a)) return 15;
  return 0;
}

function calculateScore(lost, found) {
  let score = 0;

  if (normalize(lost.category) === normalize(found.category)) score += 25;
  score += nameScore(lost.title, found.title);
  if (normalize(lost.color) === normalize(found.color)) score += 20;
  if (normalize(lost.location) === normalize(found.location)) score += 20;

  const dayGap = Math.abs(
    new Date(lost.itemDate).getTime() - new Date(found.itemDate).getTime()
  ) / (1000 * 60 * 60 * 24);

  if (dayGap <= 3) score += 10;
  else if (dayGap <= 7) score += 5;

  return score;
}

module.exports = { calculateScore };
```

> This function assumes reports have already been validated and nonempty categories, names, colors, locations, and valid dates are stored. It gives a **similarity score**, not a guarantee of ownership.

### Example

```text
LOST REPORT
  ID:        11
  Item:      Black Water Bottle
  Category:  Bottle
  Color:     Black
  Location:  Library
  Date:      16 Nov 2026

FOUND REPORT
  ID:        19
  Item:      Water Bottle
  Category:  Bottle
  Color:     Black
  Location:  Library
  Date:      17 Nov 2026

RESULT
  Category:  +25
  Name:      +15  ("water bottle" appears in both names)
  Color:     +20
  Location:  +20
  Date:      +10
  ----------------
  Score:      90 / 100
  Label:      Possible Match
```

A student's next step is **manual ownership verification**, not an automatic claim or transfer.

## 12. Routes and API Plan

### Website routes (EJS pages)

| Method | Route | Purpose | Owner |
|---|---|---|---|
| `GET` | `/` | Home page | Shared |
| `GET` | `/lost` | Show lost item form | Member 1 |
| `POST` | `/lost` | Save lost item form | Member 1 |
| `GET` | `/found` | Show found item form | Member 2 |
| `POST` | `/found` | Save found item form | Member 2 |
| `GET` | `/browse` | Show and filter all reports | Member 3 |
| `GET` | `/reports/:id` | Show one report | Member 3 |
| `GET` | `/matches/:id` | Show suggested matches | Member 4 |

### Small REST-style API examples (optional demonstration)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/reports` | Return all reports as JSON |
| `GET` | `/api/reports/:id` | Return one report as JSON |
| `GET` | `/api/reports/:id/matches` | Return suggested matches as JSON |

The first working version can use **EJS form routes only**. JSON endpoints are a small extension if needed to demonstrate REST without duplicating the full app.

### Example form data

```json
{
  "type": "LOST",
  "title": "Black Water Bottle",
  "category": "Bottle",
  "color": "Black",
  "location": "Library",
  "itemDate": "2026-11-16",
  "description": "Last seen near the reading area"
}
```

## 13. Advanced Programming Topics Covered

The project is designed to demonstrate the course topics from our AP syllabus without adding difficult, unrelated features.

| AP topic | Simple project usage |
|---|---|
| JavaScript | Forms, functions, arrays, filtering, matching score |
| Introduction to Backend | Express processes browser requests |
| Introduction to Node.js | Run backend JavaScript using Node |
| Module System | `require()` and `module.exports` in route/controller files |
| Process Module | `process.env.PORT`; optional `process.argv` in a small script |
| Path Module | `path.join()` for static files and EJS paths |
| Event Module | Small `EventEmitter` demo when a report is submitted |
| Readline Module | Optional `readline.question()` mini-script in `scripts/cli-demo.js` |
| FS Module | Simple `fs.appendFile()` example for local demo logs |
| HTTP Module | Understand requests/responses; `http.createServer(app)` if demonstrated |
| Express Routing | `GET /lost`, `POST /found`, etc. |
| REST | Simple report-related `GET` JSON endpoints |
| Express Middleware | `express.urlencoded()`, `express.json()`, and a basic error handler |
| Express Router | Separate route files for all four members |
| Express Static File Server | Serve CSS and JS using `express.static()` |
| MVC-style organization | EJS views, routes, controllers, and a small service |
| Prisma Introduction | Connect Express to SQLite via Prisma |
| Prisma Model | `Report` defined in `schema.prisma` |
| Prisma Migrate | Create and update local database tables |

**Course scope note:** The screenshot crosses out *Event Loop*, *Readable Streams*, and *Prisma Client + Prisma CRUD*. We will not create extra features just to demonstrate crossed-out topics. Basic Prisma calls are still needed to save and read reports. The tiny CLI/event/file demos can be prepared together if required by the instructor; they do not become one member's large separate task.

## 14. Setup Instructions

> These are the **planned setup commands after the source code has been added**. This README alone is not a runnable application.

### Requirements

- Node.js and npm
- Git
- VS Code (recommended)

### Step 1 — Get the code

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd campusfind
```

Replace the URL with our own GitHub repository when it is created.

### Step 2 — Install dependencies

We will use matching Prisma **v6** packages for the planned simple JavaScript setup:

```bash
npm install express ejs dotenv @prisma/client@6
npm install -D prisma@6 nodemon
```

Once `package.json` is committed, other members only need:

```bash
npm install
```

### Step 3 — Create `.env`

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Store these example values in `.env.example`, and keep `.env` out of Git.

### Step 4 — Create the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5 — Start the server

Planned scripts for `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "db:migrate": "prisma migrate dev"
  }
}
```

Run:

```bash
npm run dev
```

Open `http://localhost:3000` after the code is implemented.

## 15. Team Workflow and Contribution Tracking

### Team members

| Member | Name | Roll number | GitHub username | Assigned module |
|---|---|---|---|---|
| 1 | `[Full Name]` | `[Roll No.]` | `[@username]` | Lost Item |
| 2 | `[Full Name]` | `[Roll No.]` | `[@username]` | Found Item |
| 3 | `[Full Name]` | `[Roll No.]` | `[@username]` | Browse and Search |
| 4 | `[Full Name]` | `[Roll No.]` | `[@username]` | Smart Matching |

### Simple GitHub branch plan

| Member | Branch | Main folder/files |
|---|---|---|
| 1 | `feature/lost-items` | Lost view, route, controller |
| 2 | `feature/found-items` | Found view, route, controller |
| 3 | `feature/browse-items` | Browse/details views, route, controller |
| 4 | `feature/item-matching` | Matches view, route, controller, scoring function |

Example commands:

```bash
git checkout -b feature/lost-items
git add .
git commit -m "Add lost item form and save route"
git push -u origin feature/lost-items
```

Each member should open a pull request (PR), explain what they implemented, and record a screenshot or a short test result. Do not claim a task is completed until its code has been committed and tested.

### Contribution tracker — update during development

| Member | Main deliverable | Current status | PR / commit evidence |
|---|---|---|---|
| Member 1 | Lost report form + save route | Not started | — |
| Member 2 | Found report form + save route | Not started | — |
| Member 3 | Browse, search + details page | Not started | — |
| Member 4 | Match suggestions page + scoring | Not started | — |

**Status options:** `Not started` → `In progress` → `Completed`.

### Shared team tasks

All four members together will:

1. Decide the page colors, navbar, common form fields, and categories.
2. Create the initial Express app and the **one shared Prisma model**.
3. Agree on route names and file ownership before coding.
4. Review each other's PRs and test all four modules together.
5. Update README progress, screenshots, and the final presentation.

This prevents one person from silently carrying the difficult setup work while others do only UI tasks.

### What each member should explain in the AP viva

| Member | Short explanation to prepare |
|---|---|
| 1 | How an EJS form sends data to Express and saves a lost report |
| 2 | How a found report is validated and saved |
| 3 | How Express reads query parameters and displays database results |
| 4 | How fields are compared and a score is calculated |

Every member should also understand the **whole website flow** and be able to identify the route, controller, and view for their module.

## 16. Testing Checklist

| Test | Expected output | Owner |
|---|---|---|
| Open `/lost` | Lost report form appears | Member 1 |
| Submit correct lost details | New `LOST` report saved | Member 1 |
| Submit missing lost-item name | Clear validation message | Member 1 |
| Open `/found` | Found report form appears | Member 2 |
| Submit correct found details | New `FOUND` report saved | Member 2 |
| Submit missing found-item category | Clear validation message | Member 2 |
| Open `/browse` | Saved item cards appear | Member 3 |
| Filter only found items | Only `FOUND` reports appear | Member 3 |
| Search a nonexistent item | Empty-results message appears | Member 3 |
| Open `/matches/:id` | Opposite-type reports are compared | Member 4 |
| Compare similar item reports | High enough score appears in results | Member 4 |
| Compare unrelated reports | No false strong match appears | Member 4 |
| Open all pages on a phone | Layout remains readable | Shared |
| Reload after submission | Saved reports remain in SQLite | Shared |

**Test evidence:** Add screenshots, sample report IDs, and notes to `docs/TESTING.md` as tests are completed.

## 17. Project Development Plan

| Phase | Work | Who |
|---|---|---|
| **1. Common setup** | Create repo, install packages, configure Express, add shared EJS layout and Prisma model | All 4 together |
| **2. Individual coding** | Build Lost, Found, Browse, and Matching modules on separate branches | Each member |
| **3. Integration** | Connect routes, verify saved reports display, link Browse to Match page | All 4 together |
| **4. Testing** | Test forms, search, score calculations, broken links, and mobile layout | All 4 together |
| **5. Submission** | Finalize README, screenshots, individual commit evidence, and AP demo | All 4 together |

### Minimum successful demonstration

A working demo should show:

1. A lost report is submitted.
2. A found report is submitted.
3. Both appear in Browse Reports.
4. Search/filter works.
5. Clicking **Find Matches** displays the likely corresponding report.
6. The team explains why the matching score was assigned.

If these six steps work smoothly, the **core project is complete**.

## 18. Limitations and Future Scope

### Current limitations (intentional for this AP project)

- The score is a simple comparison of text and dates; it cannot verify an actual owner.
- A student may submit incomplete or incorrect details.
- Reports are visible to people using the website, so personal information should not be entered.
- Item return/closure is handled outside the website in the first version.
- The first version does not include image matching or live notifications.

### Possible future improvements

- Photo uploads for items
- More advanced keyword or NLP-based matching
- College helpdesk review and item-return status updates
- Better synonyms for item names and campus locations
- Email notifications when likely matches appear

These ideas are **not required for the first submission**.

---

## Final Project Summary

**CampusFind = Lost Form + Found Form + Browse/Search + Smart Matching**

- **One Express server**
- **One Prisma model**
- **One SQLite database**
- **Four independent feature modules**
- **Four visible GitHub contributions**
- **Simple JavaScript matching, no complex AI setup**

Our goal is a **clean, complete, explainable college project** in which all four members can confidently understand and present their contributions.

> **Next development step:** Create `src/app.js`, `src/server.js`, the shared `Report` Prisma model, and the common navbar. Then every member can begin their own feature branch.
