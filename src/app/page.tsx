"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Globe from "@/components/Globe";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    if (heroRef.current && featuresRef.current && cardsRef.current) {
      // Hero animation
      gsap.fromTo(heroRef.current.children, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.3,
          ease: "power3.out"
        }
      );

      // Features section animation
      gsap.fromTo(featuresRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      gsap.fromTo(cardsRef.current.children,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className={styles.page}>
      {/* Globe Background */}
      <Globe />
      
      {/* Header */}
      <motion.header 
        className={styles.header}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.headerContent}>
          <motion.h1 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🏥 Qfit Monitor
          </motion.h1>
          <p className={styles.tagline}>ระบบ Monitor หน้าจอเรียกคิว - Aztec Service Group</p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero} ref={heroRef}>
          <div className={styles.heroContent}>
            <motion.h2 
              className={styles.heroTitle}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              ยินดีต้อนรับสู่ <span className={styles.highlight}>Qfit Monitor</span>
            </motion.h2>
            <motion.p 
              className={styles.heroDescription}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              ระบบ Monitor หน้าจอเรียกคิวแบบเรียลไทม์ สำหรับบริษัท Aztec Service Group
              <br />
              พร้อมการแจ้งเตือนด้วยเสียง TTS และการแสดงผลที่สวยงาม
            </motion.p>
            
            {/* Company Info */}
            <motion.div 
              className={styles.companyInfo}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className={styles.companyCard}>
                <h3>🏢 Aztec Service Group</h3>
                <p>Project: Qfit Monitor System</p>
                <span className={styles.projectBadge}>Live System</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features} ref={featuresRef}>
          <motion.h3 
            className={styles.sectionTitle}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Monitor Display Views
          </motion.h3>
          <div className={styles.featuresGrid} ref={cardsRef}>
            <motion.div 
              className={styles.featureCard}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className={styles.featureIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                📱
              </motion.div>
              <h4>Single Monitor</h4>
              <p>จอแสดงผลแบบคอลัมน์เดียว เหมาะสำหรับพื้นที่ขนาดเล็ก และการติดตั้งแบบ standalone</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/single/1" className={styles.featureButton}>
                  เปิด Monitor
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={styles.featureCard}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className={styles.featureIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                📊
              </motion.div>
              <h4>Duo Monitor</h4>
              <p>จอแสดงผลแบบสองคอลัมน์ เหมาะสำหรับพื้นที่ขนาดกลาง และการแสดงข้อมูลแบบเปรียบเทียบ</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/duo/1" className={styles.featureButton}>
                  เปิด Monitor
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={styles.featureCard}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className={styles.featureIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🚨
              </motion.div>
              <h4>ER Monitor</h4>
              <p>จอแสดงผลสำหรับห้องฉุกเฉิน พร้อมสถานี ER-A ถึง ER-E และระบบแจ้งเตือนพิเศษ</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/er/1" className={styles.featureButton}>
                  เปิด Monitor
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features List */}
        <motion.section 
          className={styles.featuresList}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className={styles.sectionTitle}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            System Capabilities
          </motion.h3>
          <motion.div 
            className={styles.featuresListGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                ✅
              </motion.span>
              <span>Real-time Data Updates</span>
            </motion.div>
            
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                🔊
              </motion.span>
              <span>TTS Voice Announcements</span>
            </motion.div>
            
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                📊
              </motion.span>
              <span>Service Status Display</span>
            </motion.div>
            
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                📱
              </motion.span>
              <span>Multi-Screen Support</span>
            </motion.div>
            
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                ⏭️
              </motion.span>
              <span>Skip Queue Management</span>
            </motion.div>
            
            <motion.div 
              className={styles.featureItem}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <motion.span 
                className={styles.featureCheck}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                👥
              </motion.span>
              <span>Complete Patient Information</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Project Status */}
        <motion.section 
          className={styles.projectStatus}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className={styles.statusCard}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>🚀 Project Status</h3>
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Client:</span>
                <span className={styles.statusValue}>Aztec Service Group</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Project:</span>
                <span className={styles.statusValue}>Qfit Monitor</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Status:</span>
                <motion.span 
                  className={styles.statusLive}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🟢 Live Production
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.footerContent}>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            &copy; 2024 Aztec Service Group - Qfit Monitor System
          </motion.p>
          <motion.div 
            className={styles.footerLinks}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span>Powered by Next.js</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>GSAP</span>
            <span>•</span>
            <span>Real-time Technology</span>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
