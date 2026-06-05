# Tag — User Data & Account Deletion

This document describes how Tag collects, uses, and deletes user data. It is intended for app store reviewers, Google OAuth verifiers, and users who want to understand our data practices.

**Contact:** [hello@tag-social.com](mailto:hello@tag-social.com)

---

## About Tag

Tag is a mobile app for collaborative video debates. Users record short video “takes,” tag other participants, and build multi-person debate chains. Tag is published by Tag Social and is available on iOS.

We do **not** sell personal data.

---

## Data We Collect

We collect only what is needed to operate the service:

| Data type | Purpose |
| --------- | ------- |
| **Account info** (email, username, date of birth, profile photo, bio) | Account creation, age verification (13+), profile display |
| **Video content** (recorded takes) | Core debate functionality; hosted via Cloudflare Stream |
| **Device push token** | Optional notifications when a user is tagged or a debate updates |
| **YouTube / TikTok OAuth tokens** (optional) | Only if the user explicitly links a platform to export a finished debate. Tokens are stored server-side and are never exposed to other users. |

---

## How Users Control Their Data

Users can manage their data directly in the app:

- **Update profile** — email, username, photo, and bio (Account Settings)
- **Disable push notifications** — device settings or by revoking permission in the app
- **Unlink YouTube or TikTok** — Profile → Linked Platforms. This **immediately deletes** the stored OAuth refresh token for that platform from our servers.
- **Delete account** — Account Settings → Delete Account (requires password confirmation)

Users may also request a copy of their data by emailing [hello@tag-social.com](mailto:hello@tag-social.com).

---

## Account Deletion — What Is Removed

When a user deletes their account, Tag permanently removes or disables the following:

### Deleted

- Firebase Authentication account (user can no longer sign in)
- Profile photo stored on our servers
- Notifications sent **to** the user
- User block records involving the user
- Solo debates and takes (debates created by the user alone, with no other participants)

### Anonymized (profile identifiers removed)

- Username replaced with **"[Deleted User]"**
- Email, bio, and profile photo URL cleared
- Push notification token removed

After deletion, the user cannot recover their account or sign in again.

Account deletion requires password re-authentication before any data changes. If deletion fails partway through, the app rolls back completed steps to avoid partial or inconsistent state.

---

## Account Deletion — What May Be Retained

Tag is a collaborative product. To preserve debate continuity for other participants, some content is retained in anonymized form:

### Retained for debate continuity

- Video takes in multi-participant debates (videos remain playable; display name shows as "[Deleted User]")
- Debate metadata (e.g. debate title, participant turn order)
- Open debates where the deleted user was the active responder are **closed** automatically

### Not modified by account deletion

- Cloudflare-hosted video files (underlying media for retained takes)
- Notifications previously sent **by** the user to others (historical inbox entries for other users)
- Abuse / moderation reports referencing the user (retained to enforce community guidelines)
- Legacy social data (likes, follows, etc.) where present

This approach removes personally identifiable profile information while keeping collaborative debate content available to other participants.

---

## YouTube & Google OAuth

Tag uses Google OAuth **only** when a user chooses to link YouTube to export a finished debate. We request the minimum scopes needed for that feature.

### How users revoke access

1. **In the app:** Profile → Linked Platforms → Unlink YouTube. This deletes the stored refresh token from our servers.
2. **In Google Account:** Users can revoke Tag's access at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).

OAuth tokens are stored server-side in Firestore (`youtubeTokens`) and are accessible only to our backend functions — not to other users or client apps.

### On account deletion

The user's sign-in credentials and profile identifiers are removed as described above. Users who have linked YouTube are encouraged to unlink before deleting their account, or revoke access via Google Account settings.

---

## TikTok OAuth

The same principles apply to TikTok:

- Linking is **optional** and only used for debate export.
- Users can unlink at any time from Profile → Linked Platforms, which deletes stored tokens from our servers.
- Users can also revoke access in their TikTok account settings.

---

## Data Retention Summary

| Category | While account is active | After account deletion |
| -------- | ----------------------- | ---------------------- |
| Email, username, bio, photo | Stored | Removed / anonymized |
| Date of birth | Stored (age gate) | Retained on anonymized profile record |
| Video takes (solo) | Stored | Deleted |
| Video takes (collaborative) | Stored | Retained; author shown as "[Deleted User]" |
| YouTube / TikTok tokens | Stored if linked | Removed when user unlinks; not auto-deleted on account delete |
| Push token | Stored if permitted | Removed |
| Auth credentials | Active | Permanently deleted |

---

## Security

- Authentication is handled by Firebase Auth (email/password).
- Account deletion requires password re-authentication before any data changes.
- If deletion fails partway through, the app rolls back completed steps to avoid partial or inconsistent state.
- Firestore security rules restrict users to reading and writing only their own profile, notifications, and blocks.

---

## Short Summary

> **Your data, your control.** Tag collects account information (email, username, date of birth, profile photo), video takes you record, and optional push notification and platform-linking tokens (YouTube/TikTok) used only for debate export. You can update your profile, unlink YouTube or TikTok (which deletes stored OAuth tokens), or delete your account at any time from Account Settings. Deletion permanently removes your login, profile identifiers, profile photo, solo content, and notifications to you; collaborative debate videos may remain so other participants can finish debates, with your name shown as "[Deleted User]." Contact [hello@tag-social.com](mailto:hello@tag-social.com) for data requests.

---

## Questions

For privacy or data requests: [hello@tag-social.com](mailto:hello@tag-social.com)
