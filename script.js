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
    // FEATURE 2: BRAND STRATEGY SIMULATOR ENGINE
    // =========================================================
    const simPlatformPills = document.querySelectorAll('#sim-platform .sim-pill');
    const simStagePills = document.querySelectorAll('#sim-stage .sim-pill');
    const simGoalPills = document.querySelectorAll('#sim-goal .sim-pill');
    const simOutput = document.getElementById('simOutput');

    let currentSim = {
        platform: 'instagram',
        stage: 'startup',
        goal: 'reach'
    };

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

    function renderSimulatorOutput() {
        if (!simOutput) return;

        const mixMap = {
            instagram: {
                reach: { format: '60% Reels, 30% Carousels, 10% Stories', frequency: '4-5 posts/week', hook: 'Pattern Interrupts & High Visual Contrast', metric: 'Reel Impressions & Non-Follower Reach' },
                engagement: { format: '50% Educational Carousels, 30% Interactive Stories, 20% Reels', frequency: '3-4 posts/week', hook: 'Relatable Problem-Agitation-Solution', metric: 'Saves, Shares & Comment Depth' },
                leads: { format: '40% Direct-Offer Reels, 40% Lead Magnet Carousels, 20% Broadcast Stories', frequency: '4 posts/week', hook: 'Case Study Transformation Teasers', metric: 'DM Keywords & Webinar Sign-ups' }
            },
            linkedin: {
                reach: { format: '50% Text + Image Breakdowns, 30% PDF Documents, 20% Video', frequency: '3 posts/week', hook: 'Bold Industry Counter-Intuitive Insights', metric: 'Post Views & Profile Visits' },
                engagement: { format: '60% PDF Document Playbooks, 30% Opinion Polls/Questions, 10% Long-form', frequency: '3 posts/week', hook: 'Framework & Compliance Cheat-sheets', metric: 'Comment Depth & Reposts' },
                leads: { format: '50% Breakdown Case Studies, 30% Lead Magnet PDF Guides, 20% BTS Stories', frequency: '4 posts/week', hook: 'Behind-the-Scenes Client Growth', metric: 'Inbound Leads & Inquiry DM Rate' }
            },
            facebook: {
                reach: { format: '50% Short Video Reels, 30% Image Ads/Posts, 20% Link Posts', frequency: '4 posts/week', hook: 'Curiosity Gaps & Emotional Relevance', metric: 'Share Volume & MoM Reach' },
                engagement: { format: '40% Community Discussions, 40% Photo Albums, 20% Live Q&A', frequency: '3 posts/week', hook: 'Community Polls & Interactive Prompts', metric: 'Group Growth & Discussion Volume' },
                leads: { format: '60% Direct Offer Copy + Image, 40% Testimonial Reels', frequency: '4 posts/week', hook: 'Webinar Funnel & Direct Registration', metric: 'Cost Per Registration & Click Through Rate' }
            }
        };

        const currentData = mixMap[currentSim.platform][currentSim.goal];

        simOutput.innerHTML = `
            <div class="sim-output-grid">
                <div class="sim-box">
                    <h4><i class="ri-pie-chart-line"></i> Recommended Content Mix</h4>
                    <p><strong>${currentData.format}</strong></p>
                </div>
                <div class="sim-box">
                    <h4><i class="ri-repeat-line"></i> Optimal Cadence & Hooks</h4>
                    <p><strong>Cadence:</strong> ${currentData.frequency}</p>
                    <p><strong>Hook Strategy:</strong> ${currentData.hook}</p>
                </div>
                <div class="sim-box">
                    <h4><i class="ri-flag-line"></i> Core KPI Focus</h4>
                    <p><strong>${currentData.metric}</strong></p>
                </div>
                <div class="sim-box" style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
                    <h4><i class="ri-flashlight-line"></i> Strategic Impact</h4>
                    <p class="mb-4">Tailored for <strong>${currentSim.stage.toUpperCase()}</strong> stage positioning.</p>
                    <a href="#contact" class="btn-primary small" style="margin-top: auto;">Execute This Strategy <i class="ri-arrow-right-line"></i></a>
                </div>
            </div>
        `;
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
