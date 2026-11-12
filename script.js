
const translations = {
    tr: {
        appTitle: "Kişiselleştirilmiş Parfüm Tasarım Asistanı",
        appSubtitle: "Kendi auranı keşfet, notalarını seç ve yapay zeka ile mükemmel kokunu tasarla.",
        step1Title: "Adım 1: Mevcut Auranı Tanımla",
        step1Desc: "Mevcut tarzını, ruh halini ve enerjini en iyi anlatan detayları seç.",
        step2Title: "Adım 2: Yaratmak İstediğin Etkiyi Seç",
        step2Desc: "Deneyimlemek istediğin hisleri ve çevrene vermek istediğin atmosferi seç.",
        saveAiBtn: "Benim seçtiklerimi kaydet ve google ai ile ticari parfümü bul",
        newTestBtn: "Yeni Test Yap",
        resultsTitle: "Sonuçlar ve Ticari Parfüm Önerileri",
        options: {
            aura: ["Gizemli", "Enerjik", "Sakin", "Romantik", "Sofistike", "Minimalist", "Tutkulu", "Doğal"],
            effect: ["Özgüven", "Huzur", "Çekicilik", "Ferahlık", "Gizem", "Zarafet", "Güç", "Samimiyet"]
        }
    },
    en: {
        appTitle: "Personalized Perfume Design Assistant",
        appSubtitle: "Discover your aura, select your notes, and design your perfect scent with AI.",
        step1Title: "Step 1: Define Your Current Aura",
        step1Desc: "Select the details that best describe your current style, mood, and energy.",
        step2Title: "Step 2: Choose the Effect You Want to Create",
        step2Desc: "Select the feelings you want to experience and the atmosphere you want to project.",
        saveAiBtn: "Save My Selections & Find Commercial Perfume with Google AI",
        newTestBtn: "Start New Test",
        resultsTitle: "Results & Commercial Perfume Recommendations",
        options: {
            aura: ["Mysterious", "Energetic", "Calm", "Romantic", "Sophisticated", "Minimalist", "Passionate", "Natural"],
            effect: ["Confidence", "Peace", "Allure", "Freshness", "Mystery", "Elegance", "Power", "Intimacy"]
        }
    }
};

let currentLang = 'tr'; // Default language set properly on load
let userSelections = { aura: [], effect: [] };

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('btn-tr').classList.toggle('active', lang === 'tr');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    
    document.getElementById('app-title').innerText = translations[lang].appTitle;
    document.getElementById('app-subtitle').innerText = translations[lang].appSubtitle;
    document.getElementById('step1-title').innerText = translations[lang].step1Title;
    document.getElementById('step1-desc').innerText = translations[lang].step1Desc;
    document.getElementById('step2-title').innerText = translations[lang].step2Title;
    document.getElementById('step2-desc').innerText = translations[lang].step2Desc;
    document.getElementById('btn-save-ai').innerText = translations[lang].saveAiBtn;
    document.getElementById('btn-new-test').innerText = translations[lang].newTestBtn;
    document.getElementById('results-title').innerText = translations[lang].resultsTitle;
    
    renderOptions();
}

function renderOptions() {
    const data = translations[currentLang].options;
    
    // Aura options
    const auraContainer = document.getElementById('aura-options');
    auraContainer.innerHTML = '';
    data.aura.forEach(item => {
        const div = document.createElement('div');
        div.className = 'option-chip' + (userSelections.aura.includes(item) ? ' selected' : '');
        div.innerText = item;
        div.onclick = () => toggleSelection('aura', item, div);
        auraContainer.appendChild(div);
    });

    // Effect options (Includes Step 1 features as requested: "Adım 01'deki tüm özellikler de burada yer alır")
    const effectContainer = document.getElementById('effect-options');
    effectContainer.innerHTML = '';
    // Combine effect options and aura options for Step 2 as specified
    const combinedEffectOptions = [...data.effect, ...data.aura];
    combinedEffectOptions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'option-chip' + (userSelections.effect.includes(item) ? ' selected' : '');
        div.innerText = item;
        div.onclick = () => toggleSelection('effect', item, div);
        effectContainer.appendChild(div);
    });
}

function toggleSelection(category, item, element) {
    const index = userSelections[category].indexOf(item);
    if (index > -1) {
        userSelections[category].splice(index, 1);
        element.classList.remove('selected');
    } else {
        userSelections[category].push(item);
        element.classList.add('selected');
    }
}

function saveAndFindCommercialPerfume() {
    if (userSelections.aura.length === 0 && userSelections.effect.length === 0) {
        alert(currentLang === 'tr' ? 'Lütfen en az bir seçim yapın.' : 'Please make at least one selection.');
        return;
    }
    
    // Saves only user selections without mixing system recommendations into this specific button
    localStorage.setItem('userPerfumeSelections', JSON.stringify(userSelections));
    
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `
        <p><strong>${currentLang === 'tr' ? 'Seçimleriniz Kaydedildi!' : 'Selections Saved!'}</strong></p>
        <p>${currentLang === 'tr' ? 'Google AI ile eşleşen ticari parfümler analiz ediliyor...' : 'Analyzing matching commercial perfumes with Google AI...'}</p>
        <ul>
            <li><strong>Aura:</strong> ${userSelections.aura.join(', ') || '-'}</li>
            <li><strong>${currentLang === 'tr' ? 'Etki' : 'Effect'}:</strong> ${userSelections.effect.join(', ') || '-'}</li>
        </ul>
    `;
}

function startNewTest() {
    // If there are unsaved selections, auto-save them safely once without duplicate registration, then clear
    if (userSelections.aura.length > 0 || userSelections.effect.length > 0) {
        localStorage.setItem('userPerfumeSelections_backup', JSON.stringify(userSelections));
    }
    
    userSelections = { aura: [], effect: [] };
    renderOptions();
    document.getElementById('results-section').style.display = 'none';
    alert(currentLang === 'tr' ? 'Yeni test başlatıldı. Seçimleriniz temizlendi.' : 'New test started. Selections cleared.');
}

// Initialize on page load so features appear immediately without needing to toggle EN/TR first
window.onload = function() {
    setLanguage('tr');
};
