// Personal domain collection data
const domainsData = [
    {
        id: 1,
        name: "TechStartup.com",
        price: 25000,
        category: "Technology",
        extension: "com",
        length: 11,
        age: 5,
        traffic: 1200,
        description: "Perfect brandable domain for tech startups and innovation companies",
        owner_notes: "Acquired this gem in 2019. The .com extension and clear branding make it ideal for any technology startup.",
        keywords: ["tech", "startup", "innovation"],
        acquisition_year: 2019,
        featured: true
    },
    {
        id: 2,
        name: "DigitalMarket.org",
        price: 15000,
        category: "Business",
        extension: "org",
        length: 13,
        age: 3,
        traffic: 800,
        description: "Ideal for digital marketing agencies and consultants",
        owner_notes: "Great for establishing authority in the digital marketing space. The .org extension adds credibility.",
        keywords: ["digital", "market", "business"],
        acquisition_year: 2021,
        featured: false
    },
    {
        id: 3,
        name: "CloudSolutions.net",
        price: 18500,
        category: "Technology",
        extension: "net",
        length: 14,
        age: 4,
        traffic: 950,
        description: "Great for cloud service providers and SaaS companies",
        owner_notes: "With cloud computing dominating the tech landscape, this domain has incredible potential.",
        keywords: ["cloud", "solutions", "saas"],
        acquisition_year: 2020,
        featured: false
    },
    {
        id: 4,
        name: "GreenEnergy.eco",
        price: 12000,
        category: "Environment",
        extension: "eco",
        length: 11,
        age: 2,
        traffic: 600,
        description: "Perfect for renewable energy and sustainability businesses",
        owner_notes: "The .eco extension is perfect for environmental businesses. This sector is booming!",
        keywords: ["green", "energy", "eco"],
        acquisition_year: 2022,
        featured: false
    },
    {
        id: 5,
        name: "CryptoExchange.io",
        price: 45000,
        category: "Finance",
        extension: "io",
        length: 14,
        age: 6,
        traffic: 2100,
        description: "Premium domain for cryptocurrency and blockchain projects",
        owner_notes: "My crown jewel! Acquired before the crypto boom. The .io extension is highly valued in tech circles.",
        keywords: ["crypto", "exchange", "blockchain"],
        acquisition_year: 2018,
        featured: true
    },
    {
        id: 6,
        name: "AIConsulting.ai",
        price: 35000,
        category: "Technology",
        extension: "ai",
        length: 12,
        age: 3,
        traffic: 1500,
        description: "Ideal for AI consulting and machine learning companies",
        owner_notes: "With AI being the next big thing, this domain is positioned perfectly for the future.",
        keywords: ["ai", "consulting", "ml"],
        acquisition_year: 2021,
        featured: true
    }
];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderDomains(domainsData);
    setupFilters();
    setupSearch();
    setupChat();
    setupModal();
});

// Render domains to the grid
function renderDomains(domains) {
    const grid = document.getElementById('domains-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    domains.forEach(domain => {
        const domainCard = createDomainCard(domain);
        grid.appendChild(domainCard);
    });
}

