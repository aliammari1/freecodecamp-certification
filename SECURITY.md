# Security Policy

These are small learning APIs from the freeCodeCamp Backend & APIs certification,
but the monorepo is still hardened against the two most relevant web risks for
this kind of service:

- **`file-metadata`** — uploads are stored by `multer` under random generated
  filenames in `uploads/`; the on-disk path is never derived from the untrusted
  `originalname`, so crafted filenames cannot cause path traversal. Uploads are
  capped at 10 MB.
- **`url-shortener`** — only `http`/`https` URLs are accepted, and the redirect
  endpoint re-validates the stored URL before issuing a `302`, preventing
  open-redirect to `javascript:`/`data:`/`file:` schemes.

## Supported Versions

The `main` branch is the only supported version.

## Reporting a Vulnerability

Please report security issues privately via GitHub Security Advisories
("Report a vulnerability" on the Security tab) or by email to
**ammari.ali.0001@gmail.com**. You can expect an initial response within 7 days.

Please do not open public issues for security-sensitive reports.
