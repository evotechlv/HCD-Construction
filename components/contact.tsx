"use client"

import { Mail, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react"
import { useForm, ValidationError } from '@formspree/react';

const WHATSAPP_NUMBER = "17027626588"

export function Contact() {
  // Replace "mjvlbpqq" with your actual Formspree ID from your dashboard
  //const [state, handleSubmit] = useForm("meeroqvq");
  const [state, formspreeSubmit] = useForm("meeroqvq");

  return (
    <section id="contact" className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info Section */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl text-balance">
              {"Let's talk about your project."}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
              Whether it is a kitchen upgrade, office remodel, or complete property build, we make your goals a reality.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border sm:h-10 sm:w-10">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">Phone</p>
                  <a href="tel:+17027626588" className="mt-0.5 text-sm text-foreground hover:underline">(702) 762-6588</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border sm:h-10 sm:w-10">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">Email</p>
                  <a href="mailto:info@hcdconstructions.com" className="mt-0.5 text-sm text-foreground hover:underline">info@hcdconstructions.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border sm:h-10 sm:w-10">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">Location</p>
                  <p className="mt-0.5 text-sm text-foreground">Serving the greater metro area</p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20HCD%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-sm font-medium uppercase tracking-wider text-[#fff] transition-opacity hover:opacity-90 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Form Section */}
          <div className="min-h-[400px]">
            {state.succeeded ? (
              <div className="flex h-full items-center justify-center border border-border p-10 sm:p-12 animate-in fade-in zoom-in duration-300">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground sm:text-2xl">Thank you.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {"We'll be in touch within 24 hours."}
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={formspreeSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <Label text="First Name" htmlFor="firstName" />
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label text="Last Name" htmlFor="lastName" />
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <Label text="Email" htmlFor="email" />
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>
                <div>
                  <Label text="Phone" htmlFor="phone" />
                  <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label text="Tell us about your project" htmlFor="message" />
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground sm:pb-3"
                    placeholder="Describe your project..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4"
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Small helper components
function Label({ text, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">
      {text}
    </label>
  )
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="mt-2 w-full border-b border-border bg-transparent pb-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground sm:pb-3"
    />
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}