// Create individual domain card
function createDomainCard(domain) {
    const card = document.createElement('div');
    card.className = 'domain-card';
    card.dataset.domainId = domain.id;
    
    card.innerHTML = `
        <div class="domain-name">${domain.name}</div>
        <div class="domain-price">$${domain.price.toLocaleString()}</div>
        <div class="domain-category">${domain.category}</div>
        <div class="domain-description">${domain.description}</div>
        
        <div class="domain-stats">
            <div class="stat-item">
                <span class="stat-value">${domain.age}</span>
                <span class="stat-label">Years Old</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${domain.traffic}</span>
                <span class="stat-label">Monthly Traffic</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${domain.length}</span>
                <span class="stat-label">Characters</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">.${domain.extension}</span>
                <span class="stat-label">Extension</span>
            </div>
        </div>
        
        <div class="domain-actions">
            <button class="btn btn--secondary" onclick="openChat('${domain.name}')">
                💬 Negotiate
            </button>
            <button class="btn btn--primary" onclick="showDomainDetails(${domain.id})">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Setup filter functionality
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const extensionFilter = document.getElementById('extension-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterDomains);
    }
    if (extensionFilter) {
        extensionFilter.addEventListener('change', filterDomains);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterDomains);
    }
}

// Filter domains based on selected criteria
function filterDomains() {
    const category = document.getElementById('category-filter')?.value || '';
    const extension = document.getElementById('extension-filter')?.value || '';
    const priceRange = document.getElementById('price-filter')?.value || '';
    const searchTerm = document.getElementById('domain-search')?.value.toLowerCase() || '';
    
    let filtered = domainsData.filter(domain => {
        // Category filter
        if (category && domain.category !== category) return false;
        
        // Extension filter
        if (extension && domain.extension !== extension) return false;
        
        // Price filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
            if (max && (domain.price < parseInt(min) || domain.price > parseInt(max))) return false;
            if (!max && domain.price < parseInt(min)) return false;
        }
        
        // Search filter
        if (searchTerm && !domain.name.toLowerCase().includes(searchTerm) && 
            !domain.description.toLowerCase().includes(searchTerm) &&
            !domain.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))) {
            return false;
        }
        
        return true;
    });
    
    renderDomains(filtered);
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('domain-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterDomains);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterDomains();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterDomains);
    }
}

// Show domain details in modal
function showDomainDetails(domainId) {
    const domain = domainsData.find(d => d.id === domainId);
    if (!domain) return;
    
    const modal = document.getElementById('domain-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalBody) {
        modalBody.innerHTML = `
            <h2>${domain.name}</h2>
            <div class="modal-price">$${domain.price.toLocaleString()}</div>
            
            <div class="modal-section">
                <h3>Domain Details</h3>
                <p><strong>Category:</strong> ${domain.category}</p>
                <p><strong>Extension:</strong> .${domain.extension}</p>
                <p><strong>Length:</strong> ${domain.length} characters</p>
                <p><strong>Age:</strong> ${domain.age} years</p>
                <p><strong>Monthly Traffic:</strong> ${domain.traffic} visitors</p>
                <p><strong>Acquired:</strong> ${domain.acquisition_year}</p>
            </div>
            
            <div class="modal-section">
                <h3>Description</h3>
                <p>${domain.description}</p>
            </div>
            
            <div class="modal-section">
                <h3>Owner's Notes</h3>
                <p><em>"${domain.owner_notes}"</em></p>
            </div>
            
            <div class="modal-section">
                <h3>Keywords</h3>
                <div class="keywords">
                    ${domain.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn--secondary" onclick="openChat('${domain.name}')">
                    💬 Start Negotiation
                </button>
                <button class="btn btn--primary" onclick="contactOwner('${domain.name}')">
                    📧 Contact Owner
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('domain-modal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Setup chat functionality
function setupChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input-field');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            if (chatWindow) {
                chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            if (chatWindow) {
                chatWindow.style.display = 'none';
            }
        });
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Send chat message
function sendMessage() {
    const input = document.getElementById('chat-input-field');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!input || !messagesContainer || !input.value.trim()) return;
    
    const message = input.value.trim();
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <p>${message}</p>
        <span class="message-time">Just now</span>
    `;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simulate owner response (in real app, this would be real-time)
    setTimeout(() => {
        const ownerResponse = getOwnerResponse(message);
        const ownerMessage = document.createElement('div');
        ownerMessage.className = 'message owner-message';
        ownerMessage.innerHTML = `
            <p>${ownerResponse}</p>
            <span class="message-time">Just now</span>
        `;
        messagesContainer.appendChild(ownerMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

// Generate owner responses (simulate conversation)
function getOwnerResponse(message) {
    const responses = [
        "Thanks for your interest! Which domain are you looking at?",
        "I'd be happy to discuss pricing. What's your budget range?",
        "That's a great domain choice! Let me tell you why it's special...",
        "I can work with you on the price. What did you have in mind?",
        "Would you like to set up a call to discuss this further?",
        "I've had several inquiries about that one. It's definitely in demand!",
        "Happy to provide more details about the domain's history and potential."
    ];
    
    // Simple keyword-based responses
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "I'm always open to reasonable offers. What price range were you thinking?";
    }
    
    if (lowerMessage.includes('domain')) {
        return "Which domain caught your attention? I'd love to share its story with you.";
    }
    
    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
        return "Great! We can use Escrow.com for a secure transaction. Would you like me to explain the process?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Open chat with specific domain context
function openChat(domainName) {
    const chatWindow = document.getElementById('chat-window');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (chatWindow) {
        chatWindow.style.display = 'block';
    }
    
    if (messagesContainer && domainName) {
        // Add context message about the specific domain
        const contextMessage = document.createElement('div');
        contextMessage.className = 'message owner-message';
        contextMessage.innerHTML = `
            <p>I see you're interested in ${domainName}! It's one of my favorites. What would you like to know about it?</p>
            <span class="message-time">Just now</span>
        `;
        messagesContainer.appendChild(contextMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Contact owner function
function contactOwner(domainName) {
    const subject = encodeURIComponent(`Inquiry about ${domainName}`);
    const body = encodeURIComponent(`Hi, I'm interested in purchasing ${domainName}. Could we discuss the details?`);
    window.location.href = `mailto:domains@yourname.com?subject=${subject}&body=${body}`;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const domainInterest = document.getElementById('domain-interest')?.value;
            const message = document.getElementById('message')?.value;
            
            // In a real application, you would send this data to your server
            alert('Thank you for your inquiry! I will get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Add CSS for modal elements not in the CSS file
document.addEventListener('DOMContentLoaded', function() {
    // Add inline styles for modal elements
    const style = document.createElement('style');
    style.textContent = `
        .modal-price {
            font-size: 2rem;
            font-weight: bold;
            color: var(--color-success);
            margin: 1rem 0;
        }
        
        .modal-section {
            margin: 2rem 0;
            padding: 1.5rem 0;
            border-bottom: 1px solid var(--color-gray-200);
        }
        
        .modal-section:last-child {
            border-bottom: none;
        }
        
        .modal-section h3 {
            color: var(--color-gray-900);
            margin-bottom: 1rem;
        }
        
        .keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .keyword-tag {
            background: var(--color-primary);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .modal-actions .btn {
            flex: 1;
        }
        
        @media (max-width: 768px) {
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
});