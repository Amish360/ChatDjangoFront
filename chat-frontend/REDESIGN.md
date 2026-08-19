# Redesign Notes

This document records the color theme actually in use and what's left to
redesign, so future changes stay deliberate instead of drifting.

## Terra is now the whole app's theme

Every screen (`Welcome`, `Login`, `Signup`, `Messages`, `ChatScreen`,
`Friends`, plus the nav chrome) uses the Terra palette via the shared
primitives in `src/components/ui/` (`Button`, `Card`, `TextInput`) and the
`.font-terra` (Nunito Sans) utility in `src/index.css`.

| Role              | Value          | Used for                             |
|-------------------|----------------|---------------------------------------|
| Primary           | `#4a7c59`      | Primary buttons, links, headings, focus ring, active nav state |
| Page background   | `#fcfaf7`      | Page background app-wide              |
| Input / secondary surface | `#f4f1ea` | `TextInput` background, unread notification rows, filter pills |
| Heading text      | `#2f4d38`      | Headings                              |
| Body/other-bubble text | `#2e3230` | Chat bubbles from the other person    |
| Card              | `bg-white`, `rounded-3xl`, `shadow-[0_4px_24px_rgba(0,0,0,0.04)]` | `Card` primitive |

**Not yet migrated**: `ForgetPassword.jsx` and `OTPScreen.jsx` still use the
original blue palette (`bg-blue-500`, `bg-blue-100`, `bg-red-500` for Cancel)
— they weren't covered by either Terra brief so far.

## Nav system

`Layout.jsx` composes `TopAppBar` (sticky, logo + `NotificationBell`),
`SideNavBar` (desktop, vertical, Feed/Messages/Friends/Profile all
functional via `NavLink` with an active-state highlight, plus a working
"Create Post" button), and `BottomNavBar` (same entries, mobile only,
fixed to the bottom). No "Soon" placeholders remain — every nav entry now
goes somewhere real. `Layout.jsx` also renders the global `CreatePost`
modal/sheet and a bottom-center toast pill, both driven by `AppDataContext`
so they work no matter which page triggered them.

## Messages/Chat

`/messages` and `/messages/:recipient` both render `Messages.jsx`, which
always shows the conversation-list sidebar (search, unread green dot,
relative timestamp) and conditionally renders `ChatScreen.jsx` in the right
pane — a real two-pane desktop inbox, collapsing to one full-width pane at a
time on mobile. Chat bubbles: self is right-aligned green
(`rounded-t-2xl rounded-bl-2xl`), the other person is left-aligned beige
(`rounded-t-2xl rounded-br-2xl`). Call/attachment/emoji icons in the header
and input bar are decorative — no backend to wire them to.

## Friends

Desktop: left column of pending requests (Accept = primary green, Decline =
gray outline — not red), main area = search + "All / Recently Active" filter
pills + a responsive grid of every user (friends get a "Message" link,
everyone else gets "Add Friend"/"Pending"). Mobile: the same two sections
behind a "Requests" / "All Friends" tab switch.

## Notifications

`NotificationBell.jsx` opens a right-aligned drawer on desktop
(`md:w-96`, with a dimmed backdrop) and a full-page view on mobile (same
component, `fixed inset-0`). Filter chips (All/Unread/Mentions/System) sit
above items grouped into "New"/"Earlier"; unread friend-request items get
inline Accept/Decline buttons that call the same `acceptRequest`/
`declineRequest` actions used on the Friends page. Mentions/System have no
backing data yet (no mentions or system-alert feature exists), so those
chips correctly show the empty state (🌱 + short copy) rather than being
faked.

## Profile

New `/profile` page, reachable from both nav bars: **Public Profile** (avatar
initials + editable bio), **Account Security** (email/password — password is
never actually stored, just cleared on save), **Preferences** (`Toggle`
switches for notifications/visibility, applying instantly). Desktop uses a
2-column grid; mobile stacks the cards and pins Save Changes/Log Out above
the bottom nav. Log Out just navigates home — there's no real session.

## Feed, Create Post, and post interactions

New `/feed` page: a composer-prompt card at the top (opens `CreatePost`),
then post cards (`Avatar`, name, relative time, decorative "more" menu,
optional image, caption, and a Like/Comment/Share action row). Liking fills
the heart green with a brief scale-up (`.animate-like-pop` in `index.css`);
commenting expands an inline list + input under the card; Share just fires
the toast — none of the three call a backend. `CreatePost.jsx` is the same
responsive modal/bottom-sheet pattern already used for Login/Signup, and
lets you attach a local image (previewed via `URL.createObjectURL`, never a
fabricated remote URL). One deliberate scope trim from the brief: comments
use the same inline-expand UI on both desktop and mobile rather than a
separate side-panel/bottom-sheet variant for each — reuses machinery instead
of building a second overlay system on top of `CreatePost`'s.

## What's left

1. **Migrate `ForgetPassword`/`OTPScreen` to Terra** — smallest remaining
   piece, same `Card`/`Button`/`TextInput` primitives already used
   everywhere else, so the whole app is on one palette with no exceptions.
2. **Standardize spacing.** Card padding is consistently `p-8` (the `Card`
   primitive's default) now; double check nothing still hand-rolls
   `p-4`/`p-6` card padding outside of it.
3. **Real presence/timestamps.** "Active recently" and message timestamps
   are currently static mock fields (`mockUsers.js`'s `active` flag,
   `Messages.jsx`'s `minutesAgo`) — fine for a frontend-only mock, but
   flagging in case this gets wired to a real backend later.
