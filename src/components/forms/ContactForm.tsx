'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SERVICES, getWhatsAppUrl, BUSINESS_INFO } from '@/lib/constants';
import { contactFormSchema, ContactFormData } from '@/lib/validation';
import { TurnstileWidget, TurnstileRef } from '@/components/forms/TurnstileWidget';

export interface ContactFormProps {
  defaultService?: string;
  className?: string;
}

export function ContactForm({ defaultService = '', className = '' }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileRef>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: defaultService,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);

    // If Turnstile token not yet ready, attempt to wait briefly or prompt
    let token = turnstileToken;
    if (!token) {
      // In dev fallback or if still resolving, give it 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));
      token = turnstileToken;
    }

    if (!token && process.env.NODE_ENV === 'production') {
      setServerError('Bot protection verification is still processing. Please try submitting again in a moment.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken: token || 'dev-turnstile-token-auto',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setSubmittedData(data);
        reset();
        turnstileRef.current?.reset();
        setTurnstileToken('');
      } else if (response.status === 429) {
        setServerError(
          result.error || 'Submission rate limit reached (5 requests/minute). Please wait a moment before trying again.'
        );
        turnstileRef.current?.reset();
      } else if (response.status === 400) {
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            setError(field as keyof ContactFormData, {
              type: 'server',
              message: message as string,
            });
          }
        }
        setServerError(result.error || 'Please review and correct the highlighted fields.');
        turnstileRef.current?.reset();
      } else {
        setServerError(
          result.error ||
            'We were unable to process your inquiry automatically. Please contact our team directly via WhatsApp or phone.'
        );
        turnstileRef.current?.reset();
      }
    } catch (err: unknown) {
      console.error('[ContactForm] Network submission error:', err);
      setServerError(
        'A network connection error occurred. Please check your internet connection or reach out directly on WhatsApp.'
      );
      turnstileRef.current?.reset();
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmittedData(null);
    setServerError(null);
    turnstileRef.current?.reset();
  };

  if (isSuccess && submittedData) {
    return (
      <div
        className={`p-8 rounded-radius-lg bg-bg-elevated border border-border-default text-left space-y-6 ${className}`}
      >
        <div className="flex items-center gap-3 border-b border-border-subtle/80 pb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
          <span className="text-overline font-mono text-brand-green tracking-widest uppercase font-bold">
            PROJECT BRIEF RECEIVED
          </span>
        </div>

        <div>
          <h3 className="text-heading-sm font-display text-text-primary font-bold mb-2">
            Thank you, {submittedData.name}. Your project brief has been received.
          </h3>
          <p className="text-body-sm text-text-secondary leading-relaxed">
            We have registered your inquiry for <strong className="text-text-primary">{submittedData.service}</strong> on behalf of{' '}
            <strong className="text-text-primary">{submittedData.company}</strong>. Our team in Rudrapur will review your technical scope and get in touch.
          </p>
        </div>

        <div className="p-4 rounded-radius-sm bg-bg-void/70 border border-border-default font-mono text-[11px] text-text-muted space-y-1">
          <div className="text-metal-mid font-semibold tracking-wider uppercase mb-1">
            CONFIRMATION DETAILS:
          </div>
          <p>
            Saved to studio records. Notification dispatched to engineering production management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="whatsapp"
            size="sm"
            href={getWhatsAppUrl(
              `Hi SPAN Studio, I just submitted a project brief for ${submittedData.company} regarding ${submittedData.service}. Looking forward to discussing details.`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Up on WhatsApp →
          </Button>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Submit Another Brief
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className={`space-y-5 text-left ${className}`}
    >
      {/* Server / Network Error Notification */}
      {serverError && (
        <div
          role="alert"
          className="p-4 rounded-radius-sm bg-status-error/10 border border-status-error/40 text-body-sm text-text-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <span className="text-status-error font-bold select-none mt-0.5">⚠</span>
            <p className="text-text-primary text-body-sm">{serverError}</p>
          </div>
          <a
            href={getWhatsAppUrl('Hi SPAN Studio, I am having trouble submitting the website contact form and would like to talk directly.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-status-success font-mono text-xs font-semibold hover:underline shrink-0"
          >
            Direct WhatsApp Discussion →
          </a>
        </div>
      )}

      {/* 2-Column Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Your Name"
          required
          placeholder="e.g. Rahul Sharma"
          disabled={isSubmitting}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Business Email"
          type="email"
          required
          placeholder="e.g. rahul@company.com"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* 2-Column Grid: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Phone / WhatsApp Number"
          type="tel"
          required
          placeholder="e.g. +91 98765 43210"
          disabled={isSubmitting}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="Company / Facility Name"
          required
          placeholder="e.g. Apex Engineering Ltd."
          disabled={isSubmitting}
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      {/* Service Selection Dropdown */}
      <div className="w-full space-y-1.5 text-left">
        <label
          htmlFor="service-select"
          className="flex items-center justify-between text-caption font-mono uppercase tracking-wider text-text-secondary select-none"
        >
          <span>
            Primary Service Needed
            <span className="text-accent-primary ml-1">*</span>
          </span>
        </label>

        <div className="relative">
          <select
            id="service-select"
            disabled={isSubmitting}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={`w-full h-11 px-4 rounded-radius-sm bg-bg-elevated text-body-md text-text-primary border transition-all duration-200 outline-none appearance-none cursor-pointer ${
              errors.service
                ? 'border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/30'
                : 'border-border-default hover:border-border-strong focus:border-border-accent focus:ring-2 focus:ring-accent-primary/20'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-bg-deep' : ''}`}
            {...register('service')}
          >
            <option value="" className="bg-bg-elevated text-text-disabled">
              Select a service...
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name} className="bg-bg-elevated text-text-primary">
                {s.number} — {s.name}
              </option>
            ))}
            <option
              value="Integrated Production Scope (Multiple)"
              className="bg-bg-elevated text-text-primary"
            >
              06 — Integrated Production Scope (Multiple)
            </option>
          </select>

          {/* Custom Chevron Indicator */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {errors.service && (
          <p
            id="service-error"
            role="alert"
            className="text-caption font-mono text-status-error flex items-center gap-1.5 pt-0.5"
          >
            <span aria-hidden="true">⚠</span>
            <span>{errors.service.message}</span>
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <Textarea
        label="Project Scope & Objectives"
        required
        rows={5}
        placeholder="Describe your plant location, machinery/product details, timeline, or intended usage (investor pitch, buyer presentation, website, trade show)..."
        disabled={isSubmitting}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Cloudflare Turnstile Invisible Widget */}
      <TurnstileWidget
        ref={turnstileRef}
        onSuccess={(token) => setTurnstileToken(token)}
        onError={(err) => {
          console.warn('[Turnstile] Bot check notification:', err);
        }}
        onExpire={() => {
          setTurnstileToken('');
        }}
      />

      {/* Submit Button & Assurance */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full sm:w-auto font-bold tracking-wider"
        >
          {isSubmitting ? 'TRANSMITTING BRIEF...' : 'SUBMIT PROJECT BRIEF'}
        </Button>

        <p className="text-[11px] font-mono text-text-muted">
          DIRECT TO STUDIO · {BUSINESS_INFO.contact.city}, {BUSINESS_INFO.contact.state}
        </p>
      </div>
    </form>
  );
}
