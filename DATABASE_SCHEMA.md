# DeltaBuilds - Supabase Database Schema

This document outlines the proposed database schema for the DeltaBuilds application using Supabase (PostgreSQL).

## Tables

### 1. `users`

Stores public user profile information, extending the built-in `auth.users` table.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Foreign Key to `auth.users.id` | References the `id` in Supabase's `auth.users` table. |
| `username` | `text` | Unique, Not Null | Public display name for the user. |
| `avatar_url` | `text` | | URL for the user's profile picture. |
| `bio` | `text` | | A short user biography. |
| `socials` | `jsonb` | | JSON object containing links to social media profiles (e.g., `{ "youtube": "...", "twitch": "..." }`). |
| `role` | `text` | Not Null, Default: `'user'` | User role (`'user'` or `'admin'`). |
| `status` | `text` | Not Null, Default: `'active'` | User account status (`'active'` or `'banned'`). |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the profile was created. |
| `updated_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of the last profile update. |

**RLS Policies:**
- Users can view all profiles.
- Users can only update their own profile.
- Admins can update any profile.

---

### 2. `builds`

Stores the core information for each weapon build.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | Unique identifier for the build. |
| `author_id` | `uuid` | Not Null, Foreign Key to `users.id` | The user who created the build. |
| `name` | `text` | Not Null | The name of the build. |
| `base_weapon` | `text` | Not Null | The base weapon for the build (e.g., 'M4A1'). |
| `description` | `text` | Not Null | A detailed description of the build. |
| `youtube_url` | `text` | | Optional URL to a YouTube video showcasing the build. |
| `gallery_image_urls` | `text[]` | | Array of URLs for gallery images. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the build was first created. |

**RLS Policies:**
- All users can view all builds.
- Authenticated users can create new builds.
- Users can only update/delete their own builds.
- Admins can update/delete any build.

---

### 3. `build_versions`

Stores version history for each build.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | Unique identifier for the version. |
| `build_id` | `uuid` | Not Null, Foreign Key to `builds.id` | The build this version belongs to. |
| `version` | `text` | Not Null | Version number (e.g., '1.0', '1.1'). |
| `steam_code` | `text` | | Import code for the Steam platform. |
| `garena_code` | `text` | | Import code for the Garena platform. |
| `mobile_code` | `text` | | Import code for the Mobile platform. |
| `patch_notes` | `text` | | Notes describing changes in this version. |
| `status` | `text` | Not Null, Default: `'pending'` | Status of the version (`'active'`, `'pending'`, `'disabled'`). |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when this version was submitted. |

**RLS Policies:**
- All users can view versions of active builds.
- Authenticated users can create new versions for their own builds.
- Admins can update any version.

---

### 4. `tags`

Stores all available playstyle tags.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `serial` | Primary Key | Unique identifier for the tag. |
| `name` | `text` | Unique, Not Null | The name of the tag (e.g., 'Aggressive'). |

---

### 5. `build_tags` (Junction Table)

Links builds to their tags.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Primary Key, Foreign Key to `builds.id` | |
| `tag_id` | `integer` | Primary Key, Foreign Key to `tags.id` | |

---

### 6. `comments`

Stores comments made on builds.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | Unique identifier for the comment. |
| `build_id` | `uuid` | Not Null, Foreign Key to `builds.id` | The build the comment was made on. |
| `author_id` | `uuid` | Not Null, Foreign Key to `users.id` | The user who wrote the comment. |
| `text` | `text` | Not Null | The content of the comment. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the comment was posted. |

**RLS Policies:**
- All users can read comments.
- Authenticated users can create comments.
- Users can update/delete their own comments.
- Admins can delete any comment.

---

### 7. `votes`

Stores upvotes and downvotes for builds.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Primary Key, Foreign Key to `builds.id` | |
| `user_id` | `uuid` | Primary Key, Foreign Key to `users.id` | |
| `vote_type` | `integer` | Not Null, Check `(-1 or 1)` | `1` for an upvote, `-1` for a downvote. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | |

**RLS Policies:**
- Authenticated users can insert/update/delete their own votes.

---

### 8. `favorites`

Stores which users have favorited which builds.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `build_id` | `uuid` | Primary Key, Foreign Key to `builds.id` | |
| `user_id` | `uuid` | Primary Key, Foreign Key to `users.id` | |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | |

**RLS Policies:**
- Authenticated users can insert/delete their own favorites.

---

### 9. `reports`

Stores reports of non-working import codes.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | |
| `version_id` | `uuid` | Not Null, Foreign Key to `build_versions.id` | The specific version of the build being reported. |
| `reporter_id` | `uuid` | Not Null, Foreign Key to `users.id` | The user who submitted the report. |
| `reason` | `text` | | Optional reason for the report. |
| `status` | `text` | Not Null, Default: `'open'` | Status of the report (`'open'`, `'resolved_valid'`, `'resolved_invalid'`). |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | |

**RLS Policies:**
- Authenticated users can create reports.
- Admins can read and update reports.
