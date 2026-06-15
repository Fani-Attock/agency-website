import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Leaf, Sparkles, Zap, MessageSquare } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import nfLogo from "./assets/nf-logo.png";
import heroImg from "./assets/hero.png";
import smsImage from "./assets/project-images/sms-scam-detection.png";
import wheatImage from "./assets/project-images/wheat-anomaly-detection.jpeg";
import eAssistantImage from "./assets/project-images/e-assistant.png";
import aiAgentImage from "./assets/project-images/ai-agent-platform.jpeg";
import multiIndustryLeadImage from "./assets/project-images/MultiIndstry Lead.png";
import omnichannelScreenshot from "./assets/project-images/omnichannel-screenshot.png";
import vAgentImage from "./assets/project-images/v agent.jpeg";

export default function App() {

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [roiData, setRoiData] = useState({ employees: "", hours: "", tickets: "" });
  const [roiResult, setRoiResult] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Ask NeuraFlow AI about automation, leads, or workflow strategy." },
  ]);
  const [chatInput, setChatInput] = useState("");
const chatApiUrl = "/api/chat";

const [showExitModal, setShowExitModal] = useState(false);
  const carouselRef = useRef(null);
  const testimonialRef = useRef(null);
  const cursorRef = useRef(null);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: { events: { onHover: { enable: false, mode: "repulse" }, resize: true } },
    particles: {
      color: { value: "#22d3ee" },
      links: { color: "#0ea5a4", distance: 160, enable: true, opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.6 },
      number: { density: { enable: true, area: 800 }, value: 20 },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
    },
  };

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
      detail: "Enhances front-facing camera visibility under foggy conditions and classifies nearby road objects for live alerts.",
      problem: "Low-visibility footage caused missed detections and unsafe alerts.",
      solution: "Applied dehazing pre-processing, model retraining, and edge-optimized inference pipelines.",
      tech: ["Python","OpenCV","TensorFlow","GStreamer"],
      features: ["Real-time dehaze","Object classification","GPU-accelerated inference"],
      impact: "Reduced false negatives by 72% and enabled production deployment in connected vehicles.",
      results: ["90% detection accuracy","Real-time alerts","Integrated with vehicle telematics"],
      videoSrc: "/videos/dehaze-simulation.mp4",
      image: "",
      screenshots: ["/videos/dehaze-simulation.mp4"]
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-cyan-300" />,
      cat: "Machine Learning",
      title: "SMS Scam Detection System",
      desc: "Scans messages across channels for phishing and malicious links.",
      detail: "A multichannel detection engine with real-time scoring and adaptive threat rules.",
      problem: "High volume of user-reported phishing messages and brand risk.",
      solution: "Built a streaming classifier, feature extraction pipeline, and automated remediation rules.",
      tech: ["Node.js","Python","Redis","TensorFlow"],
      features: ["Multichannel ingestion","Real-time scoring","Rule-based handoff"],
      impact: "Reduced successful phishing incidents and improved customer trust.",
      results: ["2k+ flagged threats/month","24/7 monitoring","Automated quarantining"],
      videoSrc: "",
      image: smsImage,
      screenshots: [smsImage]
    },
    {
      icon: <Leaf className="h-8 w-8 text-cyan-300" />,
      cat: "Computer Vision",
      title: "Wheat Anomaly Detection",
      desc: "Detects crop disease and anomalies from field imagery.",
      detail: "A vision pipeline that provides field-level insights for faster agricultural decisions.",
      problem: "Late detection led to yield loss and manual inspections.",
      solution: "Deployed a low-cost camera + model inference pipeline for daily scans and automated alerts.",
      tech: ["Python","PyTorch","AWS S3","Pinecone"],
      features: ["Batch inference","Anomaly alerts","Field reporting"],
      impact: "Helped farmers prioritize treatments and improved yield planning.",
      results: ["Early detection","Automated reports","Actionable recommendations"],
      videoSrc: "",
      image: wheatImage,
      screenshots: [wheatImage]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-cyan-300" />,
      cat: "AI Assistant",
      title: "E-Assistant for Smart Shopping",
      desc: "A conversational shopping assistant for discovery and checkout.",
      detail: "Personalized shopping flows, product comparisons, and checkout acceleration.",
      problem: "Low conversion due to poor product discovery and long checkout flows.",
      solution: "Integrated a conversational assistant with recommendation APIs and streamlined checkout.",
      tech: ["Node.js","OpenAI","Supabase","Stripe"],
      features: ["Conversational recommendations","One-click checkout","Personalized offers"],
      impact: "Increased conversion and average order value in pilot markets.",
      results: ["+18% conversion","Faster checkout","Higher AOV"],
      videoSrc: "",
      image: eAssistantImage,
      screenshots: [eAssistantImage]
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-300" />,
      cat: "Automation & Routing",
      title: "AI-Powered Omnichannel Reply Bot & Communication Router",
      desc: "Automated reply bot orchestrating LinkedIn, Slack, and Google Sheets with LLM-driven logic and webhook triggers.",
      detail: "Designed and deployed a robust automated reply bot that routes and replies across LinkedIn and Slack, evaluates intent, triggers human handoff, and logs interactions to Google Sheets in real time using NeuraFlow AI-powered LLM flows.",
      videoSrc: "",
      image: omnichannelScreenshot,
      videoNote: ""
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-300" />,
      cat: "Data Pipeline",
      title: "Automated Multi-Industry Lead Generation & Data Pipeline",
      desc: "Scalable lead harvesting engine that extracts, normalizes, and stores fresh leads across multiple verticals on schedule.",
      detail: "A multi-threaded lead extraction system that runs cron triggers across six verticals, handles API pagination, normalizes data via custom JS nodes, and writes clean leads to a central repository for continuous pipelines and downstream automation.",
      videoSrc: "",
      image: multiIndustryLeadImage,
      videoNote: ""
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-300" />,
      cat: "AI Agents",
      title: "Autonomous Customer Support AI Agent with RAG Architecture",
      desc: "Designed and deployed a Retrieval-Augmented Generation (RAG) customer support agent that processes Gmail inquiries, searches a Pinecone knowledge base, generates contextual OpenAI responses, and drafts replies through Gmail and Telegram.",
      detail: "Built a 24/7 customer support AI assistant with RAG-powered knowledge retrieval from Pinecone, intent-aware response generation using OpenAI, and automated message delivery via Gmail and Telegram.",
      problem: "Support teams were overwhelmed by repeated Gmail inquiries and lacked fast context-rich responses.",
      solution: "Deployed a RAG architecture that identifies support requests, retrieves relevant knowledge, and generates actionable responses with automated outbound delivery.",
      tech: ["OpenAI","Pinecone","Gmail API","Telegram","Node.js"],
      features: ["RAG knowledge retrieval","Contextual response generation","Automated Gmail / Telegram replies"],
      impact: "Enabled 24/7 scalable customer support with more accurate, context-aware responses and faster ticket handling.",
      results: ["Automated 24/7 support","Context-aware replies","Scalable AI customer assistance"],
      videoSrc: "",
      image: vAgentImage,
      videoNote: ""
    },
    {
      icon: <Sparkles className="h-8 w-8 text-cyan-300" />,
      cat: "AI Automation",
      title: "Smart Support Bot",
      desc: "AI support assistant handling WhatsApp and website queries 24/7.",
      detail: "The bot automates customer conversations across channels, improves response times, and reduces support costs.",
      videoSrc: "",
      image: "",
      videoNote: ""
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-300" />,
      cat: "ML Insights",
      title: "Predictive Insight Engine",
      desc: "Delivers smarter business recommendations through predictive pattern analysis.",
      detail: "A predictive engine that learns historical trends and helps teams optimize decisions before issues arise.",
      videoSrc: "",
      image: "",
      videoNote: ""
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

  const handleRoiChange = (field, value) => {
    setRoiData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoiSubmit = (e) => {
    e.preventDefault();
    const employees = Number(roiData.employees) || 0;
    const hours = Number(roiData.hours) || 0;
    const tickets = Number(roiData.tickets) || 0;
    const savings = Math.round(employees * hours * 15 * 0.4 + tickets * 25);
    setRoiResult({ employees, hours, tickets, savings });
  };

const handleChatSubmit = async (e) => {
  e.preventDefault();
  if (!chatInput.trim()) return;

  const userMessage = chatInput.trim();
  setChatMessages((prev) => [...prev, { role: "user", text: userMessage }]);
  setChatInput("");

  try {
    const response = await fetch(chatApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Chat API failed with status ${response.status}`);
    }

    const replyText =
      data.reply ||
      data.message ||
      "NeuraFlow AI did not return a response.";

    setChatMessages((prev) => [
      ...prev,
      { role: "ai", text: replyText },
    ]);
  } catch (error) {
    console.error("Chat API error:", error);
    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "Sorry, NeuraFlow AI is temporarily unavailable. Please try again shortly.",
      },
    ]);
  }
};

  // Small counter component (lightweight, no extra deps)
  const Counter = ({ end = 100, label = "" }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1400;
      const stepTime = Math.max(Math.floor(duration / (end || 1)), 20);
      const timer = setInterval(() => {
        start += Math.ceil((end || 1) / (duration / stepTime));
        if (start >= end) {
          setValue(end);
          clearInterval(timer);
        } else {
          setValue(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }, [end]);
    return (
      <div className="text-center">
        <div className="text-5xl font-black text-cyan-300">{value}{end >= 1000 ? '+' : ''}</div>
        <div className="text-gray-300 mt-2">{label}</div>
      </div>
    );
  };

  // Exit-intent modal: show when mouse leaves viewport toward top
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !localStorage.getItem("exitModalShown")) {
        setShowExitModal(true);
        localStorage.setItem("exitModalShown", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Custom cursor movement
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 768) return;
    const onMove = (e) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (

    <div className="min-h-screen text-white overflow-hidden relative font-sans" style={{ backgroundColor: "#050A12" }}>

      <div ref={cursorRef} className="pointer-events-none fixed z-99999 hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 border border-cyan-300/40 w-3 h-3" />

      {/* ================= BACKGROUND FX ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 -z-20" />

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
          <nav className="hidden md:flex gap-8 text-sm text-gray-300 font-medium">

            <a href="#audit" className="hover:text-cyan-400 transition">
              Audit
            </a>

            <a href="#process" className="hover:text-cyan-400 transition">
              Process
            </a>

            <a href="#demo" className="hover:text-cyan-400 transition">
              Demo
            </a>

            <a href="#roi" className="hover:text-cyan-400 transition">
              ROI
            </a>

          </nav>

          {/* BUTTON */}
          <button
            type="button"
            onClick={scrollToPortfolio}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-2xl font-bold text-sm transition hover:scale-105 shadow-2xl"
          >
            Explore Portfolio
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

      <section id="audit" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Explore Premium AI Projects</p>
              <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">Discover how premium AI systems drive efficiency, scale, and measurable impact.</h2>
              <div className="mt-8 space-y-4 text-gray-300 text-lg">
                <p>✓ Processes wasting time</p>
                <p>✓ Automation opportunities</p>
                <p>✓ Potential cost savings</p>
                <p>✓ AI implementation roadmap</p>
              </div>
              <button onClick={scrollToPortfolio} className="mt-8 inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-4 text-black font-bold transition hover:bg-cyan-300">
                Explore AI Portfolio
              </button>
            </div>
            <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-8">
              <div className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-2">Audit Snapshot</div>
              <div className="space-y-4 text-gray-300">
                <p className="bg-white/5 p-4 rounded-3xl">Review of current automation, workflows, and AI readiness.</p>
                <p className="bg-white/5 p-4 rounded-3xl">Cost reduction opportunities mapped to your operations.</p>
                <p className="bg-white/5 p-4 rounded-3xl">Action plan for high-impact AI deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Our Process</p>
        <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">How We Work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-5">
          {[
            ["1", "Discovery Call", "Business analysis"],
            ["2", "AI Strategy", "Automation roadmap"],
            ["3", "Development", "Build & testing"],
            ["4", "Deployment", "Launch & monitoring"],
            ["5", "Optimization", "Continuous improvements"],
          ].map(([step, title, desc], idx) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl text-black font-black">{step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
              {idx < 4 && <div className="mt-6 h-0.5 bg-white/10 mx-auto w-16 md:w-full"></div>}
            </div>
          ))}
        </div>
      </section>

      <section id="technology" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Real Tech Stack</p>
        <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">Tech We Build With</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {["OpenAI","Claude","NeuraFlow AI","n8n","LangChain","Vapi","Supabase","Pinecone","PostgreSQL","Python","Node.js","Docker","AWS"].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white font-semibold shadow-sm shadow-cyan-500/10">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Live Demo</p>
        <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">Explore Our AI Demo</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-gray-300 mb-6">Ask about automation strategy, AI workflow design, or production readiness. In production, this chat is powered by NeuraFlow AI for accurate, context-aware answers.</p>
            <div className="space-y-4">
              {chatMessages.map((message, i) => (
                <div key={i} className={message.role === "ai" ? "rounded-3xl bg-slate-900 p-4 text-gray-200" : "rounded-3xl bg-cyan-400/10 p-4 text-white"}>
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-6 flex gap-3">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white" placeholder="Ask NeuraFlow AI..." />
              <button type="submit" className="rounded-3xl bg-cyan-400 px-6 py-3 text-black font-bold">Send</button>
            </form>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-gray-300 mb-6">A polished production demo built to showcase automation, collaboration, and deployment-ready AI systems.</p>
            <div className="rounded-3xl bg-black/20 p-6 text-left">
              <p className="text-white font-semibold mb-3">What you'll see</p>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>Automation workflows and decision logic</li>
                <li>AI system outputs crafted for business value</li>
                <li>How we build reliable production AI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Client Results</p>
        <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">Measured AI Outcomes</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {["5000+ Leads Generated","40+ Workflows Automated","60% Reduction in Manual Tasks","24/7 AI Support Systems"].map((result) => (
            <div key={result} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <h3 className="text-3xl font-black text-cyan-300">{result.split(" ")[0]}</h3>
              <p className="mt-4 text-gray-300">{result}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roi" className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">ROI Calculator</p>
            <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl">Estimate Your AI Savings</h2>
            <p className="mt-6 text-gray-400 max-w-2xl">Enter team size, hours wasted, and support volume to see potential monthly savings.</p>
            <form onSubmit={handleRoiSubmit} className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              {[
                ["employees","Employees"],
                ["hours","Hours wasted per employee/week"],
                ["tickets","Monthly support tickets"],
              ].map(([field,label]) => (
                <label key={field} className="block text-sm text-gray-300">
                  {label}
                  <input type="number" value={roiData[field]} onChange={(e) => handleRoiChange(field, e.target.value)} className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white" />
                </label>
              ))}
              <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-4 text-black font-bold">Calculate Savings</button>
            </form>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Potential Savings</div>
            <div className="mt-6 text-5xl font-black text-white">{roiResult ? `$${roiResult.savings.toLocaleString()}/month` : "Enter data to calculate"}</div>
            <div className="mt-6 text-gray-300">This is a lightweight estimate for your automation ROI. Share details to refine with our audit.</div>
          </div>
        </div>
      </section>



      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Agency Intro</p>
          <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto">Build AI Systems That Generate Revenue, Save Time, and Scale Operations</h2>
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto leading-relaxed">We design production-ready AI solutions, automation workflows, and secure enterprise systems that help businesses reduce manual work, improve reliability, and accelerate growth.</p>
          <div className="mt-10 mx-auto max-w-4xl rounded-3xl border border-white/10 bg-black/40 p-10 text-left">
            <h3 className="text-2xl font-bold text-white mb-4">What makes our delivery premium</h3>
            <div className="grid gap-6 md:grid-cols-3 text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">Enterprise architecture</p>
                <p>Scalable AI systems designed for staging, monitoring, and resilient deployment.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Business impact</p>
                <p>Automation delivered with measurable outcomes, handoff efficiency, and operational savings.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Quality engineering</p>
                <p>Clean integration, secure APIs, and production-ready deployment patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setChatOpen((open) => !open)} className="rounded-full bg-cyan-400 px-5 py-4 font-bold text-black shadow-2xl shadow-cyan-500/20">
          Ask NeuraFlow AI
        </button>
      </section>

      <div className="fixed bottom-6 left-6 z-50">
        <button onClick={scrollToPortfolio} className="rounded-full bg-black/90 border border-white/10 px-5 py-4 font-bold text-white shadow-lg">Explore Portfolio</button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(22rem,90vw)] rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Live AI Chat</p>
              <h3 className="text-lg font-bold text-white">Ask NeuraFlow AI</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-400">✕</button>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {chatMessages.map((message, idx) => (
              <div key={idx} className={message.role === "ai" ? "rounded-3xl bg-white/5 p-3 text-gray-200" : "rounded-3xl bg-cyan-400/10 p-3 text-white ml-auto"}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white" placeholder="Ask your AI question..." />
            <button type="submit" className="rounded-3xl bg-cyan-400 px-4 py-3 text-black font-bold">Send</button>
          </form>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">
              A Proven Approach
            </p>
        <div className="max-w-7xl mx-auto px-6 mt-6 text-center">
          <button onClick={scrollToContact} className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-3 text-black font-bold">Start a Project</button>
        </div>

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

      {/* portfolio and other sections preserved below */}
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

      {/* ================= TRUSTED LOGOS & TESTIMONIALS ================= */}

      <section id="trusted" className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Built With</p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-gray-300">
            {["OpenAI","Claude","Google Gemini","n8n","Vapi","Supabase","Pinecone","AWS"].map((t) => (
              <div key={t} className="border border-white/10 rounded-3xl px-4 py-2 text-sm transition hover:border-cyan-300/40">{t}</div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3 text-left">
            {[
              { title: "AI Lead Generation Systems", desc: "Automated lead pipelines and intent scoring for growth teams." },
              { title: "Workflow Automation Projects", desc: "End-to-end automation workflows across sales, support, and ops." },
              { title: "Business Process Optimization", desc: "AI-enhanced operations to reduce manual work and improve delivery." },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-black/10 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 mt-6 text-center">
        <button onClick={scrollToContact} className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-3 text-black font-bold">Book Free Audit</button>
      </div>

      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h2 className="text-4xl font-black text-white text-center mb-4">Project Highlights</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">Sample outcomes from AI automation, support workflows, and vision solutions.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { quote: "Delivered an AI lead pipeline that cut prospect response times by 45% and improved handoff accuracy.", author: "Sales automation outcome" },
            { quote: "Deployed intelligent support routing to reduce manual ticket handling and increase resolution speed.", author: "Support automation outcome" },
            { quote: "Built a production vision workflow to detect anomalies and automate alerts across high-volume imagery.", author: "Production AI outcome" },
          ].map((t, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-300 leading-relaxed mb-4">“{t.quote}”</p>
              <p className="text-sm text-gray-400 font-semibold">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="beforeafter" className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h3 className="text-3xl font-black text-white text-center mb-6">Before vs After Automation</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-bold text-white mb-3">Before</h4>
            <ul className="text-gray-300 space-y-2">
              <li>Manual Support • 8 Hours/day</li>
              <li>Missed Leads • Human Errors</li>
              <li>Slow Response Times</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-bold text-white mb-3">After</h4>
            <ul className="text-gray-300 space-y-2">
              <li>24/7 AI Agent • Instant Replies</li>
              <li>Automated Leads • Consistent Quality</li>
              <li>Lower Operational Costs</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="stack-diagram" className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h3 className="text-3xl font-black text-white text-center mb-6">Interactive AI Stack</h3>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex items-center justify-center">
          <div className="flex items-center gap-6">
            {['Website','AI Agent','OpenAI','n8n','CRM','WhatsApp'].map((n,idx) => (
              <motion.div key={n} whileHover={{ scale: 1.05 }} className="px-4 py-3 rounded-xl bg-black/20 border border-white/6 text-white font-semibold">
                {n}
              </motion.div>
            ))}
          </div>
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
          Complete AI solutions for startups, enterprises, SaaS platforms, and AI-first businesses — including ML, DL, computer vision, and automation.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: "🤖",
              title: "AI Automation",
              desc: "AI agents, ML-driven decision logic, and computer vision-enabled workflows automating repetitive operations and support systems."
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

  {/* =======================================================
      🌾 LIVE INTERACTIVE MODULE: WHEAT ANOMALY DETECTION
     ======================================================= */}
  <div className="mx-auto mb-20 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#050A12] p-4 shadow-2xl shadow-cyan-500/5">
    <div className="p-6 text-center lg:text-left lg:px-8">
      <div className="inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-green-300 mb-3">
        ⚡ Live Production Engine
      </div>
      <h3 className="text-3xl font-black text-white">
        🌾 Wheat Anomaly Detection System
      </h3>
      <p className="mt-2 text-gray-400 max-w-2xl text-sm">
        Upload crop imagery directly below to experience real-time computer vision analysis, health score metrics, and instant PDF diagnostic downloads.
      </p>
    </div>
    
    <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-black/50">
      <iframe
        src="https://fanikhan03-wheat-anomaly-detection.hf.space"
        frameBorder="0"
        width="100%"
        height="900"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full"
      ></iframe>
    </div>
  </div>
  {/* ======================================================= */}

  {/* Top Featured Slider Media Container */}
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

  {/* Carousel Wrapper */}
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

{/* Project Detail Pop-up Modal */}
{activeProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
    <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl my-8">
      <button
        type="button"
        onClick={() => setActiveProject(null)}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 z-20"
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

        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{activeProject.cat}</p>
          <h3 className="mt-4 text-4xl font-black text-white">{activeProject.title}</h3>
          <p className="mt-6 text-gray-300 leading-relaxed">{activeProject.detail}</p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
              <strong>Problem:</strong>
              <div className="mt-2">{activeProject.problem || "—"}</div>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
              <strong>Solution:</strong>
              <div className="mt-2">{activeProject.solution || "—"}</div>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
              <strong>Technologies:</strong>
              <div className="mt-2 flex flex-wrap gap-2">{(activeProject.tech || []).map((t, i) => (
                <span key={i} className="px-2 py-1 bg-black/20 rounded-full text-sm">{t}</span>
              ))}</div>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
              <strong>Key Features:</strong>
              <ul className="mt-2 list-disc list-inside">
                {(activeProject.features || []).map((f, i) => (<li key={i}>{f}</li>))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
              <strong>Business Impact & Results:</strong>
              <div className="mt-2">{activeProject.impact}</div>
              <ul className="mt-3 list-disc list-inside">
                {(activeProject.results || []).map((r, i) => (<li key={i}>{r}</li>))}
              </ul>
            </div>

            {activeProject.screenshots && activeProject.screenshots.length > 0 && (
              <div className="rounded-2xl bg-white/5 p-4 text-gray-300">
                <strong>Media</strong>
                <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {activeProject.screenshots.map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-white/6">
                      {src.endsWith('.mp4') || src.endsWith('.webm') ? (
                        <video src={src} controls className="w-full h-40 object-cover" />
                      ) : (
                        <img src={src} alt={`screenshot-${i}`} className="w-full h-40 object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button onClick={scrollToContact} className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-4 py-3 text-black font-bold">Book Audit</button>
              <button onClick={() => setActiveProject(null)} className="inline-flex items-center justify-center rounded-3xl border border-white/10 px-4 py-3 text-white">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* Newsletter / Insights Subscription Section */}
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