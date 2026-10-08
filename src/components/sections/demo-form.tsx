"use client";

import { ChevronDown, CircleCheck } from "lucide-react";
import { useState, useTransition, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { requestDemo, type DemoResult } from "@/app/actions/request-demo";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/format";

type Copy = Dictionary["contact"]["form"];
type RequiredField = "name" | "company" | "email";
type Values = Record<RequiredField | "erp" | "volume" | "website", string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValid: Record<RequiredField, (value: string) => boolean> = {
  name: (v) => v.trim().length > 1,
  company: (v) => v.trim().length > 1,
  email: (v) => EMAIL.test(v.trim()),
};
const REQUIRED = Object.keys(isValid) as RequiredField[];

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.8125rem] text-fg-2">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-[#f0a35b]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function DemoForm({ t }: { t: Copy }) {
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    erp: t.erp.options[0].value,
    volume: t.volume.options[0].value,
    website: "",
  });
  const [invalid, setInvalid] = useState<Partial<Record<RequiredField, boolean>>>({});
  const [result, setResult] = useState<DemoResult | null>(null);
  const [pending, startTransition] = useTransition();

  const update = (key: keyof Values) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
    // Clear an error as soon as the field becomes valid; don't add new ones while typing.
    if (key in isValid && invalid[key as RequiredField] && isValid[key as RequiredField](value)) {
      setInvalid((current) => ({ ...current, [key]: false }));
    }
  };

  const checkOnBlur = (key: RequiredField) => () => {
    if (values[key]) setInvalid((current) => ({ ...current, [key]: !isValid[key](values[key]) }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = Object.fromEntries(REQUIRED.map((key) => [key, !isValid[key](values[key])])) as Record<RequiredField, boolean>;
    setInvalid(errors);
    const firstError = REQUIRED.find((key) => errors[key]);
    if (firstError) {
      document.getElementById(`demo-${firstError}`)?.focus();
      return;
    }
    startTransition(async () => {
      const response = await requestDemo(values);
      setResult(response);
      if (response.status === "invalid") setInvalid(Object.fromEntries(response.fields.map((field) => [field, true])));
      if (response.status === "fallback") window.location.href = response.mailto;
    });
  };

  const errorFor = (key: RequiredField) => (invalid[key] ? t[key].error : undefined);
  const a11y = (key: RequiredField) => ({
    "aria-invalid": invalid[key] || undefined,
    "aria-describedby": invalid[key] ? `demo-${key}-error` : undefined,
  });

  if (result?.status === "sent") {
    return (
      <div role="status" className="glass rounded-[1.5rem] p-6 sm:p-8">
        <CircleCheck aria-hidden strokeWidth={1.5} className="size-9 text-green" />
        <h3 className="h-card mt-4 text-fg">{t.sentTitle}</h3>
        <p className="mt-2 text-fg-2">{fill(t.sentBody, { email: values.email })}</p>
        <Button
          variant="glass"
          className="mt-6"
          onClick={() => {
            setResult(null);
            setValues((current) => ({ ...current, name: "", company: "", email: "" }));
          }}
        >
          {t.another}
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="glass relative grid gap-4 rounded-[1.5rem] p-5 sm:p-7">
      <div className="grid gap-4 min-[30rem]:grid-cols-2">
        <Field id="demo-name" label={t.name.label} error={errorFor("name")}>
          <input id="demo-name" name="name" autoComplete="name" required value={values.name} onChange={update("name")} onBlur={checkOnBlur("name")} className="field" {...a11y("name")} />
        </Field>
        <Field id="demo-company" label={t.company.label} error={errorFor("company")}>
          <input
            id="demo-company"
            name="company"
            autoComplete="organization"
            required
            value={values.company}
            onChange={update("company")}
            onBlur={checkOnBlur("company")}
            className="field"
            {...a11y("company")}
          />
        </Field>
      </div>

      <Field id="demo-email" label={t.email.label} error={errorFor("email")}>
        <input
          id="demo-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          required
          placeholder={t.email.placeholder}
          value={values.email}
          onChange={update("email")}
          onBlur={checkOnBlur("email")}
          className="field rtl:text-right"
          {...a11y("email")}
        />
      </Field>

      <div className="grid gap-4 min-[30rem]:grid-cols-2">
        {(["erp", "volume"] as const).map((key) => (
          <Field key={key} id={`demo-${key}`} label={t[key].label}>
            <div className="relative">
              <select id={`demo-${key}`} name={key} value={values[key]} onChange={update(key)} className={cn("field appearance-none pe-10")}>
                {t[key].options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0b1530] text-fg">
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden strokeWidth={1.75} className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-3" />
            </div>
          </Field>
        ))}
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute size-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]">
        <label htmlFor="demo-website">{t.honeypot}</label>
        <input id="demo-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
      </div>

      <Button type="submit" size="lg" arrow disabled={pending} className="mt-2 w-full">
        {pending ? t.sending : t.submit}
      </Button>

      {result?.status === "fallback" && (
        <p role="status" className="text-center text-[0.8125rem] text-fg-2">
          {t.fallback}
        </p>
      )}
      {result?.status === "failed" && (
        <p role="alert" className="text-center text-[0.8125rem] text-[#f0a35b]">
          {t.failed}
        </p>
      )}
    </form>
  );
}
