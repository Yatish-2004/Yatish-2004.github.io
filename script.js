document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Setup
    const cursorBlob = document.querySelector('.cursor-blob');
    const cursorFollower = document.querySelector('.cursor-blob-follower');
    
    // Only enable custom cursor on non-touch devices
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

    // Scroll Reveal Animation with Intersection Observer
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
                reach: { format: '60% Reels, 30% Carousels, 10% Stories', frequency: '4-5 posts/week', hook: 'Pattern Interrupts & Storytelling Hooks', metric: 'Reel Impressions & Non-Follower Reach' },
                engagement: { format: '50% Educational Carousels, 30% Interactive Stories, 20% Reels', frequency: '3-4 posts/week', hook: 'Relatable Problem-Agitation-Solution', metric: 'Saves, Shares & Comment Ratio' },
                leads: { format: '40% Direct-Offer Reels, 40% Social Proof Carousels, 20% Broadcast Stories', frequency: '4 posts/week', hook: 'Case Study Transformation Teasers', metric: 'DM Keywords & Link Clicks' }
            },
            linkedin: {
                reach: { format: '50% Text + Image Breakdowns, 30% PDF Documents, 20% Video', frequency: '3 posts/week', hook: 'Bold Industry Unpopular Opinions', metric: 'Post Views & Profile Visits' },
                engagement: { format: '60% PDF Document Playbooks, 30% Opinion Polls/Questions, 10% Long-form', frequency: '3 posts/week', hook: 'Framework & Cheat-sheet Downloads', metric: 'Comment Depth & Reposts' },
                leads: { format: '50% Breakdown Case Studies, 30% Direct Offer Posts, 20% Founder Stories', frequency: '4 posts/week', hook: 'Behind-the-Scenes Client Results', metric: 'InMail Inquiries & Inbound Leads' }
            },
            facebook: {
                reach: { format: '50% Short Video Reels, 30% Image Ads/Posts, 20% Link Posts', frequency: '4 posts/week', hook: 'Curiosity Gaps & High Emotion', metric: 'Share Volume & Reach' },
                engagement: { format: '40% Community Discussions, 40% Photo Albums, 20% Live Q&A', frequency: '3 posts/week', hook: 'Community Polls & Feedback Requests', metric: 'Group Growth & Discussion Volume' },
                leads: { format: '60% Direct Offer Copy + Image, 40% Video Testimonials', frequency: '4 posts/week', hook: 'Limited-Time Incentive or Free Audit Offer', metric: 'Cost Per Lead & Click Through Rate' }
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
                    <p class="mb-4">Customized for <strong>${currentSim.stage.toUpperCase()}</strong> stage positioning.</p>
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
                        <h4><i class="ri-building-line"></i> Brand Overview</h4>
                        <p>Scroll Mantra is a premier digital strategy agency managing high-profile brands. As Jr. Social Media Strategist, I directed end-to-end brand positioning, visual storytelling, and cross-platform campaign analytics.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Key Responsibilities</h4>
                        <p>End-to-end campaign architecture, audience retention audits, viral content scripting, weekly performance analytics reporting, and client stakeholder management.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-lightbulb-line"></i> Insight & Hypothesis</h4>
                        <p>Audiences were dropping off after 3 seconds due to static brand intros. We pivoted towards immediate visual hooks and high-contrast typography in the first frame.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-rocket-line"></i> Execution Tactics</h4>
                        <p>Implemented 3-second pattern interrupts, micro-carousel series for educational content, and structured A/B testing on caption CTA variations.</p>
                    </div>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">@scrollmantra_brand</span>
                        </div>
                        <div class="mock-post-body">
                            🔥 "3 Reasons Your Reels Aren't Converting (And How We Fixed It)"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 14.2K</span>
                            <span><i class="ri-chat-3-line"></i> 480</span>
                            <span><i class="ri-share-forward-line"></i> 1.2K</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar"></div>
                            <span class="mock-post-user">@scrollmantra_brand</span>
                        </div>
                        <div class="mock-post-body">
                            📊 "28-Day Audience Growth Blueprint Breakdown"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 8.9K</span>
                            <span><i class="ri-bookmark-line"></i> 2.4K</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-trophy-line"></i> 3,000% Views Explosion</h4>
                        <p>Scaled cumulative brand video views over 28 consecutive days from 400K to 12.5M+ total impressions.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-sparkles-line"></i> +500% Interaction Rate</h4>
                        <p>Boosted comment volume, story replies, and saves by 5x through targeted interactive stickers and comment prompts.</p>
                    </div>
                </div>
            `
        },
        'register-karo': {
            brand: 'Register Karo',
            role: 'Content Planning & Execution Lead',
            logoBg: '#f97316',
            logoContent: '<i class="ri-shield-check-fill" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Brand Overview</h4>
                        <p>Register Karo is a leading corporate legal & business registration service in India. I led organic content planning across LinkedIn and Instagram to build brand authority and trust among entrepreneurs.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Content Strategy Scope</h4>
                        <p>Developing educational compliance guides, startup registration cheat sheets, founder interview clips, and high-converting campaign scripts.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-file-text-line"></i> Scripting & Copywriting</h4>
                        <p>Converted dry legal jargon into digestible, engaging infographics and story scripts tailored for young startup founders.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-linkedin-box-line"></i> LinkedIn Thought Leadership</h4>
                        <p>Authored document carousels demystifying tax perks, company compliance deadlines, and fundraising legal checklists.</p>
                    </div>
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
                            📄 "Complete Private Limited Registration Checklist for 2024 [PDF Guide]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-thumb-up-line"></i> 1,840</span>
                            <span><i class="ri-chat-3-line"></i> 320 Reposts</span>
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
                            <span><i class="ri-heart-line"></i> 6.1K</span>
                            <span><i class="ri-bookmark-line"></i> 1.9K</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-line-chart-line"></i> Qualified Lead Inflow</h4>
                        <p>Increased monthly organic website visits from LinkedIn & Instagram by 65% through direct lead magnet links.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-group-line"></i> Community Authority</h4>
                        <p>Grew follower count systematically with high-retention educational carousels and script templates.</p>
                    </div>
                </div>
            `
        },
        'doyen-ed': {
            brand: 'Doyen Ed',
            role: 'Social Media Growth & Webinar Campaign Specialist',
            logoBg: '#d97706',
            logoContent: '<i class="ri-shield-star-fill" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Brand Overview</h4>
                        <p>Doyen Ed provides study abroad consultancy and global education mentorship. I managed their Instagram presence and performance-driven ad campaigns for high-ticket webinars.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Primary Objective</h4>
                        <p>Drive targeted student sign-ups for study abroad webinars while building an inspiring, high-trust Instagram brand community.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-video-line"></i> Student Testimonials & Reels</h4>
                        <p>Produced raw, authentic student visa approval reactions and university campus tours that resonated strongly with aspirational students.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-calendar-check-line"></i> Webinar Funnel Optimization</h4>
                        <p>Structured high-urgency Instagram countdown stories, live student Q&A sessions, and broadcast channel updates.</p>
                    </div>
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
                            🎓 "How Rahul Got Full Scholarship at University of Toronto [Live Reel]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 22.4K</span>
                            <span><i class="ri-chat-3-line"></i> 940 Comments</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#d97706;"></div>
                            <span class="mock-post-user">@doyened_official</span>
                        </div>
                        <div class="mock-post-body">
                            🌍 "Global University Masterclass — Free Seats Left!"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-user-follow-line"></i> 450 Sign-ups</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-user-shared-line"></i> Record Webinar Attendance</h4>
                        <p>Attained over 1,200+ live webinar registrations per campaign through organic storytelling and targeted ads.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-star-line"></i> Brand Perception Boost</h4>
                        <p>Elevated brand trust with zero-friction Q&A reels and direct student counselor collaborations.</p>
                    </div>
                </div>
            `
        },
        'yellow-octo': {
            brand: 'Yellow Octo LLP',
            role: 'Brand Communications & Engagement Strategist',
            logoBg: '#171717',
            logoContent: '<i class="ri-tentacle-line" style="color: #ffc107; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Brand Overview</h4>
                        <p>Yellow Octo LLP is a creative agency. I strengthened their digital footprint across LinkedIn and Instagram by crafting human-centric agency culture content and B2B portfolio highlights.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Core Focus</h4>
                        <p>Demonstrating agency expertise, showcasing client wins, behind-the-scenes creative workflow, and founder personal branding.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-team-line"></i> Agency Culture & BTS</h4>
                        <p>Humanized the agency by highlighting graphic designers, copywriters, and video editors in action to build client rapport.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-briefcase-line"></i> B2B Portfolio Showcases</h4>
                        <p>Designed case study carousels demonstrating client ROI and brand identity transformations.</p>
                    </div>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#ffc107;"></div>
                            <span class="mock-post-user">Yellow Octo • Agency</span>
                        </div>
                        <div class="mock-post-body">
                            🎬 "Day in the Life of a Creative Strategist [BTS Reel]"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 11.8K</span>
                            <span><i class="ri-share-forward-line"></i> 890</span>
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
                            <span><i class="ri-thumb-up-line"></i> 950</span>
                        </div>
                    </div>
                </div>
            `,
            metrics: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-eye-line"></i> Inbound Agency Inquiries</h4>
                        <p>Increased inbound direct message client leads by 40% through organic LinkedIn & Instagram positioning.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-user-add-line"></i> Engagement Rate Surge</h4>
                        <p>Consistently outpaced industry average agency engagement through authentic behind-the-scenes content.</p>
                    </div>
                </div>
            `
        },
        'flyup': {
            brand: 'FlyUp',
            role: 'Social Media Content & Growth Lead',
            logoBg: '#7c3aed',
            logoContent: '<i class="ri-flight-takeoff-line" style="color: white; font-size: 1.5rem;"></i>',
            overview: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-building-line"></i> Brand Overview</h4>
                        <p>FlyUp is an innovative lifestyle & tech brand. I spearheaded content strategy and asset production, managing full monthly content calendars and brand voice guidelines.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-focus-3-line"></i> Scale of Execution</h4>
                        <p>Produced 100+ high-quality visual posts, carousel slides, promotional stories, and platform-tailored ad creatives.</p>
                    </div>
                </div>
            `,
            strategy: `
                <div class="modal-grid-2">
                    <div class="modal-card">
                        <h4><i class="ri-calendar-line"></i> Structured Content Calendar</h4>
                        <p>Established a bulletproof 30-day content pipeline ensuring zero gaps in posting and maximum algorithmic consistency.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-palette-line"></i> Visual Identity Optimization</h4>
                        <p>Maintained clean, modern aesthetic guidelines on Canva and Adobe suite for unified brand recognition across channels.</p>
                    </div>
                </div>
            `,
            creatives: `
                <div class="creative-showcase-grid">
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#7c3aed;"></div>
                            <span class="mock-post-user">@flyup_official</span>
                        </div>
                        <div class="mock-post-body">
                            ⚡ "Escape the Ordinary — Launching FlyUp Series II"
                        </div>
                        <div class="mock-post-stats">
                            <span><i class="ri-heart-line"></i> 18.9K</span>
                            <span><i class="ri-chat-3-line"></i> 620</span>
                        </div>
                    </div>
                    <div class="mock-post-card">
                        <div class="mock-post-header">
                            <div class="mock-post-avatar" style="background:#7c3aed;"></div>
                            <span class="mock-post-user">@flyup_official</span>
                        </div>
                        <div class="mock-post-body">
                            🎁 "Weekly Community Giveaway Campaign Story"
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
                        <h4><i class="ri-arrow-right-up-line"></i> +41% Follower Growth</h4>
                        <p>Expanded brand follower base by 41% within 60 days of implementing targeted content calendars.</p>
                    </div>
                    <div class="modal-card">
                        <h4><i class="ri-checkbox-circle-line"></i> 100+ Assets Produced</h4>
                        <p>Delivered 100+ ready-to-publish graphics, carousels, and stories on schedule with high visual excellence.</p>
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

        // Reset to first tab
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
