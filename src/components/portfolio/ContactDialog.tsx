import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Sparkles } from "lucide-react";
import { heroContent } from "@/data/portfolio";

type ContactDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = `Inquiry from ${name} via Portfolio`;
    const body = `Name: ${name}\nEmail: ${email}\n\nProject Idea / Description:\n${message}`;

    // Redirect to mailto
    window.location.href = `mailto:${heroContent.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Clear form and close modal
    setName("");
    setEmail("");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/10 sm:max-w-[480px] rounded-3xl p-6 text-foreground selection:bg-white/10">
        <DialogHeader className="space-y-2">
          <DialogTitle className="font-display text-2xl font-bold text-white flex items-center gap-2">
            Let's build something <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            Fill in the details below, and it will automatically open your email app to send the
            message directly to me.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="c-name" className="text-white/80">
              Your Name
            </Label>
            <Input
              id="c-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-white/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="c-email" className="text-white/80">
              Your Email Address
            </Label>
            <Input
              id="c-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-white/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="c-idea" className="text-white/80">
              Project Idea / Description
            </Label>
            <Textarea
              id="c-idea"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project, timeline, or whatever is on your mind..."
              className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-white/20"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-[1.01] cursor-pointer mt-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
