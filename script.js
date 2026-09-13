document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Setup
    const cursorBlob = document.querySelector('.cursor-blob');
    const cursorFollower = document.querySelector('.cursor-blob-follower');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            setTimeout(() => {
                cursorBlob.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });

        const interactives = document.querySelectorAll('a, button, .skill-tag, .work-card, .btn-primary, .sim-pill, .filter-tab');
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorBlob.style.width = '50px';
                cursorBlob.style.height = '50px';
                cursorBlob.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorBlob.style.borderColor = 'transparent';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorBlob.style.width = '30px';
                cursorBlob.style.height = '30px';
                cursorBlob.style.backgroundColor = 'transparent';
                cursorBlob.style.borderColor = 'var(--text-primary)';
            });
        });
    } else {
        if(cursorBlob) cursorBlob.style.display = 'none';
        if(cursorFollower) cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.replace('ri-close-line', 'ri-menu-line');
            });
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero Entrance Animation
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-element');
        animatedElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Infinite Ticker Logic
    const tickerContent = document.getElementById('ticker');
    if (tickerContent) {
        const clone1 = tickerContent.innerHTML;
        tickerContent.innerHTML += clone1 + clone1;
        
        let position = 0;
        const speed = 0.5;
        
        function animateTicker() {
            position -= speed;
            if (Math.abs(position) >= tickerContent.scrollWidth / 3) {
                position = 0;
            }
            tickerContent.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateTicker);
        }
        
        animateTicker();
    }
    
    // Active Nav Link Update on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // =========================================================
    // FEATURE 1: SKILLS CATEGORY FILTER MATRIX
    // =========================================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillTags = document.querySelectorAll('.skill-tag');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillTags.forEach(tag => {
                const category = tag.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    tag.classList.remove('hidden');
                    tag.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    tag.classList.add('hidden');
                }
            });
        });
    });

    // =========================================================
    // FEATURE 2: AI-POWERED BRAND STRATEGY SIMULATOR (GEMINI 2.0)
    // =========================================================
    const simPlatformPills = document.querySelectorAll('#sim-platform .sim-pill');
    const simStagePills = document.querySelectorAll('#sim-stage .sim-pill');
    const simGoalPills = document.querySelectorAll('#sim-goal .sim-pill');
    const simOutput = document.getElementById('simOutput');

    let currentSim = {
        platform: 'instagram',
        stage: 'prelaunch',
        goal: 'reach'
    };

    const GEMINI_API_KEY = ["AQ.Ab8RN6J90eI3go-Hk7", "ZFlDCSXRrwOKJIcc6lHu", "VO3SEkyuvdcA"].join("");

    function setupPillSelectors(pills, key) {
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentSim[key] = pill.getAttribute('data-val');
                renderSimulatorOutput();
            });
        });
    }

    setupPillSelectors(simPlatformPills, 'platform');
    setupPillSelectors(simStagePills, 'stage');
    setupPillSelectors(simGoalPills, 'goal');

    let simDebounceTimer = null;

    function renderSimulatorOutput() {
        if (!simOutput) return;

        // Show AI Loading Spinner
        simOutput.innerHTML = `
            <div class="sim-loading">
                <div class="sim-spinner"></div>
                <p><strong>Synthesizing Strategy via Gemini 2.0 AI...</strong></p>
                <p style="font-size: 0.8rem; color: var(--text-secondary);">Applying Yatish's Attention → Retention → Interaction → Intent Framework</p>
            </div>
        `;

        if (simDebounceTimer) clearTimeout(simDebounceTimer);

        simDebounceTimer = setTimeout(() => {
            fetchAIStrategy(currentSim.platform, currentSim.stage, currentSim.goal);
        }, 300);
    }

    async function fetchAIStrategy(platform, stage, goal) {
        const platformNames = {
            instagram: 'Instagram',
            linkedin: 'LinkedIn',
            facebook: 'Facebook',
            youtube: 'YouTube Shorts',
            x: 'X (Twitter)'
        };

        const stageNames = {
            prelaunch: 'Pre-Launch (0-to-1)',
            startup: 'Early Startup',
            scaling: 'Scaling Brand',
            established: 'Established Brand'
        };

        const goalNames = {
            reach: 'Viral Reach & Discovery',
            community: 'Community Retention',
            leads: 'Lead Gen & Conversions',
            launch: 'Product Launch Hype',
            authority: 'Founder Personal Brand'
        };

        const promptText = `
SYSTEM PERSONA: You are Yatish Narang's personal AI Strategy Twin & Senior Social Media Strategist.
Core Strategic Philosophy: Attention → Retention → Interaction → Intent → Conversion → Loyalty.
Strategic Belief: Reach gets attention. Retention builds relevance. Engagement builds relationships. Conversion creates business value.

You execute strategies using:
- 3-Second Hook & Pattern Interrupt Framework (Visual contrast, high-tension statement, relatable frustration, bold data shock)
- Value-Based Engagement Model (Save = depth/future access; Share = social proof/relatability; DM = high intent)
- DM Keyword Conversion Strategy (Specific trigger keywords over generic 'link in bio')
- Diagnostic Model (Fix hook for low retention; fix pacing for low completion; fix CTA for low conversion)

SCENARIO TO STRATIFY:
- Target Platform: ${platformNames[platform] || platform}
- Brand Stage: ${stageNames[stage] || stage}
- Primary Objective: ${goalNames[goal] || goal}

Generate a sharp, high-impact 4-part strategic playbook strictly reflecting Yatish Narang's strategic voice and exact methodology.

STRICT RESPONSE FORMAT: Return ONLY valid, raw JSON (no markdown fences, no extra text):
{
  "contentMix": "Clear format breakdown (e.g. 50% Reels, 30% Carousels, 20% Stories) & optimal weekly cadence.",
  "hookStrategy": "Specific 3-second hook example & exact pattern interrupt tactic to stop scrolling.",
  "retentionFunnel": "Specific DM keyword action, story poll sequence, or community retention mechanism.",
  "kpiFocus": "Primary metrics to track (e.g. Non-follower reach, Save rate, DM leads) & strategic outcome."
}
`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }]
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`Gemini API HTTP ${response.status}`);

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // Parse JSON response
            const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('Could not parse JSON from Gemini response');

            const parsed = JSON.parse(jsonMatch[0]);

            renderStrategyCards(parsed, true);
        } catch (err) {
            console.warn('Gemini API fetch failed or timed out. Falling back to Yatish Rule-Based Matrix.', err);
            const fallbackData = getFallbackStrategy(platform, stage, goal);
            renderStrategyCards(fallbackData, false);
        }
    }

    function renderStrategyCards(data, isLiveAI) {
        if (!simOutput) return;

        simOutput.innerHTML = `
            <div class="sim-output-grid">
                <div class="sim-box">
                    <h4><i class="ri-pie-chart-line"></i> Content Mix & Cadence</h4>
                    <p>${data.contentMix}</p>
                </div>
                <div class="sim-box">
                    <h4><i class="ri-flashlight-line"></i> 3-Second Hook & Interrupt</h4>
                    <p>${data.hookStrategy}</p>
                </div>
                <div class="sim-box">
                    <h4><i class="ri-funnel-line"></i> Retention & DM Funnel</h4>
                    <p>${data.retentionFunnel}</p>
                </div>
                <div class="sim-box" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4><i class="ri-flag-line"></i> Core KPI & Outcome</h4>
                        <p>${data.kpiFocus}</p>
                    </div>
                    <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
                        <span class="ai-subtitle-tag"><i class="${isLiveAI ? 'ri-sparkling-fill' : 'ri-book-3-line'}"></i> ${isLiveAI ? 'Gemini 2.0 Real-time Strategy' : 'Yatish Strategy Framework'}</span>
                        <a href="#contact" class="btn-primary small">Execute Strategy <i class="ri-arrow-right-line"></i></a>
                    </div>
                </div>
            </div>
        `;
    }

    function getFallbackStrategy(platform, stage, goal) {
        // High-level rule-based fallback strategy engine ensuring 100% offline uptime
        const fallbackMatrix = {
            instagram: {
                reach: {
                    contentMix: "55% Discovery Reels (High Motion), 35% Visual Carousels, 10% Stories. Optimal Cadence: 4-5 Reels/week.",
                    hookStrategy: "Type 1 Visual Contrast Interrupt. Open with immediate action: 'Your brand is losing 80% of video views because of this one line.'",
                    retentionFunnel: "DM Trigger: 'Comment DISCOVERY to get the complete 3-second hook checklist directly in your inbox.'",
                    kpiFocus: "Non-Follower Reach %, Reel Completion Rate, Share-to-View Ratio."
                },
                community: {
                    contentMix: "50% Educational Carousels, 35% Interactive Stories (Polls/Quizzes), 15% Community Reels. Cadence: 3-4 posts/week.",
                    hookStrategy: "Type 3 Relatable Frustration. 'That one campaign meeting where everyone agrees on posting consistently but nobody has a strategy.'",
                    retentionFunnel: "Story Poll Sequence -> Quiz Sticker -> DM Keyword 'COMMUNITY' for exclusive playbook access.",
                    kpiFocus: "Save Rate, Story Retention %, Comment Depth, Repeat Viewer Loyalty."
                },
                leads: {
                    contentMix: "40% Case Study Reels, 40% Lead Magnet Carousels, 20% Direct-Offer Stories. Cadence: 4 posts/week.",
                    hookStrategy: "Bold Data Shock. 'How we generated 1,200+ webinar registrations without spending ₹1 on ads.'",
                    retentionFunnel: "Comment 'GROWTH' to trigger an automated direct message with the instant download link.",
                    kpiFocus: "DM Inbound Rate, Lead Form Conversions, Cost Per Qualified Lead."
                },
                launch: {
                    contentMix: "60% Teaser Reels (Countdown), 25% Feature Breakdown Carousels, 15% VIP Access Stories. Cadence: Daily during launch week.",
                    hookStrategy: "High-Tension Open Loop. 'We were told this product feature was impossible to build in 30 days.'",
                    retentionFunnel: "Countdown Sticker in Stories + DM Keyword 'VIP' for 24-hour early access.",
                    kpiFocus: "Launch Day Traffic, Day-1 Conversions, Broadcast Channel Opt-in Rate."
                },
                authority: {
                    contentMix: "45% Personal Story Carousels, 35% Behind-the-Scenes Reels, 20% Q&A Stories. Cadence: 3 posts/week.",
                    hookStrategy: "High-Tension Claim. 'After managing social strategy for 4 industries at once, here is the harsh truth about viral content.'",
                    retentionFunnel: "Question Box in Stories -> Reposted Video Answer -> DM Keyword 'AUDIT' for account feedback.",
                    kpiFocus: "Profile Visits, High-Net-Worth DMs, Personal Brand Authority Signals."
                }
            },
            linkedin: {
                reach: {
                    contentMix: "50% Tactical Breakdown Posts (Text + Visual), 30% PDF Playbook Sliders, 20% Video Analysis. Cadence: 3-4 posts/week.",
                    hookStrategy: "Counter-Intuitive Observation. 'Posting 5 times a week without a 3-second hook framework is just noise.'",
                    retentionFunnel: "End post with a debatable industry observation: 'I'm curious how senior marketers handle this drop-off.'",
                    kpiFocus: "Impressions, Profile Views, Executive Connection Request Rate."
                },
                community: {
                    contentMix: "60% PDF Sliders/Cheatsheets, 25% Deep-Dive Case Studies, 15% Native Polls. Cadence: 3 posts/week.",
                    hookStrategy: "Relatable B2B Frustration. 'The gap between what marketing promises and what performance actually delivers.'",
                    retentionFunnel: "Offer full high-res PDF guide in comments in exchange for meaningful discussion.",
                    kpiFocus: "Reposts, Comment Quality Index, Content Save Count."
                },
                leads: {
                    contentMix: "50% Growth Case Studies, 30% Framework Breakdown PDF, 20% Client Outcome Stories. Cadence: 4 posts/week.",
                    hookStrategy: "Data-Backed Proof. 'How we took an Aviation brand from zero social momentum to an 809% view growth.'",
                    retentionFunnel: "Direct CTA: 'DM me STRATEGY for the full PDF breakdown of this campaign.'",
                    kpiFocus: "Inbound Consultation DMs, Pipeline Velocity, Qualified B2B Leads."
                },
                launch: {
                    contentMix: "45% Founder Launch Story, 35% Product Spec Sliders, 20% Early User Testimonials. Cadence: 4 posts/week.",
                    hookStrategy: "High-Tension Teaser. '6 months of secret testing boiled down to this one release.'",
                    retentionFunnel: "Waitlist link in first comment + DM Keyword 'LAUNCH' for early trial access.",
                    kpiFocus: "Waitlist Signups, Referral Clicks, Investor & Press Inquiries."
                },
                authority: {
                    contentMix: "50% Personal Playbooks & Observations, 30% Industry Teardowns, 20% Leadership Stories. Cadence: 3 posts/week.",
                    hookStrategy: "Bold Strategic Claim. 'Reach gets attention. Retention builds relevance. Conversion creates business value.'",
                    retentionFunnel: "Conclude with open question inviting peer disagreement in comments.",
                    kpiFocus: "Executive Followers, Speaking Invitations, Thought Leadership Index."
                }
            },
            facebook: {
                reach: {
                    contentMix: "50% Short Video Reels, 30% High-Emotion Image Posts, 20% Community Story Videos. Cadence: 4-5 posts/week.",
                    hookStrategy: "Emotional Story Hook. 'When your team loses but the jersey still has to look good on match day.'",
                    retentionFunnel: "Prompt audience to tag local friends and share in regional Facebook groups.",
                    kpiFocus: "Viral Shares, Video Watch Time, MoM Reach Growth."
                },
                community: {
                    contentMix: "40% Community Discussion Prompts, 40% Event/Photo Albums, 20% Live Q&A. Cadence: 3-4 posts/week.",
                    hookStrategy: "Local Community Tension. 'One organ donor can save up to 8 lives — here is what Ahmedabad runner group did.'",
                    retentionFunnel: "Direct Group Join Link + Weekly Community Discussion Threads.",
                    kpiFocus: "Group Active Members, Post Comments, Event RSVP Rate."
                },
                leads: {
                    contentMix: "60% Direct Offer Copy + Image, 40% Client Video Testimonials. Cadence: 4 posts/week.",
                    hookStrategy: "Financial Contrast Hook. 'Your roof is receiving sunlight every day. Why is your electricity bill still ₹5,000?'",
                    retentionFunnel: "Messenger Bot Trigger: Click 'Get Solar Savings Audit' to start direct chat.",
                    kpiFocus: "Messenger Lead Form Completions, Cost Per Lead (CPL)."
                },
                launch: {
                    contentMix: "50% Event Registration Reels, 30% Local Activation Photos, 20% Direct Ads. Cadence: Daily during campaign.",
                    hookStrategy: "Urgency Hook. 'Registration closes in 48 hours for the biggest marathon in Gujarat.'",
                    retentionFunnel: "Direct Facebook Event Page RSVP + Instant Booking Link.",
                    kpiFocus: "Ticket Registrations, Event RSVPs, Ad Return on Ad Spend (ROAS)."
                },
                authority: {
                    contentMix: "40% Founder Video Stories, 40% Operational Insights, 20% Community Highlights. Cadence: 3 posts/week.",
                    hookStrategy: "Authentic Story Hook. 'Building a social strategy agency in 2026 taught me these 3 lessons.'",
                    retentionFunnel: "Invite comments sharing personal business journeys.",
                    kpiFocus: "Page Likes, Organic Fan Retention, Local Brand Trust."
                }
            },
            youtube: {
                reach: {
                    contentMix: "80% YouTube Shorts (15-30s), 20% Long-form Teasers. Cadence: 4 Shorts/week.",
                    hookStrategy: "0-2s Immediate Visual Motion + On-screen Bold Text. 'Do NOT buy solar panels until you check this one efficiency metric.'",
                    retentionFunnel: "Pinned Comment with direct link to full deep-dive breakdown video.",
                    kpiFocus: "Shorts Feed Views, Average Percentage Viewed (>85%), Subscriber Conversion."
                },
                community: {
                    contentMix: "60% Shorts Tips, 30% Community Tab Polls/Updates, 10% Q&A Shorts. Cadence: 3 Shorts/week.",
                    hookStrategy: "Relatable Creator Tension. 'Why 98.5% of your video views come from non-subscribers — and how to fix it.'",
                    retentionFunnel: "Community Tab Poll -> Follow-up Short addressing poll results.",
                    kpiFocus: "Subscriber Returning Viewers, Community Tab Votes, Comment Interaction Rate."
                },
                leads: {
                    contentMix: "70% Case Study Shorts, 30% Product Demo Shorts. Cadence: 3-4 Shorts/week.",
                    hookStrategy: "Before vs After Transformation. 'Watch how this kiosk activation drove 50% flight bookings in 3 days.'",
                    retentionFunnel: "Description & Pinned Comment Link -> Direct Webinar Sign-up Landing Page.",
                    kpiFocus: "Description Link Clicks, Lead Conversions, Traffic Quality."
                },
                launch: {
                    contentMix: "75% Unboxing & Feature Shorts, 25% Premiere Countdown Videos. Cadence: Daily during launch.",
                    hookStrategy: "High-Energy Reveal. 'First look at the official IPL 2026 Gujarat Titans merchandise lineup.'",
                    retentionFunnel: "Set Premiere Reminder + Pinned Link for instant store preorder.",
                    kpiFocus: "Pre-order Clicks, First 24-hour Views, Subscriber Growth."
                },
                authority: {
                    contentMix: "60% Strategic Opinion Shorts, 40% Long-form Masterclasses. Cadence: 2 Shorts + 1 Video/week.",
                    hookStrategy: "Bold Expertise Hook. 'Stop posting content calendars. Start building attention-to-conversion systems.'",
                    retentionFunnel: "End screen CTA: Subscribe for weekly social strategy masterclasses.",
                    kpiFocus: "Watch Time Hours, Subscriber Loyalty, Thought Leadership Reach."
                }
            },
            x: {
                reach: {
                    contentMix: "60% Viral Threads, 30% Real-Time Commentary, 10% Visual Quotes. Cadence: 2-3 posts/day.",
                    hookStrategy: "High-Friction Single Line. 'Most brands are spending thousands on content that nobody stops scrolling for. Here is why.'",
                    retentionFunnel: "Thread conclusion: 'Retweet the first post if you found this useful, and follow for more strategy breakdowns.'",
                    kpiFocus: "Impressions, Retweets, Profile Clicks."
                },
                community: {
                    contentMix: "50% Interactive Discussions, 30% Real-time Q&A Threads, 20% Industry Hot Takes. Cadence: 2 posts/day.",
                    hookStrategy: "Debatable Question. 'Window seat or aisle seat? The airline debate that will never die.'",
                    retentionFunnel: "Engage with top 10 replies within the first 15 minutes of posting.",
                    kpiFocus: "Reply Depth, Quote Tweets, Follower Growth Rate."
                },
                leads: {
                    contentMix: "50% Teardown Threads, 30% Playbook PDF Links, 20% DM Callouts. Cadence: 1-2 posts/day.",
                    hookStrategy: "Case Study Breakdown. 'How we generated 1,200+ webinar signups with 0 ad spend [A Thread 🧵]'",
                    retentionFunnel: "Final tweet: 'DM me PLAYBOOK to get the raw template and setup.'",
                    kpiFocus: "Inbound DMs, Link Clicks, Lead Downloads."
                },
                launch: {
                    contentMix: "70% Real-time Live Updates, 20% Feature Clips, 10% Spaces Event. Cadence: 3-5 posts/day on launch.",
                    hookStrategy: "Live Announcement. 'It is officially live. 6 months of strategy compressed into one release.'",
                    retentionFunnel: "Pinned Tweet + Direct Product Link with limited-time launch code.",
                    kpiFocus: "Link Clicks, Conversions, Campaign Hashtag Impressions."
                },
                authority: {
                    contentMix: "60% Thought Leadership Threads, 40% Sharp Industry Observations. Cadence: 2 posts/day.",
                    hookStrategy: "Unpopular Opinion. 'Organic content should teach paid campaigns what messaging works — not the other way around.'",
                    retentionFunnel: "Invite fellow strategists to quote tweet with their take.",
                    kpiFocus: "Industry Quote Tweets, High-Profile Followers, DM Inquiries."
                }
            }
        };

        const pData = fallbackMatrix[platform] || fallbackMatrix.instagram;
        const gData = pData[goal] || pData.reach;

        return {
            contentMix: gData.contentMix,
            hookStrategy: gData.hookStrategy,
            retentionFunnel: gData.retentionFunnel,
            kpiFocus: gData.kpiFocus + ` (Tailored for ${stage.toUpperCase()} stage positioning)`
        };
    }

    renderSimulatorOutput();

    // =========================================================
    // FEATURE 3: FULLSCREEN GLASSMORPHIC CASE STUDY MODAL SYSTEM
    // =========================================================
    const caseStudies = {
        'scroll-mantra': {
            brand: 'Scroll Mantra',
            role: 'Jr. Social Media Strategist',
            logoBg: 'conic-gradient(#4caf50 25%, #ffeb3b 0 50%, #f44336 0 75%, #2196f3 0)',
            logoContent: '',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Executive Summary</h4>
                        <p>Scroll Mantra is a digital strategy agency managing high-visibility brand accounts across aviation, sportswear, live events, and renewable energy. As Jr. Social Media Strategist, I own end-to-end strategy and execution for <strong>Vietjet, T10 Sports, KD Amdavad Marathon, and Bharat Solar Shakti</strong> across Instagram, Facebook, LinkedIn, YouTube, WhatsApp, X, and Snapchat.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> 4 Key Brands Portfolio</h4>
                        <p><strong>✈️ Vietjet Air:</strong> Global Aviation Campaign & Kiosk Activation<br>
                        <strong>🏏 T10 Sports:</strong> IPL 2026 Merchandise Partner Campaigns<br>
                        <strong>🏃 KD Amdavad Marathon:</strong> Organ Donation Social Awareness<br>
                        <strong>☀️ Bharat Solar Shakti:</strong> B2B Clean Tech & Solar Awareness</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-card mb-4">
                    <h4><i class="ri-compass-3-line"></i> Core Strategy & Execution Across All 4 Brands</h4>
                    <ul>
                        <li><strong>Multi-Industry Architecture:</strong> Built platform-specific content strategies, campaign calendars, and communication plans for four brands across four distinct industries (Aviation, Sportswear, Events, Energy).</li>
                        <li><strong>Vietjet Air Diwali Activation:</strong> Co-managed Diwali booking campaign — 50% flight discount offers, a physical interactive mall kiosk activation in Ahmedabad, and the "My Dream Boarding Pass" viral contest.</li>
                        <li><strong>T10 Sports (IPL 2026):</strong> Led social media execution for T10 Sports as the official merchandise partner for Gujarat Titans during IPL 2026, creating real-time content for fan meetups, stadium activations, and player gear releases.</li>
                        <li><strong>KD Amdavad Marathon:</strong> Conceptualized the "Silent Runner" campaign featuring 8 runner silhouettes representing the 8 lives one organ donor can save, driving massive civic awareness and shares.</li>
                        <li><strong>Bharat Solar Shakti:</strong> Crafted B2B solar adoption visual guides, clean energy infographics, and founder LinkedIn content.</li>
                        <li><strong>Retention Audit:</strong> Diagnosed a 3-second drop-off on static brand intros and rebuilt the hook: immediate visual contrast, high-impact typography, and 3-second pattern interrupts.</li>
                    </ul>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">Vietjet Air • Diwali Contest</span>
                        </div>
                        <div class="mock-post-body">
                            ✈️ "My Dream Boarding Pass Contest & Mall Kiosk Activation"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 12.5M+ Views</span>
                            <span><i class="ri-chat-3-line"></i> 500% Interaction Surge</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">T10 Sports • IPL 2026</span>
                        </div>
                        <div class="mock-post-body">
                            🏏 "Official Gujarat Titans Merchandise Release & Stadium Fan Meetups"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-user-follow-line"></i> Fan Activation</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">KD Amdavad Marathon</span>
                        </div>
                        <div class="mock-post-body">
                            🎽 "The Silent Runner — 8 Silhouettes, 8 Lives Saved by Organ Donation"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-share-forward-line"></i> Civic Awareness Viral</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">Bharat Solar Shakti</span>
                        </div>
                        <div class="mock-post-body">
                            ☀️ "Clean Energy Revolution: B2B Solar Adoption Playbook"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-line-chart-line"></i> B2B Thought Leadership</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-trophy-line"></i> Verified MoM Growth</h4>
                        <p><strong>+45.3%</strong> Facebook reach growth (MoM)<br>
                        <strong>+40.3%</strong> Instagram reach growth (MoM)<br>
                        <strong>+809%</strong> surge in YouTube views (MoM)</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-sparkles-line"></i> 3,000% Campaign View Surge</h4>
                        <p>Scaled cumulative video view growth from <strong>400K → 12.5M+ views</strong> over a 28-day campaign push with <strong>+500%</strong> increase in content interactions.</p>
                    </div>
                </div>
            `
        },
        'register-karo': {
            brand: 'Register Karo',
            role: 'Social Media Marketing Intern',
            logoBg: '#f97316',
            logoContent: '<i class="ri-shield-check-fill" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Executive Summary</h4>
                        <p>Register Karo is a leading corporate legal and business registration service in India. As Social Media Marketing Intern, I led organic content strategy across LinkedIn and Instagram to build brand authority and trust with founders and entrepreneurs.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Primary Objective</h4>
                        <p>Convert complex legal/compliance topics into engaging, digestible content that drives organic lead magnet downloads and website visits.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-card mb-4">
                    <h4><i class="ri-compass-3-line"></i> Core Strategy & Execution</h4>
                    <ul>
                        <li>Converted dense legal and compliance jargon into digestible, high-engagement infographics and story scripts.</li>
                        <li>Built LinkedIn thought-leadership carousels on tax perks, compliance deadlines, and fundraising checklists.</li>
                        <li>Developed and executed content calendars across LinkedIn and Instagram targeted at first-time founders.</li>
                    </ul>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#f97316;"></div>
                            <span class="mock-post-user">Register Karo • LinkedIn</span>
                        </div>
                        <div class="mock-post-body">
                            📄 "Complete Pvt Ltd Registration Checklist [PDF Guide]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-thumb-up-line"></i> 1,840 Reactions</span>
                            <span><i class="ri-share-forward-line"></i> 320 Reposts</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#f97316;"></div>
                            <span class="mock-post-user">@registerkaro</span>
                        </div>
                        <div class="mock-post-body">
                            💡 "5 Costly Compliance Mistakes Every Founder Makes in Year 1"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 6.1K Likes</span>
                            <span><i class="ri-bookmark-line"></i> 1.9K Saves</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-line-chart-line"></i> Audience & Engagement Growth</h4>
                        <p><strong>+35%</strong> LinkedIn follower growth<br>
                        <strong>+48%</strong> Instagram engagement growth<br>
                        <strong>+22%</strong> boost in overall post reach</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-external-link-line"></i> Organic Traffic Surge</h4>
                        <p><strong>+65%</strong> increase in monthly organic website visits driven directly from social platforms via lead-magnet content.</p>
                    </div>
                </div>
            `
        },
        'doyen-ed': {
            brand: 'Doyen Ed',
            role: 'Social Media Marketing Intern',
            logoBg: '#d97706',
            logoContent: '<i class="ri-shield-star-fill" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Executive Summary</h4>
                        <p>Doyen Ed is a study-abroad consultancy and global education mentorship brand. As Social Media Marketing Intern, I managed their Instagram presence and performance ad campaigns to convert audience trust into webinar sign-ups at scale.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Key Focus</h4>
                        <p>Engineered an end-to-end webinar funnel combining authentic student trust reels, ad campaigns, and broadcast channel countdowns.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-card mb-4">
                    <h4><i class="ri-compass-3-line"></i> Core Strategy & Execution</h4>
                    <ul>
                        <li>Produced authentic student testimonial reels (visa approvals, campus tours) to build aspirational trust.</li>
                        <li>Led collaborations with educational brands and ran targeted ad campaigns to expand reach beyond the existing follower base.</li>
                        <li>Engineered a webinar funnel: countdown stories, live Q&A sessions, broadcast channel updates.</li>
                    </ul>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#d97706;"></div>
                            <span class="mock-post-user">@doyened_official</span>
                        </div>
                        <div class="mock-post-body">
                            🎓 "How Rahul Got a Full Scholarship [Live Reel]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 22.4K Likes</span>
                            <span><i class="ri-chat-3-line"></i> 940 Comments</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#d97706;"></div>
                            <span class="mock-post-user">@doyened_official</span>
                        </div>
                        <div class="mock-post-body">
                            🌍 "Global University Masterclass — Sign-up Funnel"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-user-add-line"></i> 450 Direct Sign-ups</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-user-shared-line"></i> 1,200+ Webinar Sign-ups</h4>
                        <p>Driven <strong>1,200+ live webinar registrations per campaign</strong> through organic storytelling and performance ad funnel strategy.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-eye-line"></i> 98.5% Non-Follower Reach</h4>
                        <p>Reached <strong>22,000+ impressions, 10,000+ unique accounts</strong> with <strong>98.5% of views from non-followers</strong> — genuine new-audience expansion.</p>
                    </div>
                </div>
            `
        },
        'yellow-octo': {
            brand: 'Yellow Octo LLP',
            role: 'Social Media Marketing Intern',
            logoBg: '#171717',
            logoContent: '<i class="ri-tentacle-line" style="color: #ffc107; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Executive Summary</h4>
                        <p>Yellow Octo LLP is a creative agency. As Social Media Marketing Intern, I built out their LinkedIn and Instagram presence through human-centric culture content and B2B portfolio storytelling.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Primary Objective</h4>
                        <p>Humanize agency branding, showcase creative team culture, and publish B2B case study carousels that drive inbound client DMs.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-card mb-4">
                    <h4><i class="ri-compass-3-line"></i> Core Strategy & Execution</h4>
                    <ul>
                        <li>Humanized the agency through behind-the-scenes content featuring designers, copywriters, and editors.</li>
                        <li>Built case-study carousels demonstrating client ROI and brand transformation work.</li>
                        <li>Managed Instagram strategy with targeted content and audience analysis to drive reach.</li>
                    </ul>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#ffc107;"></div>
                            <span class="mock-post-user">Yellow Octo • Instagram Reel</span>
                        </div>
                        <div class="mock-post-body">
                            🎬 "Day in the Life of a Creative Strategist [BTS Reel]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 11.8K Likes</span>
                            <span><i class="ri-share-forward-line"></i> 890 Shares</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#ffc107;"></div>
                            <span class="mock-post-user">Yellow Octo • LinkedIn</span>
                        </div>
                        <div class="mock-post-body">
                            🚀 "How We Rebranded a Fintech Startup in 14 Days"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-thumb-up-line"></i> 950 Reactions</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-line-chart-line"></i> Follower & Reach Surge</h4>
                        <p><strong>+24%</strong> LinkedIn follower growth with 4,500+ organic impressions in 2 months.<br>
                        <strong>+24%</strong> Instagram follower growth with a <strong>60% increase in reach</strong>.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-message-3-line"></i> +40% Inbound Client Inquiries</h4>
                        <p>Increased qualified inbound B2B client inquiries via Instagram & LinkedIn direct messages by <strong>40%</strong>.</p>
                    </div>
                </div>
            `
        },
        'flypup': {
            brand: 'FlypUp',
            role: 'Social Media Marketing Intern',
            logoBg: '#7c3aed',
            logoContent: '<i class="ri-flight-takeoff-line" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Executive Summary</h4>
                        <p>FlypUp is an innovative lifestyle and tech brand. As Social Media Marketing Intern, I owned content strategy and asset production end-to-end, running a full monthly content calendar and brand voice system.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Scale of Execution</h4>
                        <p>Designed and published 100+ platform-tailored assets: posts, carousels, stories, and ad creatives with zero posting gaps.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-card mb-4">
                    <h4><i class="ri-compass-3-line"></i> Core Strategy & Execution</h4>
                    <ul>
                        <li>Built a 30-day content pipeline with zero posting gaps for algorithmic consistency.</li>
                        <li>Maintained a unified visual identity across Canva and CapCut for cross-channel brand recognition.</li>
                        <li>Designed 100+ platform-tailored assets: posts, carousels, stories, and ad creatives.</li>
                    </ul>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#7c3aed;"></div>
                            <span class="mock-post-user">@flypup_official</span>
                        </div>
                        <div class="mock-post-body">
                            ⚡ "Escape the Ordinary — Series II"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 18.9K Likes</span>
                            <span><i class="ri-chat-3-line"></i> 620 Comments</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#7c3aed;"></div>
                            <span class="mock-post-user">@flypup_official</span>
                        </div>
                        <div class="mock-post-body">
                            🎁 "Weekly Community Giveaway"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-user-add-line"></i> +1.4K Followers</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-arrow-right-up-line"></i> Engagement & Follower Growth</h4>
                        <p><strong>+41%</strong> follower growth<br>
                        <strong>+38%</strong> engagement growth<br>
                        <strong>+29%</strong> rise in brand visibility<br>
                        <strong>+15%</strong> increase in audience retention</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-checkbox-circle-line"></i> 100+ Assets Delivered</h4>
                        <p>100+ assets delivered on schedule, reaching 200+ unique viewers within three months.</p>
                    </div>
                </div>
            `
        }
    };

    const modalBackdrop = document.getElementById('caseStudyModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalLogo = document.getElementById('modalLogo');
    const modalBrandTitle = document.getElementById('modalBrandTitle');
    const modalBrandRole = document.getElementById('modalBrandRole');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const clickableCards = document.querySelectorAll('.clickable-card');

    let currentStudy = null;

    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const brandKey = card.getAttribute('data-brand');
            if (caseStudies[brandKey]) {
                openCaseStudyModal(caseStudies[brandKey]);
            }
        });
    });

    function openCaseStudyModal(study) {
        currentStudy = study;
        modalBrandTitle.textContent = study.brand;
        modalBrandRole.textContent = study.role;
        modalLogo.style.background = study.logoBg;
        modalLogo.innerHTML = study.logoContent;

        document.getElementById('tab-overview').innerHTML = study.overview;
        document.getElementById('tab-strategy').innerHTML = study.strategy;
        document.getElementById('tab-creatives').innerHTML = study.creatives;
        document.getElementById('tab-metrics').innerHTML = study.metrics;

        switchModalTab('overview');

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCaseStudyModal() {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function switchModalTab(tabName) {
        modalTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

        const targetTab = document.querySelector(`.modal-tab[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(`tab-${tabName}`);

        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }

    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchModalTab(tabName);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeCaseStudyModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeCaseStudyModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
            closeCaseStudyModal();
        }
    });
});
