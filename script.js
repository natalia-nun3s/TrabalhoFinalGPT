// ========== CONTROLES ==========
const tempSlider = document.getElementById('temperatureSlider');
const tokensSlider = document.getElementById('tokensSlider');
let currentTemperature = 0.5;
let currentMaxTokens = 600;

tempSlider.addEventListener('input', (e) => {
    currentTemperature = parseFloat(e.target.value);
});
tokensSlider.addEventListener('input', (e) => {
    currentMaxTokens = parseInt(e.target.value);
});

// ========== INFORMAÇÕES ==========
const informacoes = {
    endereco: "📍 SENAI Diadema: Rua Guatemala, 19 - Jardim Canhema, Diadema - SP. CEP: 09941-140",
    telefone: "📞 Telefone: (11) 4070-8950 | Segunda a sexta, 8h às 22h",
    horario: "🕐 Funcionamento: Segunda a sexta, 8h às 22h. Secretaria: 8h às 20h",
    matricula: "📋 Matrícula: Acesse matricula.sp.senai.br ou vá pessoalmente na unidade",
    cursosPagos: "💰 Cursos Pagos: Mecatrônica (R$350), Desenvolvimento de Sistemas (R$320), Eletroeletrônica (R$330), Segurança do Trabalho (R$340)",
    cursosGratuitos: "🎓 Cursos Gratuitos: Logística, Administração, Eletricista Instalador (Programa Gratuidade)",
    mecatronica: "⚙️ Técnico em Mecatrônica - 2 anos - Matutino/Noturno",
    desenvolvimentodeSistemas: "💻 Técnico em Desenvolvimento de Sistemas - 1,5 ano - Noturno",
    eletroeletronica: "🔌 Técnico em Eletroeletrônica - 2 anos - Matutino/Noturno",
    logistica: "📦 Técnico em Logística - 1,5 ano - Noturno",
    seguranca: "🛡️ Técnico em Segurança do Trabalho - 1,5 ano - Noturno",
    administracao: "📊 Técnico em Administração - 1,5 ano - Matutino",
    eletricista: "⚡ Eletricista Instalador - 6 meses - Noturno",
};

function obterResposta(pergunta) {
    const lower = pergunta.toLowerCase();
    
    if (!lower.includes('diadema') && !lower.includes('senai')) {
        return "⚠️ Apenas informações sobre o SENAI Diadema.";
    }
    
    if (lower.includes('gratuito')) return informacoes.cursosGratuitos;
    if (lower.includes('pago') || lower.includes('mensalidade')) return informacoes.cursosPagos;
    if (lower.includes('endereço')) return informacoes.endereco;
    if (lower.includes('telefone')) return informacoes.telefone;
    if (lower.includes('horário')) return informacoes.horario;
    if (lower.includes('matrícula')) return informacoes.matricula;
    if (lower.includes('mecatrônica')) return informacoes.mecatronica;
    if (lower.includes('desenvolvimento')) return informacoes.desenvolvimentodeSistemas;
    if (lower.includes('eletroeletrônica')) return informacoes.eletroeletronica;
    if (lower.includes('logística')) return informacoes.logistica;
    if (lower.includes('segurança')) return informacoes.seguranca;
    if (lower.includes('administração')) return informacoes.administracao;
    if (lower.includes('eletricista')) return informacoes.eletricista;
    
    return "❓ Como posso ajudar? Pergunte sobre matrícula, telefone, endereço, horário ou cursos!";
}

// ========== CHAT ==========
const chatDiv = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    
    if (sender === 'bot') {
        msgDiv.innerHTML = `
            <div class="bot-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">SENAI.Bot</span>
                    <span class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <div class="message-text">${text}</div>
            </div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">Você</span>
                    <span class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <div class="message-text">${text}</div>
            </div>
        `;
    }
    
    chatDiv.appendChild(msgDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function sendMessage() {
    const question = userInput.value.trim();
    if (!question) return;
    
    addMessage(question, 'user');
    userInput.value = '';
    
    setTimeout(() => {
        let resposta = obterResposta(question);
        addMessage(resposta, 'bot');
    }, 300);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Sugestões
document.querySelectorAll('.suggest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        userInput.value = chip.getAttribute('data-question');
        sendMessage();
    });
});

