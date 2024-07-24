document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const expertGrid = document.getElementById('expert-grid');
    let currentStep = 1;
    const totalSteps = 5;

    function showStep(step) {
        for (let i = 1; i <= totalSteps; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            if (stepElement) {
                stepElement.style.display = 'none';
            }
        }
        const currentStepElement = document.getElementById(`step-${step}`);
        if (currentStepElement) {
            currentStepElement.style.display = 'block';
        }
    }

    function nextStep(step) {
        if (step < totalSteps) {
            currentStep = step + 1;
            showStep(currentStep);
        }
    }

    function prevStep(step) {
        if (step > 1) {
            currentStep = step - 1;
            showStep(currentStep);
        }
    }

    function addExpertProfile(name, title, description, skills, affiliations, projects) {
        if (!expertGrid) return;
        const expertCard = document.createElement('div');
        expertCard.className = 'expert-card';
        expertCard.innerHTML = `
            <img src="https://via.placeholder.com/100" alt="${name}">
            <h3>${name}</h3>
            <p><strong>Title:</strong> ${title}</p>
            <p>${description}</p>
            <button class="show-more">Show More</button>
            <div class="more-info">
                <p><strong>Skills:</strong></p>
                <ul>${skills.split(',').map(skill => `<li>${skill}</li>`).join('')}</ul>
                <p><strong>Affiliations:</strong></p>
                <ul>${affiliations.split(',').map(affiliation => `<li>${affiliation}</li>`).join('')}</ul>
                <p><strong>Current Projects:</strong></p>
                <ul>${projects.split(',').map(project => `<li>${project}</li>`).join('')}</ul>
            </div>
        `;
        expertCard.querySelector('.show-more').addEventListener('click', function() {
            const moreInfo = this.nextElementSibling;
            if (moreInfo.style.display === 'block' || moreInfo.style.display === '') {
                moreInfo.style.display = 'none';
                this.textContent = 'Show More';
            } else {
                moreInfo.style.display = 'block';
                this.textContent = 'Show Less';
            }
        });
        expertGrid.appendChild(expertCard);
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const skills = document.getElementById('skills').value;
            const affiliations = document.getElementById('affiliations').value;
            const projects = document.getElementById('projects').value;
            addExpertProfile(name, title, description, skills, affiliations, projects);
            alert('Registration complete! Your profile will be publicly listed on V.H.O Expert Connections. We will get back to you for confirmation.');
            form.reset();
            currentStep = 1;
            showStep(currentStep);
        });
    }

    const startChatbotButton = document.getElementById('start-chatbot');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendMessageButton = document.getElementById('send-message');

    if (startChatbotButton) {
        startChatbotButton.addEventListener('click', function() {
            chatbotModal.style.display = 'block';
        });
    }

    if (closeChatbotButton) {
        closeChatbotButton.addEventListener('click', function() {
            chatbotModal.style.display = 'none';
        });
    }

    window.onclick = function(event) {
        if (event.target == chatbotModal) {
            chatbotModal.style.display = 'none';
        }
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', function() {
            const userMessage = chatbotInput.value;
            if (userMessage) {
                addChatbotMessage('User', userMessage);
                chatbotInput.value = '';
                setTimeout(() => {
                    const botMessage = generateBotResponse(userMessage);
                    addChatbotMessage('Bot', botMessage);
                }, 1000);
            }
        });
    }

    function addChatbotMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chatbot-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function generateBotResponse(userMessage) {
        // Simple logic to generate bot response based on the message
        // You can enhance this with more complex logic or an API call
        if (userMessage.toLowerCase().includes('start my project')) {
            return 'Sure, I can help you start your project. What type of project are you working on?';
        } else if (userMessage.toLowerCase().includes('web3')) {
            return 'For a Web3 project, I recommend consulting with our Web3 Community Leader, Nina Webber.';
        } else if (userMessage.toLowerCase().includes('tech')) {
            return 'For technology-related projects, you can reach out to our Tech Advocate, Samuel Johnson.';
        } else {
            return 'Can you please provide more details about your project?';
        }
    }

    showStep(currentStep);
    window.nextStep = nextStep;
    window.prevStep = prevStep;

    // Add the initial expert profiles
    addExpertProfile('Dr. Castel Eric', 'Dentistry Expert', 'Experienced in implantology, business vocations, and marketing strategies within the dental industry.', 'Implantology (Expert),Business Relations (Advanced),Marketing Strategies (Intermediate)', 'Dental Associations in Dubai,Business Networks in Paris', 'Dental Office in Paris,Business Vocations in Dubai');
    addExpertProfile('Avraham', '3D Art Expert', 'Active in the 3D art community with a focus on luxury and eco-friendly materials.', '3D Art Creation (Expert),Community Relations (Advanced),Eco-friendly Materials (Intermediate)', '3D Art Communities in Paris,Global Art Networks', 'Luxury 3D Art Projects,Eco-friendly 3D Manufacturing');
    addExpertProfile('Axel NYAM', 'Event Relations Expert', 'Specializes in creating large-scale events and integrating Web3 technologies for live podcasts and online interactions.', 'Event Management (Expert),Web3 Integration (Advanced),Podcast Coordination (Intermediate)', 'Global Event Networks,Web3 Communities', 'Paris Bercy Event,Online Podcast Series');

    // Adding new expert profiles
    addExpertProfile('Nina Webber', 'Web3 Community Leader', 'Leader of a vibrant Web3 community focusing on decentralized technologies.', 'Web3 (Expert),Community Building (Advanced),Decentralized Technologies (Intermediate)', 'Global Web3 Communities,Decentralized Networks', 'Web3 Community Growth,Decentralized Tech Projects');
    addExpertProfile('Samuel Johnson', 'Lawyer & Tech Advocate', 'Experienced lawyer specializing in internet law and emerging technologies.', 'Internet Law (Expert),Tech Advocacy (Advanced),Policy Development (Intermediate)', 'Legal Tech Associations,Global Law Networks', 'Tech Policy Development,Legal Tech Advocacy');
    addExpertProfile('Patricia Smith', 'Patent Expert', 'Specialist in patent law and intellectual property rights.', 'Patent Law (Expert),IP Rights (Advanced),Legal Writing (Intermediate)', 'Patent Law Associations,IP Networks', 'Patent Filing Projects,IP Rights Advocacy');
    addExpertProfile('Gossi Coulibaly', 'Geopolitical Tech Expert', 'Expert in geopolitics with a focus on technological advancements in Central Africa.', 'Geopolitics (Expert),Tech Development (Advanced),Policy Analysis (Intermediate)', 'Geopolitical Forums,African Tech Networks', 'Tech Policy in Central Africa,Geopolitical Analysis Projects');
    addExpertProfile('Rachel Adams', 'Audit Expert', 'Specializes in financial audits and regulatory compliance.', 'Financial Audits (Expert),Regulatory Compliance (Advanced),Risk Management (Intermediate)', 'Audit Associations,Compliance Networks', 'Audit Projects,Regulatory Compliance Initiatives');
    addExpertProfile('Liam Chen', 'Fintech Solutions Expert', 'Expert in fintech solutions and financial technologies.', 'Fintech (Expert),Financial Technologies (Advanced),Digital Payments (Intermediate)', 'Fintech Networks,Financial Tech Associations', 'Fintech Solution Development,Digital Payment Projects');
});
