import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Sun,
  Moon,
  Code2,
  Layout,
  Smartphone,
  Palette,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// --- Components ---

const ThemeToggle = ({ theme, toggle }: { theme: 'dark' | 'light', toggle: () => void }) => (
  <button
    onClick={toggle}
    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform cursor-pointer"
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-zinc-700" />}
  </button>
);

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tight">
          Deepak<span className="text-indigo-600 dark:text-indigo-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

const FadeIn = ({ children, delay = 0, direction = 'up', distance = 20 }: { children: ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' | 'none', distance?: number }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        easing: "ease-out",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const Section = ({ children, id, className = "", parallax = false }: { children: ReactNode, id?: string, className?: string, parallax?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, parallax ? -100 : 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section id={id} ref={ref} className={`relative py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden ${className}`}>
      <motion.div style={{ y: springY }}>
        {children}
      </motion.div>
    </section>
  );
};

const Card = ({ title, description, icon: Icon, index }: { title: string, description: string, icon: any, index: number }) => (
  <FadeIn delay={index * 0.1}>
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-display font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
    </motion.div>
  </FadeIn>
);

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const skills = [
    "React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "Git & GitHub", "Figma", "Responsive Design"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <Section className="min-h-[90vh] flex flex-col justify-center z-10">
        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-full">
              Available for freelance
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
              I build <span className="text-indigo-600 dark:text-indigo-400">clean, fast,</span> and modern websites
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Freelance web developer helping individuals and startups bring ideas to life through high-performance digital experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition-colors flex items-center gap-2 cursor-pointer"
              >
                Hire Me <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* What I Do Section */}
      <Section id="services" className="bg-zinc-50/50 dark:bg-zinc-900/20 z-10" parallax>
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What I Do</h2>
            <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            index={0}
            icon={Smartphone}
            title="Responsive Websites"
            description="Websites that look stunning on every device, from mobile phones to ultra-wide monitors."
          />
          <Card
            index={1}
            icon={Code2}
            title="Modern Frontend"
            description="Building fast, interactive user interfaces using the latest web technologies and best practices."
          />
          <Card
            index={2}
            icon={Layout}
            title="React Web Apps"
            description="Complex, state-driven applications built with React for a seamless user experience."
          />
          <Card
            index={3}
            icon={Palette}
            title="Clean UI Design"
            description="Focusing on minimalism, accessibility, and intuitive layouts that users love."
          />
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Tech Stack & Skills</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                I use a modern set of tools to ensure your project is scalable, maintainable, and performs at its best.
              </p>
            </FadeIn>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
          <FadeIn direction="right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Clean Code", desc: "Writing readable, maintainable, and efficient code that stands the test of time.", icon: Code2 },
                { title: "Performance", desc: "Optimizing every byte to ensure lightning-fast load times and smooth interactions.", icon: Smartphone },
                { title: "Scalability", desc: "Building architectures that grow with your business and handle increasing traffic.", icon: Layout },
                { title: "SEO Ready", desc: "Implementing best practices to ensure your site ranks high on search engines.", icon: CheckCircle2 }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-indigo-500/5 hover:border-indigo-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-zinc-50/50 dark:bg-zinc-900/20 z-10">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://picsum.photos/seed/project1/800/450"
                  alt="Project Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3">Laundry Services</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  A modern, responsive web application for professional laundry and dry cleaning services.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://assignment4laundaryservices.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://picsum.photos/seed/github/800/450"
                  alt="GitHub Activity"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3">Open Source Work</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  Check out my latest repositories and contributions on GitHub.
                </p>
                <a
                  href="https://github.com/deepakpandit31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
                >
                  View GitHub Profile <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why Work With Me */}
      <Section className="bg-indigo-600 dark:bg-indigo-900 rounded-4xl my-12 text-white overflow-hidden relative z-10" parallax>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">Why Work With Me?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Clean Code", desc: "Maintainable and well-documented architecture." },
              { title: "Mobile-First", desc: "Optimized for the best experience on all screens." },
              { title: "Communication", desc: "Clear, consistent, and professional updates." },
              { title: "On-Time", desc: "Strict adherence to deadlines and project milestones." }
            ].map((item, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold mb-4 opacity-20">0{i + 1}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-indigo-100/80">{item.desc}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="text-center z-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's connect and build something meaningful</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
              I'm currently open to new projects and collaborations. Feel free to reach out through any of these platforms.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/deepak-sikhwal-67a976287/", color: "hover:bg-indigo-600" },
              { icon: Github, label: "GitHub", href: "https://github.com/deepakpandit31", color: "hover:bg-zinc-800" },
              { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/6378196988", color: "hover:bg-green-600" },
              { icon: Mail, label: "Email", href: "mailto:deepakpandit07@gmail.com", color: "hover:bg-red-500" }
            ].map((link, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1} direction="none">
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? "_blank" : undefined}
                    rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${link.color} hover:text-white transition-all group`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-semibold">{link.label}</span>
                  </a>
                </FadeIn>
              </div>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
              <p>© 2024 Freelance Dev Portfolio. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}