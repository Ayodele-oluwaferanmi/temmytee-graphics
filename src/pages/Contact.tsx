import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/components/Nav";
import { services, site } from "@/data/site";
import { useRoute, useScrollReset } from "@/lib/router";
import { cn } from "@/utils/cn";

type Fields = {
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  deadline: string;
  budget: string;
  reference: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  whatsapp: "",
  service: "",
  deadline: "",
  budget: "",
  reference: "",
  message: "",
};

const serviceOptions = [...services.map((s) => s.title), "Something else"];

function buildBrief(f: Fields) {
  return [
    "New project enquiry — Temmy Tee Graphics",
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.whatsapp ? `WhatsApp: ${f.whatsapp}` : null,
    `Service required: ${f.service}`,
    f.deadline ? `Preferred deadline: ${f.deadline}` : null,
    f.budget ? `Budget range: ${f.budget}` : null,
    f.reference ? `Reference link: ${f.reference}` : null,
    "",
    "Project description:",
    f.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function Contact() {
  useScrollReset(["contact"]);
  const route = useRoute();
  const formRef = useRef<HTMLFormElement>(null);

  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const preset = route.query.service;
    if (!preset) return;
    const match = serviceOptions.find((s) => s.toLowerCase() === decodeURIComponent(preset).toLowerCase());
    if (match) setFields((f) => ({ ...f, service: match }));
  }, [route.query.service]);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = "Please enter a valid email address so I can reply.";
    if (!fields.service) next.service = "Choose the service you need.";
    if (fields.message.trim().length < 12)
      next.message = "Add a little more detail about the project (at least a sentence).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");
    if (!validate()) {
      setStatus("error");
      setFeedback("Please check the highlighted fields and try again.");
      const first = Object.keys(errors)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");

    // Option A — a configured form endpoint (Formspree / Getform / Basin / Web3Forms).
    if (site.formEndpoint) {
      try {
        const response = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(fields),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        setStatus("sent");
        setFeedback("Thank you — your project brief has been sent. You'll get a reply by email.");
        setFields(empty);
        return;
      } catch {
        setStatus("error");
        setFeedback(
          "The form could not be submitted just now. Please send the brief directly on WhatsApp or by email.",
        );
        return;
      }
    }

    // Option B — no endpoint configured: hand the brief to WhatsApp so it is never lost.
    const url = whatsappLink(buildBrief(fields));
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
    setFeedback(
      opened
        ? "Your brief is ready and WhatsApp has opened in a new tab — press send and it lands straight with the studio."
        : "Your brief is ready. Tap the WhatsApp button below to open it and press send.",
    );
  };

  const inputClass = (invalid?: boolean) =>
    cn(
      "w-full rounded-[10px] border bg-white px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/70",
      invalid ? "border-red-500 focus:border-red-500" : "border-line focus:border-brand-500",
    );

  return (
    <main id="main" className="pt-[68px] md:pt-[78px]">
      {/* Header */}
      <section className="shell border-b border-line pb-12 pt-14 md:pb-16 md:pt-20">
        <p className="eyebrow text-brand-500">Contact</p>
        <h1 className="display mt-5 max-w-3xl text-[2.4rem] font-extrabold leading-[1.0] sm:text-5xl lg:text-[4rem]">
          Tell me what you're planning
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
          Fill in the brief below and I'll come back with the next steps. The more detail you share, the faster we can
          start designing.
        </p>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" required error={errors.name} htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    value={fields.name}
                    onChange={set("name")}
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field label="Email address" required error={errors.email} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={set("email")}
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                    className={inputClass(!!errors.email)}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="WhatsApp number" optional htmlFor="whatsapp">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={fields.whatsapp}
                    onChange={set("whatsapp")}
                    autoComplete="tel"
                    placeholder="+234 701 234 5678"
                    className={inputClass()}
                  />
                </Field>

                <Field label="Service required" required error={errors.service} htmlFor="service">
                  <select
                    id="service"
                    name="service"
                    value={fields.service}
                    onChange={set("service")}
                    aria-invalid={!!errors.service}
                    className={cn(inputClass(!!errors.service), "appearance-none bg-white pr-10")}
                  >
                    <option value="">Select a service…</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Project description"
                required
                error={errors.message}
                htmlFor="message"
                hint="What is the occasion or business, what must the design communicate, and where will it be used?"
              >
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={fields.message}
                  onChange={set("message")}
                  placeholder="e.g. A Sunday service flyer for our church anniversary, shared on Instagram and printed as A5…"
                  aria-invalid={!!errors.message}
                  className={cn(inputClass(!!errors.message), "resize-y")}
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Preferred deadline" optional htmlFor="deadline">
                  <input
                    id="deadline"
                    name="deadline"
                    value={fields.deadline}
                    onChange={set("deadline")}
                    placeholder="e.g. Friday next week"
                    className={inputClass()}
                  />
                </Field>

                <Field label="Budget range" optional htmlFor="budget">
                  <input
                    id="budget"
                    name="budget"
                    value={fields.budget}
                    onChange={set("budget")}
                    placeholder="Optional"
                    className={inputClass()}
                  />
                </Field>
              </div>

              <Field
                label="Reference image or link"
                optional
                htmlFor="reference"
                hint="Paste a link to a reference, a Pinterest board or a shared folder — files can be sent after the first reply."
              >
                <input
                  id="reference"
                  name="reference"
                  value={fields.reference}
                  onChange={set("reference")}
                  placeholder="https://…"
                  className={inputClass()}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
                  {status === "sending" ? "Sending…" : "Send Project Brief"}
                </button>
                <span className="text-[0.8125rem] text-muted">
                  Required fields are marked with <span className="text-brand-500">*</span>
                </span>
              </div>

              <div aria-live="polite" className="min-h-[1rem]">
                {feedback && (
                  <p
                    role={status === "error" ? "alert" : "status"}
                    className={cn(
                      "rounded-[10px] border px-4 py-3.5 text-[0.875rem] leading-relaxed",
                      status === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-brand-200 bg-brand-50 text-brand-700",
                    )}
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[16px] bg-ink p-8 text-white">
                <h2 className="eyebrow text-white/50">Direct contact</h2>
                <p className="display mt-4 text-[1.375rem] font-semibold leading-snug">
                  Prefer to chat it through?
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">
                  Send a message on WhatsApp with your ideas, references or event details.
                </p>
                <a
                  href={whatsappLink("Hello Temmy Tee Graphics, I'd like to discuss a design project.")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-on-dark mt-6 w-full"
                >
                  Chat on WhatsApp
                </a>
                <a href={`mailto:${site.contact.email}`} className="btn btn-outline-dark mt-3 w-full">
                  Email the studio
                </a>
                <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[0.8125rem] text-white/50">
                  {site.contact.whatsappDisplay}
                  <br />
                  {site.contact.email}
                </p>
              </div>

              <div className="mt-6 rounded-[16px] border border-line p-8">
                <h2 className="eyebrow text-muted">Elsewhere</h2>
                <ul className="mt-5 space-y-3">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-4 text-[0.9375rem] text-ink/80 transition-colors hover:text-ink"
                      >
                        <span>
                          {s.label}
                          <span className="ml-2 text-[0.8125rem] text-muted">{s.handle}</span>
                        </span>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                        >
                          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <h3 className="eyebrow mt-8 text-muted">What happens next</h3>
                <ol className="mt-4 space-y-3 text-[0.875rem] leading-relaxed text-muted">
                  <li>1. You send the brief.</li>
                  <li>2. I confirm the details, direction and quote.</li>
                  <li>3. Design work begins once the direction is agreed.</li>
                </ol>
                <p className="mt-6 text-[0.8125rem] text-muted">
                  {site.contact.location} · {site.contact.availability}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[0.875rem] font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-brand-500">*</span>}
        {optional && <span className="ml-2 text-[0.75rem] font-normal text-muted">optional</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
      {error && (
        <p className="mt-2 text-[0.8125rem] font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
