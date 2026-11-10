# ServiceFlow AI — Marketing Website

A separate marketing website for ServiceFlow AI, the salon management workspace.
The existing application at `F:\projects\react\react-learning` is not modified by
this project.

## Stack

- React 19
- TypeScript
- Vite
- CSS
- Lucide React

There is no backend, database, or router dependency. The site is a single landing
page plus two static legal placeholder pages.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/`.

## Project structure

```text
src/
  App.tsx                    Page composition and CTA state
  App.css                    Section, preview, form and responsive styles
  index.css                  Design tokens, reset and shared primitives
  config/env.ts              Public environment configuration
  content/siteContent.ts     Centralised English marketing copy
  lib/demoSubmission.ts      Web3Forms demo form submission layer
  components/
    Navigation, Hero, AudienceSection, FeaturesSection,
    ProductPreviewSection, HowItWorksSection, AiVisionSection,
    EarlyAccessSection, FaqSection, Footer
    DemoModal, BookingNotice, Seo, Logo
    previews/                Component-built illustrative product previews
public/
  favicon.svg
  og-image.svg
  privacy.html
  terms.html
  robots.txt
.github/workflows/deploy.yml  GitHub Pages build and deployment
```

## Conversion configuration

### 1. Demo request form

The form lives in `DemoModal.tsx`. It validates all required fields, email format,
WhatsApp number (international format with country calling code), preferred
contact method, country, business type, staff count and privacy consent. An
optional separate checkbox collects WhatsApp contact consent.

Submission is handled by `src/lib/demoSubmission.ts` through the Web3Forms API
(`https://api.web3forms.com/submit`). Connect your Web3Forms form by setting:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

Configuration steps:

1. Create a free account at <https://web3forms.com> and verify your email
   address.
2. Add a new form and copy its access key from the Web3Forms dashboard.
3. Put the access key in `VITE_WEB3FORMS_ACCESS_KEY`:
   - locally: copy `.env.example` to `.env.local` and fill in the value;
   - on Vercel: open **Settings → Environment Variables** for the project, add
     `VITE_WEB3FORMS_ACCESS_KEY`, then redeploy so the value is compiled into
     the bundle.
4. Optionally add your domain and a reply-to address in the Web3Forms
   dashboard.

The request is a `POST` with JSON that includes the `access_key` and all form
fields:

```json
{
  "access_key": "YOUR_WEB3FORMS_ACCESS_KEY",
  "subject": "New demo request — ServiceFlow AI marketing site",
  "fullName": "Example Name",
  "salonName": "Example Salon",
  "email": "name@example.com",
  "country": "Germany",
  "businessType": "Hair salon",
  "staffCount": "2–5",
  "challenge": "Optional text",
  "consent": true,
  "WhatsApp Number": "+4915123456789",
  "Preferred Contact Method": "Email",
  "WhatsApp Contact Consent": "Yes",
  "source": "serviceflow-marketing",
  "submittedAt": "2026-01-01T00:00:00.000Z"
}
```

The WhatsApp number is collected with an international phone input
(`react-phone-number-input`) and is submitted in E.164 format (for example
`+4915123456789`) whenever the entered number is valid.

The success state is shown only when Web3Forms confirms the submission
(`success: true` in the JSON response). Network failures, non-2xx responses and
rejected submissions show the error state instead.

When `VITE_WEB3FORMS_ACCESS_KEY` is not configured:

- The form still validates locally.
- Submitting shows an explicit preview state.
- No success message is shown.
- Nothing is sent and nothing is stored in localStorage.

No personal form data is written to localStorage in either mode.

### 2. Book a Meeting

Set the scheduling link with:

```bash
VITE_BOOKING_URL=https://your-booking-page.example
```

When configured, the “Book a Meeting” button opens that URL in a new tab. When it
is not configured, the site shows an honest “meeting booking is coming soon”
notice. No booking provider URL is invented in the code.

### 3. Metadata URL

Set the final deployed site URL without a trailing slash:

```bash
VITE_SITE_URL=https://YOUR-GITHUB-USERNAME.github.io/serviceflow-marketing
```

This is used to add canonical and absolute Open Graph image URLs at runtime. The
GitHub username is intentionally not hardcoded. Replace the placeholder with your
own username and repository path.

## Environment variables and static-build limitations

All `VITE_` values are compiled into the client bundle. They are public and can be
read by any visitor.

- Never put private API keys, tokens or secrets in a `VITE_` variable.
- The Web3Forms access key is designed for public client-side use; other
  private keys are not.
- Environment changes require a rebuild and redeploy.
- `VITE_BASE_PATH` must start and end with `/`.
- Invalid or empty booking URLs are ignored safely.

For GitHub Actions, add the optional values as repository variables under
**Settings → Secrets and variables → Actions → Variables**:

- `VITE_BOOKING_URL`
- `VITE_WEB3FORMS_ACCESS_KEY`
- `VITE_SITE_URL`

The workflow supplies `VITE_BASE_PATH` automatically from the repository name.

For local development, copy `.env.example` to `.env.local` and fill in the values
you need. `.env*` files are ignored by Git except `.env.example`.

## GitHub Pages deployment

1. Create a GitHub repository, for example `serviceflow-marketing`.
2. Push this project to the repository's `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Push to `main` or run the **Deploy ServiceFlow Marketing to GitHub Pages**
   workflow manually.
6. The expected URL is:

   ```text
   https://YOUR-GITHUB-USERNAME.github.io/serviceflow-marketing/
   ```

   Replace `YOUR-GITHUB-USERNAME` with the account or organisation that owns the
   repository. The username is not embedded in the source.

The workflow sets the Vite base path to `/<repository-name>/`, so it works if the
repository has a different name. If the workflow's default branch is not `main`,
update the branch in `.github/workflows/deploy.yml`.

### Custom domain or user site

For a custom domain or a `YOUR-GITHUB-USERNAME.github.io` root site, the base path
must be `/`. Override the build environment variable:

```yaml
VITE_BASE_PATH: /
```

Then configure the custom domain in the GitHub Pages settings. Also set
`VITE_SITE_URL` to the final public URL.

### Local production preview with a base path

```bash
VITE_BASE_PATH=/serviceflow-marketing/ npm run build
npm run preview
```

On Windows PowerShell, set the variable first:

```powershell
$env:VITE_BASE_PATH="/serviceflow-marketing/"; npm run build
npm run preview
```

## International readiness

- The initial marketing copy is in English.
- All main marketing copy is centralised in `src/content/siteContent.ts` so German
  and Dutch translations can replace it without rewriting layout components.
- The demo form includes Germany, the United Kingdom, the Netherlands and Other.
- The currency in the illustrative dashboard is labelled as sample EUR data rather
  than being presented as a site-wide default.
- No country-specific address, phone number, or email address is invented.

## Product honesty and unfinished items

- ServiceFlow AI is currently in development; general availability is not claimed.
- AI-powered assistance is described as roadmap only and is explicitly marked as
  unavailable.
- Demo form submissions require a configured Web3Forms access key before they
  can be delivered.
- Meeting booking requires a configured scheduling URL.
- Privacy Policy and Terms are placeholder pages and must be replaced before launch.
- Product previews are built with React and demonstration data, not presented as
  live screenshots.
- `public/og-image.svg` is a placeholder social image. Replace it with a 1200×630
  PNG and update the metadata if a social platform requires raster images.

## Verification

```bash
npm run typecheck
npm run build
```

The site uses semantic landmarks, labelled navigation, accessible form fields,
keyboard-operable tabs, a focus-managed modal, visible focus states, and responsive
layouts from mobile through desktop.
