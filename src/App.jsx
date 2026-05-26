import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Leaf, Sparkles, Zap, MessageSquare } from "lucide-react";
import nfLogo from "./assets/nf-logo.png";
import heroImg from "./assets/hero.png";
import smsImage from "./assets/project-images/sms-scam-detection.png";
import wheatImage from "./assets/project-images/wheat-anomaly-detection.jpeg";
import eAssistantImage from "./assets/project-images/e-assistant.png";

export default function App() {

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const carouselRef = useRef(null);
  const testimonialRef = useRef(null);

  const scrollCarousel = (dir = 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector('[data-project-card]');
    const cardWidth = card ? card.getBoundingClientRect().width : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  const scrollTestimonials = (dir = 1) => {
    const el = testimonialRef.current;
    if (!el) return;
    const card = el.querySelector('[data-review-card]');
    const cardWidth = card ? card.getBoundingClientRect().width : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  const featuredProjects = [
    {
      icon: <Cpu className="h-8 w-8 text-cyan-300" />,
      cat: "Computer Vision",
      title: "Dehaze & Simulation System",
      desc: "Clears foggy road footage, detects vehicles and obstacles, and warns the driver in real time.",
      detail: "This system enhances front-facing camera visibility under foggy conditions and classifies nearby road objects, supporting safe driving with live alerts.",
      videoSrc: "/videos/dehaze-simulation.mp4",
      image: "",
      videoNote: "Demo video loaded from project assets."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-cyan-300" />,
      cat: "Machine Learning",
      title: "SMS Scam Detection System",
      desc: "Scans notifications across SMS, WhatsApp, Instagram, and Facebook for phishing, scam, and malicious links.",
      detail: "The model analyzes incoming notifications and flags scam content in real time, helping users avoid phishing links and fraudulent messages.",
      videoSrc: "",
      image: smsImage,
      videoNote: "Add your actual project video URL or file path here."
    },
    {
      icon: <Leaf className="h-8 w-8 text-cyan-300" />,
      cat: "Computer Vision",
      title: "Wheat Anomaly Detection",
      desc: "Analyzes wheat images to detect disease or abnormalities and classify crop health instantly.",
      detail: "This solution inspects crop images with computer vision and reports disease, pests, or growth issues for faster agricultural decisions.",
      videoSrc: "",
      image: wheatImage,
      videoNote: "Add your demo video URL or file path here."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-cyan-300" />,
      cat: "AI Assistant",
      title: "E-Assistant for Smart Shopping",
      desc: "A conversational shopping assistant that helps customers discover products, compare options, and complete checkout faster.",
      detail: "This smart e-assistant guides shoppers across categories with AI recommendations, real-time support, and personalized suggestions.",
      videoSrc: "",
      image: eAssistantImage,
      videoNote: "Product visual loaded from assets."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-300" />,
      cat: "AI Agents",
      title: "AI Agent Platform",
      desc: "Autonomous agents that execute workflows, monitor systems, and take action across data and API channels.",
      detail: "A flexible AI agent platform that manages tasks, automates business operations, and connects with external tools for intelligent automation.",
      videoSrc: "",
      image: "",
      videoNote: "AI agent image removed per design update."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-300" />,
      cat: "AI Automation",
      title: "Smart Support Bot",
      desc: "AI support assistant handling WhatsApp and website queries 24/7.",
      detail: "The bot automates customer conversations across channels, improves response times, and reduces support costs.",
      videoSrc: "",
      image: "",
      videoNote: "Add your demo video URL or file path here."
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-300" />,
      cat: "ML Insights",
      title: "Predictive Insight Engine",
      desc: "Delivers smarter business recommendations through predictive pattern analysis.",
      detail: "A predictive engine that learns historical trends and helps teams optimize decisions before issues arise.",
      videoSrc: "",
      image: "",
      videoNote: "Add your demo video URL or file path here."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-cyan-300" />,
      cat: "AI SaaS",
      title: "Voice Assistant Platform",
      desc: "Automated voice outreach and booking assistant for modern customer journeys.",
      detail: "A voice AI platform that automates outbound and inbound conversations to cut manual work and improve accessibility.",
      videoSrc: "",
      image: "",
      videoNote: "Add your demo video URL or file path here."
    },
  ];

  const trustedBrands = [
    { name: "Nova Labs", initials: "NL" },
    { name: "Pulse Systems", initials: "PS" },
    { name: "VentureWave", initials: "VW" },
    { name: "Axion Growth", initials: "AG" },
    { name: "SynthMind", initials: "SM" },
    { name: "VertexAI", initials: "VA" },
    { name: "CoreLogic", initials: "CL" },
    { name: "QuantumOps", initials: "QO" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data?.success) {
        alert("Message Sent Successfully 🚀");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      alert("Backend connection failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    document
      .getElementById("contact")
      .scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (

    <div className="min-h-screen text-white overflow-hidden relative font-sans" style={{ backgroundColor: "#050A12" }}>

      {/* ================= BACKGROUND FX ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0 ai-bg-radial" />

        <div className="absolute inset-0 ai-bg-hero-overlay" />

        <div className="absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-[-30%] h-px w-[160%] bg-white/7 blur-sm opacity-40 animate-slide-right"
              style={{
                top: `${i * 5.75}%`,
                animationDuration: `${10 + i * 0.6}s`,
                animationDelay: `${-i * 0.55}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute -top-28 left-1/2 w-96 h-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl animate-blob" />
        <div className="absolute top-20 -left-16 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-blob animation-delay-4000" />

        <div className="absolute inset-0 ai-bg-grid opacity-70" />

        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 5}s`,
              animationDelay: `${-Math.random() * 5}s`,
            }}
          />
        ))}

      </div>

      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <img
              src={nfLogo}
              alt="NeuraFlow Logo"
              className="h-16 w-auto object-contain drop-shadow-2xl"
            />

            <div>

              <h1 className="text-2xl font-black tracking-wide">
              </h1>

              <p className="uppercase text-cyan-400" style={{ fontSize: "10px", letterSpacing: "4px" }}>
                AI AGENCY
              </p>

            </div>

          </div>

          {/* NAV */}
          <nav className="hidden md:flex gap-10 text-sm text-gray-300 font-medium">

            <a href="#services" className="hover:text-cyan-400 transition">
              Services
            </a>

            <a href="#portfolio" className="hover:text-cyan-400 transition">
              Portfolio
            </a>

            <a href="#contact" className="hover:text-cyan-400 transition">
              Contact
            </a>

          </nav>

          {/* BUTTON */}
          <button
            type="button"
            onClick={scrollToContact}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-2xl font-bold text-sm transition hover:scale-105 shadow-2xl"
          >
            Book Call
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28"
      >

        <div className="absolute inset-0 ai-bg-radial opacity-80" />
        <div className="absolute inset-0 ai-bg-hero-overlay opacity-85" />
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImg}
            alt="AI background visual"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0">
          <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-blob" />
          <div className="absolute right-10 top-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.35em] text-cyan-300 backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              AI Automation  • Computer Vision • Intelligent Systems • AI Solution
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="flex justify-center"
            >
              <img
                src={nfLogo}
                alt="NeuraFlow Logo"
                className="h-40 md:h-56 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white"
            >
              Powerful AI automation for the next generation of digital products.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-3xl text-lg leading-8 text-slate-300"
            >
              NeuraFlow builds production-ready AI systems, intelligent workflows, and automation platforms with a focus on speed, reliability, and measurable business impact.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-4 text-black font-bold shadow-2xl shadow-cyan-500/20 transition hover:bg-cyan-300 hover:scale-105"
            >
              Start Project
            </button>
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-white font-semibold transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              Explore Portfolio
            </button>
          </motion.div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
              A Proven Approach
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white max-w-3xl">
              Generative-Driven Development for AI products that launch faster and scale smarter.
            </h2>
            <p className="mt-6 text-gray-400 max-w-2xl leading-relaxed text-lg">
              Our repeatable GenDD methodology blends AI, agents, and engineering so you move from concept to production with less risk, stronger outcomes, and faster time to value.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Outcome-Driven",
                  description: "We measure success by business impact, not just pilots or prototypes."
                },
                {
                  title: "Fast Product Velocity",
                  description: "Ship AI features and end-to-end automation rapidly with a modern build process."
                },
                {
                  title: "Trusted Delivery",
                  description: "Premium engineering, nearshore execution, and cross-functional AI teams."
                },
              ].map((item, index) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/40">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <h3 className="text-3xl font-black text-white mb-6">What makes us different</h3>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex gap-3 items-start">
                <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400" />
                Deep domain expertise in AI-first engineering.
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400" />
                Real-time automation and ML systems built for production.
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400" />
                Strategy, delivery, and continuous improvement in one team.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 bg-liner-to-br from-black/30 to-white/3">
          <div className="pointer-events-none absolute inset-0 ai-bg-radial opacity-60" />
          <div className="relative">
            <p className="text-center text-sm uppercase tracking-[0.35em] text-gray-400 mb-2">Premium AI Services</p>
            <h3 className="text-3xl font-black text-white text-center mb-6">Core Expertise & Services</h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">We deliver end-to-end AI products — from research and prototyping to production-grade automation and monitoring. Below are the main services and example project types we routinely deliver.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu className="h-7 w-7 text-white" />,
                  title: "Machine Learning",
                  desc: "Supervised & unsupervised models, feature engineering, model ops and scalable deployments.",
                  tags: ["Classification","Regression","Recommendation","Model Serving"]
                },
                {
                  icon: <Sparkles className="h-7 w-7 text-white" />,
                  title: "Deep Learning",
                  desc: "CNNs, RNNs, Transformers, transfer learning and GPU training pipelines.",
                  tags: ["Vision","NLP","Transformers","Fine-tuning"]
                },
                {
                  icon: <Zap className="h-7 w-7 text-white" />,
                  title: "AI Automation",
                  desc: "Orchestration, scheduling, alerts, and MLOps to keep models healthy in production.",
                  tags: ["MLOps","Monitoring","CI/CD","Scaling"]
                },
                {
                  icon: <MessageSquare className="h-7 w-7 text-white" />,
                  title: "n8n & Workflow Automation",
                  desc: "Integrations, API orchestration and event-driven automation using n8n and serverless tools.",
                  tags: ["Integrations","API","Webhooks","Data Sync"]
                },
                {
                  icon: <Leaf className="h-7 w-7 text-white" />,
                  title: "Computer Vision",
                  desc: "Detection, segmentation, tracking, and domain-specific vision (agriculture, automotive, retail).",
                  tags: ["Object Detection","Segmentation","Video Analytics","Anomaly Detection"]
                },
                {
                  icon: <ShieldCheck className="h-7 w-7 text-white" />,
                  title: "Predictive Insights",
                  desc: "Time-series forecasting, anomaly detection and decision-support systems for business outcomes.",
                  tags: ["Forecasting","Anomaly Detection","KPI Dashboards","Prescriptive"]
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative rounded-3xl p-6 overflow-hidden"
                >
                  <div className="absolute -inset-px rounded-3xl bg-liner-to-br from-cyan-400/5 to-violet-500/6 blur-sm opacity-40" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-liner-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{s.title}</h4>
                      <p className="text-gray-300 text-sm mt-2">{s.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.tags.map((t, j) => (
                          <span key={j} className="text-xs bg-white/6 text-white/90 px-3 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">

        <div className="grid md:grid-cols-3 gap-8">

          {[
            ["50+", "AI Systems Built"],
            ["24/7", "Automation Running"],
            ["99%", "Client Satisfaction"],
          ].map((s, i) => (

            <motion.div
              whileHover={{ y: -6 }}
              key={i}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-xl hover:border-cyan-400/30 transition"
            >

              <h3 className="text-5xl font-black text-cyan-400">
                {s[0]}
              </h3>

              <p className="text-gray-400 mt-3">
                {s[1]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="max-w-7xl mx-auto px-6 py-28 relative z-10"
      >

        <h2 className="text-5xl md:text-6xl font-black text-center">
          Premium <span className="text-cyan-400">AI Services</span>
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mt-6 mb-20">
          Complete AI solutions for startups, enterprises,
          SaaS platforms, and automation-first businesses.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: "🤖",
              title: "AI Automation",
              desc: "AI agents and intelligent workflows automating repetitive operations and support systems."
            },
            {
              icon: "⚡",
              title: "n8n & Python",
              desc: "Scalable backend automation, APIs, integrations, and enterprise workflow systems."
            },
            {
              icon: "👁️",
              title: "Computer Vision",
              desc: "AI image analysis, object detection, tracking systems, and smart monitoring solutions."
            },
            {
              icon: "📊",
              title: "Machine Learning",
              desc: "Predictive analytics, intelligent forecasting, and custom trained ML systems."
            },
            {
              icon: "🧠",
              title: "Deep Learning",
              desc: "Advanced neural networks for NLP, speech AI, recommendation engines, and LLM workflows."
            },
            {
              icon: "🚀",
              title: "AI SaaS Development",
              desc: "Full-stack AI product engineering for scalable SaaS applications and platforms."
            },
          ].map((s, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition duration-300 backdrop-blur-xl"
            >

              <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 text-3xl">
                {s.icon}
              </div>

              <h3 className="text-2xl font-bold group-hover:text-cyan-300 transition">
                {s.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                {s.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= CASE STUDIES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-28 relative z-10">
        <div className="grid gap-12 xl:grid-cols-[1fr_1.1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
              Real client outcomes
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white max-w-3xl">
              AI systems built for measurable business results.
            </h2>
            <p className="mt-6 text-gray-400 max-w-2xl leading-relaxed text-lg">
              Case studies grounded in revenue, automation efficiency, and enterprise data intelligence — designed to feel premium and production-ready.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Dehaze Simulation Platform",
                subtitle: "Computer vision for automotive safety",
                description: "Reduced detection latency across low-visibility footage while providing real-time object classification and alerting.",
                metrics: ["90% accuracy", "Live alerts", "Production deployment"]
              },
              {
                title: "Scam Detection Engine",
                subtitle: "Multichannel notification security",
                description: "Scans messages across WhatsApp, SMS, Instagram and Facebook with AI risk scoring and proactive filtering.",
                metrics: ["24/7 monitoring", "Custom threat rules", "AI model tuning"]
              },
              {
                title: "Agriculture Insight AI",
                subtitle: "Crop anomaly detection",
                description: "Analyzes field imagery for disease, pests and yield risk to support faster farming decisions.",
                metrics: ["Field-level insights", "ML-based classification", "Automated reporting"]
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="group rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 transition hover:border-cyan-400/40 backdrop-blur-xl"
              >
                <div className="inline-flex rounded-full bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300 mb-5">
                  Case Study {idx + 1}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-cyan-300 text-sm uppercase tracking-[0.25em] mb-4">
                  {item.subtitle}
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="grid gap-3 text-sm text-gray-300">
                  {item.metrics.map((meta, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      <span>{meta}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}

      <section
        id="portfolio"
        className="max-w-7xl mx-auto px-6 py-28 relative z-10"
      >

        <h2 className="text-5xl md:text-6xl font-black text-center">
          Featured <span className="text-cyan-400">Projects</span>
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mt-6 mb-20">
          Real-world AI products, intelligent systems,
          workflow automation, and scalable business solutions.
        </p>

        <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40">
          {featuredProjects[0].videoSrc ? (
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full min-h-90 bg-black object-cover"
              src={featuredProjects[0].videoSrc}
            />
          ) : featuredProjects[0].image ? (
            <>
              <img src={featuredProjects[0].image} alt={featuredProjects[0].title} className="w-full h-full min-h-90 object-cover" />
              <div className="p-8 bg-slate-950/80">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Featured Project
                </p>
                <h3 className="mt-3 text-3xl font-black text-white">
                  {featuredProjects[0].title}
                </h3>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {featuredProjects[0].desc}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full h-full min-h-90 bg-black flex items-center justify-center text-gray-400">
              <p className="p-6 text-center">No demo available — project image not set.</p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white shadow-md hover:bg-black/60"
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div ref={carouselRef} className="no-scrollbar flex gap-8 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory">
            {featuredProjects.map((p, i) => (
              <motion.div
                data-project-card
                key={i}
                whileHover={{ y: -10 }}
                className="snap-start flex-none w-[min(88vw,28rem)] group overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-500/10 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/40"
              >
                <div className="overflow-hidden bg-black/30">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : p.videoSrc ? (
                    <video
                      controls
                      muted
                      loop
                      playsInline
                      className="h-56 w-full object-cover"
                      src={p.videoSrc}
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-white/5 text-gray-400">
                      <span>No preview available</span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4">
                    {p.cat}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                  <div className="grid gap-3 text-sm text-gray-300 mb-8">
                    {p.videoNote && (
                      <div className="inline-flex gap-2 items-center rounded-full border border-white/10 bg-black/20 px-4 py-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        {p.videoNote}
                      </div>
                    )}
                    <div className="inline-flex gap-2 items-center rounded-full border border-white/10 bg-black/20 px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      Production-ready
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(p)}
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-5 py-4 text-sm font-semibold text-black transition hover:bg-cyan-300"
                  >
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white shadow-md hover:bg-black/60"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>

      </section>
      <section
  id="testimonials"
  className="max-w-7xl mx-auto px-6 py-28 relative z-10"
>

  <h2 className="text-5xl md:text-6xl font-black text-center">
    Client <span className="text-cyan-400">Reviews</span>
  </h2>

  <p className="text-center text-gray-400 max-w-2xl mx-auto mt-6 mb-20">
    Trusted by startups, agencies, and modern businesses worldwide.
  </p>

  <div className="relative">
    <button
      type="button"
      onClick={() => scrollTestimonials(-1)}
      className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white shadow-md hover:bg-black/60"
      aria-label="Scroll reviews left"
    >
      ‹
    </button>

    <div ref={testimonialRef} className="no-scrollbar flex gap-8 overflow-x-auto pb-4 px-2 scroll-smooth snap-x snap-mandatory">

    {[
      {
        avatar: "https://i.pravatar.cc/150?img=32",
        name: "Michael Carter",
        role: "CEO • TechNova USA",
        review:
          "NeuraFlow AI completely transformed our lead generation system. Their automation increased our response speed and reduced manual work massively.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=12",
        name: "Daniel Brooks",
        role: "Founder • VisionScale UK",
        review:
          "The AI workflows and backend automations they built saved our team hundreds of hours every month. Highly professional execution.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=54",
        name: "Sophie Laurent",
        role: "Operations Manager • France",
        review:
          "From AI chatbots to intelligent integrations, everything was delivered with premium quality. The system feels enterprise-grade.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=47",
        name: "Amina Yusuf",
        role: "VP Growth • FinTech Hub",
        review:
          "Their AI-driven dashboard helped us identify high-value customers faster and improve conversion with intelligent automation.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=68",
        name: "Liam Chen",
        role: "Product Lead • SaaS Scale",
        review:
          "NeuraFlow's automation strategy helped us reduce manual onboarding time by 60% and scale with confidence.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=22",
        name: "Nadia Singh",
        role: "Marketing Director • RetailOps",
        review:
          "The AI workflows improved campaign performance and gave us real-time visibility into customer behavior.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=18",
        name: "Omar El-Sayed",
        role: "CTO • HealthGrid",
        review:
          "Their custom computer vision model helped us automate quality checks and eliminate slow manual reviews.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=85",
        name: "Priya Rao",
        role: "VP Operations • TravelWave",
        review:
          "The AI platform scaled quickly, and the team delivered clear results with a strong focus on operational efficiency.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=40",
        name: "Carlos Medina",
        role: "Head of Data • FinAnalytics",
        review:
          "Their predictive engine helped us catch issues early and make smarter real-time decisions.",
      },

      {
        avatar: "https://i.pravatar.cc/150?img=52",
        name: "Sana Ali",
        role: "Founder • EduNext",
        review:
          "The AI automation transformed our support experience, giving students faster responses and a more reliable platform.",
      },

    ].map((r, i) => (

      <motion.div
        data-review-card
        key={i}
        whileHover={{ y: -8 }}
        className="snap-start flex-none w-[min(88vw,28rem)] md:w-[32%] p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition duration-300 backdrop-blur-xl"
      >

        <div className="flex items-center gap-4 mb-6">
          <img
            src={r.avatar}
            alt={`${r.name} avatar`}
            className="h-16 w-16 rounded-full object-cover border border-white/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">
                {r.name}
              </h3>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Verified
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {r.role}
            </p>
          </div>
        </div>

        <div className="flex mb-5 text-cyan-400 text-xl">
          ★★★★★
        </div>

        <p className="text-gray-300 leading-relaxed">
          "{r.review}"
        </p>

      </motion.div>

    ))}

    </div>

    <button
      type="button"
      onClick={() => scrollTestimonials(1)}
      className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white shadow-md hover:bg-black/60"
      aria-label="Scroll reviews right"
    >
      ›
    </button>
  </div>
</section>

{activeProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
    <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl">
      <button
        type="button"
        onClick={() => setActiveProject(null)}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        ✕
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="bg-black/90 p-6">
          {activeProject.videoSrc ? (
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-3xl bg-black"
              src={activeProject.videoSrc}
            />
          ) : activeProject.image ? (
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full rounded-3xl object-cover"
            />
          ) : (
            <div className="flex h-80 items-center justify-center rounded-3xl bg-white/5 text-gray-400">
              <span>No preview available</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            {activeProject.cat}
          </p>
          <h3 className="mt-4 text-4xl font-black text-white">
            {activeProject.title}
          </h3>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {activeProject.detail}
          </p>
          <div className="mt-8 space-y-3">
            <p className="rounded-2xl bg-white/5 px-4 py-3 text-gray-300">{activeProject.desc}</p>
            <p className="rounded-2xl bg-white/5 px-4 py-3 text-gray-300">{activeProject.videoNote}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
            Stay Ahead in AI
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white max-w-3xl mx-auto">
            Subscribe for AI product, automation, and growth insights.
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get curated strategy notes and launch ideas for teams building AI-enabled platforms, digital products, and enterprise automation.
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="mt-10 inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-10 py-4 text-black font-bold transition hover:bg-cyan-300 hover:scale-105"
          >
            Talk With AI Experts
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm relative z-10">

        © 2026 NeuraFlow AI — Full Stack AI Automation Agency

      </footer>

    </div>
  );
}