// Cards de cursos (exceto o de Desenvolvimento de Sistemas)
document.querySelectorAll('.course-card').forEach(card => {
    const curso = card.getAttribute('data-curso');
    if (curso !== 'Desenvolvimento de Sistemas') {
        card.addEventListener('click', () => {
            userInput.value = `Quero saber sobre ${curso}`;
            sendMessage();
        });
    }
});

// ========== PROFESSORA MAYARA (COM IMAGEM PRÉ-DEFINIDA) ==========
const devSystemsCard = document.getElementById('devSystemsCard');
let teacherCardCreated = false;

// Função para criar uma imagem em base64 (emoji estilizado como foto)
// Você pode substituir esta imagem por qualquer URL de imagem na internet
const imagemProfessora = "https://i.pravatar.cc/200?img=5"; // URL de exemplo
// Ou use um emoji animado:
// const imagemProfessora = "https://cdn-icons-png.flaticon.com/512/1995/1995572.png";

// Se quiser uma imagem em base64 (pré-definida no código):
const imagemPadrao = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23E30613'/%3E%3Ctext x='50' y='70' text-anchor='middle' fill='white' font-size='50' font-weight='bold'%3E👩‍🏫%3C/text%3E%3C/svg%3E";

function showProfessorPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.innerHTML = `
        <div class="popup-container">
            <div class="popup-header">
                <i class="fas fa-heart"></i>
                <h3>❤️ Homenagem Especial ❤️</h3>
            </div>
            <div class="popup-body">
                <div class="popup-question">Vocês sabem quem é a melhor professora?</div>
                <div class="popup-buttons">
                    <button class="popup-btn popup-btn-yes" id="popupYes">Sim! 🌟</button>
                    <button class="popup-btn popup-btn-no" id="popupNo">Com certeza! ✨</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    const handleAnswer = () => {
        overlay.remove();
        showTeacherCard();
    };
    
    document.getElementById('popupYes').addEventListener('click', handleAnswer);
    document.getElementById('popupNo').addEventListener('click', handleAnswer);
}

function showTeacherCard() {
    // Se o card já foi criado, apenas rola até ele
    if (teacherCardCreated) {
        const existingCard = document.querySelector('.teacher-card-message');
        if (existingCard) {
            existingCard.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }
    
    // Criar o card da professora com imagem pré-definida
    const teacherCard = document.createElement('div');
    teacherCard.className = 'message bot teacher-card-message';
    teacherCard.setAttribute('id', 'teacherCardMessage');
    
    teacherCard.innerHTML = `
        <div class="bot-avatar"><i class="fas fa-chalkboard-user"></i></div>
        <div class="message-content" style="flex:1; max-width:100%;">
            <div class="message-header">
                <span class="sender-name" style="color:var(--senai-red);">✨ Homenagem Especial ✨</span>
                <span class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
            <div class="message-text">
                <div class="teacher-card" id="teacherCardContent">
                    <h3>⭐ Nossa Professora Inspiradora ⭐</h3>
                    <div class="teacher-photo-area">
                        <div class="teacher-photo-preview" id="teacherPhotoPreview">
                            <img src="${imagemPadrao}" alt="Professora Mayara" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                    </div>
                    <div class="teacher-name">Professora Mayara</div>
                    <div class="teacher-subtitle">🎓 A melhor professora de Desenvolvimento de Sistemas! 🎓</div>
                    <div class="teacher-heart">
                        <i class="fas fa-heart"></i> Com muito carinho e admiração! <i class="fas fa-heart"></i>
                    </div>
                    <p style="margin-top: 0.8rem; font-size: 0.75rem; color: var(--gray-600);">
                        Desejamos toda felicidade e saúde na sua gravidez! 🤰❤️
                    </p>
                    <button class="close-teacher-btn" onclick="document.getElementById('teacherCardMessage').remove(); teacherCardCreated = false;">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    chatDiv.appendChild(teacherCard);
    chatDiv.scrollTop = chatDiv.scrollHeight;
    teacherCardCreated = true;
}

// Evento para o card de Desenvolvimento de Sistemas
if (devSystemsCard) {
    devSystemsCard.addEventListener('click', (e) => {
        e.stopPropagation();
        showProfessorPopup();
    });
}

console.log("✅ Sistema carregado com sucesso!");
console.log("✨ Clique no card 'Desenvolvimento de Sistemas' para homenagear a Professora Mayara!");