(function() {
    'use strict';

    // Remove existing banners
    window.disableHubSpotCookieBanner = true;
    const existingBanner = document.querySelector('[id*="hs-eu-cookie"], [class*="cookie"]');
    if (existingBanner) existingBanner.remove();

    // Enhanced CSS with proper toggle functionality
    const styles = `
        * {
            box-sizing: border-box;
        }

        #hs-eu-cookie-confirmation {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #361d5c 0%, #4a2870 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            border-top: 3px solid #f6c370;
            display: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        #hs-eu-cookie-confirmation.show {
            display: block;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }

        .banner-content {
            max-width: 1000px;
            margin: 0 auto;
        }

        .banner-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }

        .banner-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            outline: none !important;
            font-size: 14px;
        }

        .settings-btn {
            background: transparent;
            color: #f6c370;
            border: 2px solid #f6c370;
        }

        .settings-btn:hover {
            background: #f6c370;
            color: #361d5c;
        }

        .accept-btn {
            background: #4caf50;
            color: white;
        }

        .accept-btn:hover {
            background: #45a049;
        }

        .decline-btn {
            background: transparent;
            color: rgba(255,255,255,0.7);
            border: 1px solid rgba(255,255,255,0.3);
        }

        .decline-btn:hover {
            background: rgba(255,255,255,0.1);
        }

        .option-a-categories {
            margin: 20px 0;
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 25px;
            border: 1px solid rgba(246, 195, 112, 0.2);
            display: none;
        }

        .option-a-categories.show {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .category-header {
            text-align: center;
            margin-bottom: 25px;
        }

        .category-header h3 {
            color: #f6c370;
            margin: 0 0 10px 0;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .category {
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            overflow: hidden;
            background: rgba(255,255,255,0.02);
        }

        .category-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
        }

        .category-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .category-label {
            font-weight: 600;
            font-size: 16px;
        }

        .category-controls {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .learn-more-btn {
            background: transparent;
            color: #f6c370;
            border: 1px solid #f6c370;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.2s ease;
            outline: none !important;
        }

        .learn-more-btn:hover {
            background: #f6c370;
            color: #361d5c;
        }

        /* WORKING TOGGLE SWITCHES */
        .toggle-wrapper {
            position: relative;
        }

        .toggle {
            position: relative;
            width: 60px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none !important;
            border: none;
        }

        .toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.02);
        }

        .toggle.active {
            background: #f6c370;
        }

        .toggle.active:hover {
            background: #e6b165;
        }

        .toggle::before {
            content: '';
            position: absolute;
            width: 26px;
            height: 26px;
            background: white;
            border-radius: 50%;
            top: 3px;
            left: 3px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .toggle.active::before {
            transform: translateX(28px);
            background: #361d5c;
        }

        .always-active {
            color: #f6c370;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(246, 195, 112, 0.15);
            padding: 8px 15px;
            border-radius: 20px;
            border: 1px solid rgba(246, 195, 112, 0.3);
            white-space: nowrap;
        }

        .category-details {
            max-height: 0;
            overflow: hidden;
            background: rgba(0,0,0,0.2);
            transition: all 0.4s ease;
        }

        .category-details.expanded {
            max-height: 500px;
            padding: 20px;
        }

        .cookie-list {
            margin-top: 15px;
        }

        .cookie-item {
            background: rgba(255,255,255,0.05);
            padding: 12px;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .cookie-name {
            font-weight: bold;
            color: #f6c370;
            font-size: 14px;
        }

        .cookie-purpose {
            font-size: 12px;
            color: rgba(255,255,255,0.8);
            margin: 5px 0;
        }

        .cookie-description {
            font-size: 11px;
            color: rgba(255,255,255,0.6);
            line-height: 1.4;
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        .action-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.2s ease;
            font-size: 14px;
            outline: none !important;
            min-width: 140px;
        }

        .save-btn {
            background: linear-gradient(135deg, #f6c370 0%, #ffd67b 100%);
            color: #361d5c;
        }

        .save-btn:hover {
            background: linear-gradient(135deg, #e6b165 0%, #f0c86b 100%);
            transform: translateY(-1px);
        }

        .accept-all-btn {
            background: transparent;
            color: #4caf50;
            border: 2px solid #4caf50;
        }

        .accept-all-btn:hover {
            background: #4caf50;
            color: white;
        }

        .reject-all-btn {
            background: transparent;
            color: rgba(255,255,255,0.7);
            border: 1px solid rgba(255,255,255,0.3);
        }

        .reject-all-btn:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }

        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
            z-index: 10001;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        }

        .toast.show {
            transform: translateX(0);
        }

        .toast.error {
            background: #f44336;
            box-shadow: 0 4px 20px rgba(244, 67, 54, 0.4);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            .category-item {
                flex-direction: column;
                align-items: stretch;
                gap: 15px;
            }

            .category-controls {
                justify-content: space-between;
            }

            .banner-buttons, .action-buttons {
                flex-direction: column;
            }

            .toggle {
                width: 50px;
                height: 28px;
            }

            .toggle::before {
                width: 22px;
                height: 22px;
            }

            .toggle.active::before {
                transform: translateX(22px);
            }
        }
    `;

    // Inject styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Create banner HTML
    const bannerHTML = `
        <div id="hs-eu-cookie-confirmation">
            <div class="banner-content">
                <div id="hs-eu-policy-wording">
                    <p>This website uses cookies to function properly and, with your consent, to collect data for analytics and personalized content. Essential cookies are always active. You can choose which types of optional cookies to allow by selecting "Manage Cookie Preferences" below.</p>
                </div>

                <div id="option-a-categories" class="option-a-categories">
                    <div class="category-header">
                        <h3>Choose Your Cookie Preferences</h3>
                        <p>Click "Learn More" to see details about each cookie category.</p>
                    </div>

                    <!-- Essential Cookies -->
                    <div class="category">
                        <div class="category-item">
                            <div class="category-info">
                                <span class="category-label">Essential Cookies</span>
                            </div>
                            <div class="category-controls">
                                <button class="learn-more-btn" data-details="essential">Learn More</button>
                                <span class="always-active">Always Active</span>
                            </div>
                        </div>
                        <div id="essential-details" class="category-details">
                            <p><strong>These cookies are necessary for LS Retail's platform to function properly (21 cookies).</strong></p>
                            <div class="cookie-list">
                                <div class="cookie-item">
                                    <div class="cookie-name">__cf_bm</div>
                                    <div class="cookie-purpose">Provider: hscta.net | Duration: session</div>
                                    <div class="cookie-description">Cloud flare's bot products identify and mitigate automated traffic to protect your site from bad bots.</div>
                                </div>
                                <div class="cookie-item">
                                    <div class="cookie-name">__hs_do_not_track</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: 179 days</div>
                                    <div class="cookie-description">Prevents the tracking code from sending any information to HubSpot</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Functional Cookies -->
                    <div class="category">
                        <div class="category-item">
                            <div class="category-info">
                                <span class="category-label">Functional Cookies</span>
                            </div>
                            <div class="category-controls">
                                <button class="learn-more-btn" data-details="functional">Learn More</button>
                                <div class="toggle-wrapper">
                                    <div class="toggle" data-category="functional"></div>
                                </div>
                            </div>
                        </div>
                        <div id="functional-details" class="category-details">
                            <p><strong>Enable enhanced functionality and personalization features (9 cookies).</strong></p>
                            <div class="cookie-list">
                                <div class="cookie-item">
                                    <div class="cookie-name">sp_t</div>
                                    <div class="cookie-purpose">Provider: spotify.com | Duration: session</div>
                                    <div class="cookie-description">Required to ensure the functionality of the integrated Spotify plugin.</div>
                                </div>
                                <div class="cookie-item">
                                    <div class="cookie-name">_clck</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: session</div>
                                    <div class="cookie-description">Microsoft Clarity click tracking cookie for user interaction analysis.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics Cookies -->
                    <div class="category">
                        <div class="category-item">
                            <div class="category-info">
                                <span class="category-label">Analytics Cookies</span>
                            </div>
                            <div class="category-controls">
                                <button class="learn-more-btn" data-details="analytics">Learn More</button>
                                <div class="toggle-wrapper">
                                    <div class="toggle" data-category="analytics"></div>
                                </div>
                            </div>
                        </div>
                        <div id="analytics-details" class="category-details">
                            <p><strong>Help us understand how businesses use our retail solutions (10 cookies).</strong></p>
                            <div class="cookie-list">
                                <div class="cookie-item">
                                    <div class="cookie-name">_ga</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: 399 days</div>
                                    <div class="cookie-description">ID used to identify users</div>
                                </div>
                                <div class="cookie-item">
                                    <div class="cookie-name">__hstc</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: 179 days</div>
                                    <div class="cookie-description">Analytics tracking cookie</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Marketing Cookies -->
                    <div class="category">
                        <div class="category-item">
                            <div class="category-info">
                                <span class="category-label">Marketing Cookies</span>
                            </div>
                            <div class="category-controls">
                                <button class="learn-more-btn" data-details="marketing">Learn More</button>
                                <div class="toggle-wrapper">
                                    <div class="toggle" data-category="marketing"></div>
                                </div>
                            </div>
                        </div>
                        <div id="marketing-details" class="category-details">
                            <p><strong>Enable targeted content about our unified commerce solutions (14 cookies).</strong></p>
                            <div class="cookie-list">
                                <div class="cookie-item">
                                    <div class="cookie-name">_fbp</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: 89 days</div>
                                    <div class="cookie-description">Facebook analytics cookie</div>
                                </div>
                                <div class="cookie-item">
                                    <div class="cookie-name">_gcl_au</div>
                                    <div class="cookie-purpose">Provider: lsretail.com | Duration: 89 days</div>
                                    <div class="cookie-description">Used by Google AdSense for experimenting with advertisement efficiency.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button class="action-btn save-btn" id="save-preferences">Confirm My Choices</button>
                        <button class="action-btn accept-all-btn" id="accept-all">Accept All</button>
                        <button class="action-btn reject-all-btn" id="reject-all">Reject All Optional</button>
                    </div>
                </div>

                <div class="banner-buttons">
                    <button class="banner-btn settings-btn" id="manage-preferences">Manage Cookie Preferences</button>
                    <button class="banner-btn accept-btn" id="accept-cookies">Accept All</button>
                    <button class="banner-btn decline-btn" id="decline-cookies">Decline</button>
                </div>
            </div>
        </div>
    `;

    // Insert banner
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    // JavaScript functionality
    window.LSRetailCookies = {
        consentState: {
            essential: true,
            functional: false,
            analytics: false,
            marketing: false
        },

        storageKey: 'lsretail_cookie_consent',
        expiryKey: 'lsretail_consent_expiry',

        init: function() {
            this.loadStoredConsent();
            this.setupEventListeners();
            this.updateUI();
            
            if (!this.hasValidConsent()) {
                setTimeout(() => this.showBanner(), 1000);
            }
        },

        loadStoredConsent: function() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                const expiry = localStorage.getItem(this.expiryKey);
                
                if (stored && expiry && new Date() < new Date(expiry)) {
                    this.consentState = { ...this.consentState, ...JSON.parse(stored) };
                    return true;
                }
            } catch (e) {
                console.warn('Failed to load stored consent:', e);
            }
            return false;
        },

        hasValidConsent: function() {
            const expiry = localStorage.getItem(this.expiryKey);
            return expiry && new Date() < new Date(expiry);
        },

        setupEventListeners: function() {
            const self = this;

            // Toggle switches
            document.querySelectorAll('.toggle[data-category]').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const category = this.dataset.category;
                    if (category && category !== 'essential') {
                        self.toggleConsent(category, this);
                    }
                });
            });

            // Learn more buttons
            document.querySelectorAll('.learn-more-btn[data-details]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.dataset.details;
                    self.toggleDetails(category, this);
                });
            });

            // Main action buttons
            document.getElementById('manage-preferences').addEventListener('click', () => this.showOptions());
            document.getElementById('accept-cookies').addEventListener('click', () => this.acceptAll());
            document.getElementById('decline-cookies').addEventListener('click', () => this.rejectAll());
            
            document.getElementById('save-preferences').addEventListener('click', () => this.savePreferences());
            document.getElementById('accept-all').addEventListener('click', () => this.acceptAll());
            document.getElementById('reject-all').addEventListener('click', () => this.rejectAll());
        },

        updateUI: function() {
            Object.keys(this.consentState).forEach(category => {
                if (category === 'essential') return;
                
                const toggle = document.querySelector(`[data-category="${category}"]`);
                if (toggle) {
                    toggle.classList.toggle('active', this.consentState[category]);
                }
            });
        },

        toggleConsent: function(category, toggleEl) {
            if (category === 'essential') return;

            this.consentState[category] = !this.consentState[category];
            toggleEl.classList.toggle('active', this.consentState[category]);

            console.log('Cookie consent updated:', category, '=', this.consentState[category]);
            this.showToast(`${category.charAt(0).toUpperCase() + category.slice(1)} cookies ${this.consentState[category] ? 'enabled' : 'disabled'}`);
        },

        toggleDetails: function(category, btnEl) {
            const details = document.getElementById(category + '-details');
            const isExpanded = details.classList.contains('expanded');
            
            details.classList.toggle('expanded');
            btnEl.textContent = isExpanded ? 'Learn More' : 'Show Less';
        },

        showBanner: function() {
            document.getElementById('hs-eu-cookie-confirmation').classList.add('show');
        },

        hideBanner: function() {
            const banner = document.getElementById('hs-eu-cookie-confirmation');
            const categories = document.getElementById('option-a-categories');
            banner.classList.remove('show');
            categories.classList.remove('show');
            document.getElementById('manage-preferences').textContent = 'Manage Cookie Preferences';
        },

        showOptions: function() {
            const categories = document.getElementById('option-a-categories');
            const btn = document.getElementById('manage-preferences');
            
            if (categories.classList.contains('show')) {
                categories.classList.remove('show');
                btn.textContent = 'Manage Cookie Preferences';
            } else {
                categories.classList.add('show');
                btn.textContent = 'Close Preferences Panel';
            }
        },

        savePreferences: function() {
            this.saveConsent();
            this.showToast('Cookie preferences saved!');
            this.hideBanner();
        },

        acceptAll: function() {
            this.consentState.functional = true;
            this.consentState.analytics = true;
            this.consentState.marketing = true;
            this.updateUI();
            this.saveConsent();
            this.showToast('All cookies accepted!');
            this.hideBanner();
        },

        rejectAll: function() {
            this.consentState.functional = false;
            this.consentState.analytics = false;
            this.consentState.marketing = false;
            this.updateUI();
            this.saveConsent();
            this.showToast('Optional cookies rejected!');
            this.hideBanner();
        },

        saveConsent: function() {
            try {
                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 365);
                
                localStorage.setItem(this.storageKey, JSON.stringify(this.consentState));
                localStorage.setItem(this.expiryKey, expiry.toISOString());
                
                this.updateHubSpotConsent();
                return true;
            } catch (e) {
                console.error('Failed to save consent:', e);
                return false;
            }
        },

        updateHubSpotConsent: function() {
            try {
                if (window._hsp && window._hsp.push) {
                    window._hsp.push(['updatePrivacyConsent', {
                        analytics: this.consentState.analytics,
                        functional: this.consentState.functional,
                        marketing: this.consentState.marketing
                    }]);
                }

                if (typeof gtag !== 'undefined') {
                    gtag('consent', 'update', {
                        'analytics_storage': this.consentState.analytics ? 'granted' : 'denied'
                    });
                }

                if (typeof fbq !== 'undefined') {
                    if (this.consentState.marketing) {
                        fbq('consent', 'grant');
                    } else {
                        fbq('consent', 'revoke');
                    }
                }

                console.log('✅ Updated consent with tracking services');
            } catch (e) {
                console.error('Failed to update tracking consent:', e);
            }
        },

        showToast: function(message, type = 'success') {
            const existingToasts = document.querySelectorAll('.toast');
            existingToasts.forEach(toast => toast.remove());

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        // API methods
        getConsentState: function() {
            return { ...this.consentState };
        },

        setConsentState: function(newState) {
            this.consentState = { ...this.consentState, ...newState };
            this.updateUI();
            this.saveConsent();
        },

        resetConsent: function() {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.expiryKey);
            this.consentState = {
                essential: true,
                functional: false,
                analytics: false,
                marketing: false
            };
            this.updateUI();
            this.showBanner();
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.LSRetailCookies.init());
    } else {
        window.LSRetailCookies.init();
    }

    console.log('✅ LS Retail Cookie Banner loaded - working sliders!');
    console.log('Available methods:', Object.keys(window.LSRetailCookies));

})();