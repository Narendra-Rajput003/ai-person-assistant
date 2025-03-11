"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, Bot, Brain, Code, MessageSquare, 
  Sparkles, Sun, Moon, CheckCircle, Zap,
  Shield, Users, Clock, Star
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/workspace');
    }
  }, [user, router]);

  if (user) return null; // Don't render anything while redirecting

  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "Smart AI Models", description: "Powered by GPT-3.5, Gemini, and Claude" },
    { icon: <Bot className="w-6 h-6" />, title: "Specialized Assistants", description: "From fitness coaching to code writing" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Real-time Chat", description: "Instant responses and continuous learning" },
    { icon: <Code className="w-6 h-6" />, title: "Multiple Domains", description: "Writing, coding, fitness, and more" },
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", description: "End-to-end encryption for all your conversations" },
    { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", description: "Get instant responses powered by advanced AI" },
    { icon: <Users className="w-6 h-6" />, title: "Personalized Experience", description: "AI adapts to your unique needs and preferences" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Availability", description: "Access your AI assistants anytime, anywhere" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "The AI fitness coach has transformed my workout routine. It's like having a personal trainer 24/7!",
      image: "/fitness-coach.jpg"
    },
    {
      name: "David Chen",
      role: "Software Developer",
      content: "The code assistant is incredibly helpful. It's improved my productivity significantly.",
      image: "/code-write.jpg"
    },
    {
      name: "Emily Brown",
      role: "Content Creator",
      content: "Writing scripts has never been easier. The AI understands exactly what I need.",
      image: "/email-write.jpg"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="AI Personal Assistant Logo"
              width={40}
              height={40}
              priority
              className="animate-pulse"
            />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              AI Assistant
            </span>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="User profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => router.push('/workspace')}
              />
            ) : (
              <button
                onClick={() => router.push('/sign-in')}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full
                  hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Your Personal
            <span className="relative whitespace-nowrap">
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {" "}AI Assistant{" "}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.span>
            </span>
            Platform
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Connect with specialized AI assistants for fitness, writing, coding, and more.
            Powered by advanced AI models to help simplify your life.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => router.push('/sign-in')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full
                hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20
                font-medium text-lg"
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50
                hover:border-primary/20 hover:bg-card transition-all duration-300
                hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who are already experiencing the power of AI</p>
          <button
            onClick={() => router.push('/sign-in')}
            className="px-8 py-3 bg-background text-foreground rounded-full
              hover:scale-105 transition-all duration-300 shadow-lg
              font-medium text-lg"
          >
            Start Your Journey Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Company</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>AI Models</li>
                <li>Assistants</li>
                <li>Integrations</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground">
            <p>© 2024 AI Personal Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
