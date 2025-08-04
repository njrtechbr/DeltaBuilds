# DeltaBuilds - Logic and Features

This document describes the core business logic and feature set of the DeltaBuilds application.

## Core Features

- **Build Submission:** Authenticated users can submit new weapon builds, including a name, base weapon, description, tags, import codes for various platforms, and optional media like YouTube videos and image galleries.
- **Build Versioning:** Users can submit new versions for their existing builds, including patch notes to describe the changes.
- **Build Discovery:** All users can browse, search, and filter a list of all active builds. Filtering is available by weapon name, playstyle, and available code platforms (Steam, Garena, Mobile).
- **Voting System:** Authenticated users can upvote or downvote builds to reflect their quality and effectiveness.
- **Commenting:** Authenticated users can leave comments on builds to discuss them with the community.
- **User Authentication:** User registration and login, prepared for Supabase Auth integration (email/password and social providers).
- **User Profiles:** Public user profiles display submitted builds, favorite builds, reputation, bio, and social media links.
- **Profile Editing:** Authenticated users can edit their own profile information.
- **Build Validation:** Builds are marked with a status (`Valid`, `Invalid`, `Pending`) to give users a quick visual indicator of their viability. `Pending` builds require admin approval.
- **AI-Powered Tag Suggestions:** When creating a build, users can get AI-generated playstyle tag suggestions based on their build description.
- **AI-Powered Code Parsing:** The system attempts to automatically extract the base weapon and weapon type from a provided import code.
- **AI-Powered Translation:** Users can translate build descriptions into their own language with one click.
- **Internationalization (i18n):** The UI is translated into English, Spanish, and Portuguese.
- **Admin Panel:** A dedicated section for administrators to manage the platform.
  - **Dashboard:** An overview of key platform statistics.
  - **Builds Management:** Admins can approve, disable, edit, or delete any build.
  - **Users Management:** Admins can manage user roles (admin/user) and status (active/banned).
  - **Reports Management:** Admins can review and act on user-submitted reports for non-working import codes.

## Core Logic

### Reputation System

The reputation system is designed to reward users for positive contributions to the community. Points are calculated as follows:

- **+25 points** for each new build submitted.
  - *Rationale: Encourages the creation of new content.*
- **+10 points** for each upvote received on a submitted build.
  - *Rationale: Rewards the creation of high-quality, popular content.*
- **-2 points** for each downvote received on a submitted build.
  - *Rationale: Discourages low-effort or poorly constructed builds.*
- **+1 point** for each comment posted on any build.
  - *Rationale: Encourages community discussion and engagement.*

The reputation score is displayed on a user's profile and serves as a measure of their standing within the community.

### Build Status Flow

1.  A user submits a new build. The initial version's status is set to **`pending`**.
2.  An administrator reviews the pending build in the admin panel.
3.  The admin can **approve** the build, changing its status to **`active`**. The build now appears on the public discovery pages.
4.  The admin can **disable** the build, changing its status to **`disabled`**. The build is hidden from public view. This is useful for builds that are outdated, broken, or violate rules.
5.  Users can report non-working import codes. Admins can review these reports and, if necessary, change a build's status to **`disabled`**.
