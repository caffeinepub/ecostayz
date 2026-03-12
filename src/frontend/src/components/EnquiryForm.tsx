import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSubmitEnquiry } from "../hooks/useQueries";

interface FormData {
  name: string;
  email: string;
  message: string;
  propertyId: string;
}

const propertyOptions = [
  { value: "p1", label: "Rainforest Treehouse — Daintree, QLD" },
  { value: "p2", label: "Lakeside Eco Cabin — Cradle Mountain, TAS" },
  { value: "p3", label: "Beachfront Bungalow — Noosa, QLD" },
  { value: "general", label: "General Enquiry" },
];

export default function EnquiryForm() {
  const { mutateAsync, isPending } = useSubmitEnquiry();
  const [submitted, setSubmitted] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({ ...data, propertyId: selectedProperty || "general" });
      setSubmitted(true);
      reset();
      setSelectedProperty("");
    } catch (_e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-forest-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            Plan Your Eco Escape
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Tell us about your dream stay and we'll find the perfect eco retreat
            for you.
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-eco-lg p-8 sm:p-10 border border-border">
          {submitted ? (
            <div
              className="text-center py-12"
              data-ocid="enquiry.success_state"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle2
                  className="w-10 h-10 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                Enquiry Received!
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                Thank you for reaching out. Our team will be in touch within 24
                hours to help you plan your perfect eco stay.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="rounded-full font-body font-medium border-primary text-primary hover:bg-primary/10"
              >
                Send Another Enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-body text-sm font-medium text-foreground"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    className="rounded-xl border-border font-body focus:ring-primary"
                    data-ocid="enquiry.input"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="font-body text-xs text-destructive">
                      Name is required
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-body text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    className="rounded-xl border-border font-body"
                    data-ocid="enquiry.email_input"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@]+@[^@]+\.[^@]+$/,
                    })}
                  />
                  {errors.email && (
                    <p className="font-body text-xs text-destructive">
                      Valid email required
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-body text-sm font-medium text-foreground">
                  Property of Interest
                </Label>
                <Select
                  value={selectedProperty}
                  onValueChange={setSelectedProperty}
                >
                  <SelectTrigger
                    className="rounded-xl border-border font-body"
                    data-ocid="enquiry.select"
                  >
                    <SelectValue placeholder="Select a property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="font-body"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us your travel dates, group size, and anything special you're looking for..."
                  rows={5}
                  className="rounded-xl border-border font-body resize-none"
                  data-ocid="enquiry.textarea"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <p className="font-body text-xs text-destructive">
                    Message is required
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-forest-800 text-primary-foreground font-body font-semibold rounded-full py-6 text-base shadow-eco hover:shadow-eco-lg hover:-translate-y-0.5 transition-all duration-300"
                data-ocid="enquiry.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Send Enquiry
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
