(function () {
  const input = document.getElementById('fc-search-input');
  const searchBtn = document.getElementById('fc-search-btn');
  const voiceBtn = document.getElementById('fc-voice-btn');

  const normalize = (s) => (s || '').toLowerCase().trim();

  // ✅ Full searchable list (all dishes + cuisines)
  const searchMap = {
    // --- North Indian ---
    "north indian": "north_indian.html",
    "dal tadka": "dal_tadka.html",
    "dahi bhalla": "dahibhalla.html",
    "chole bhature": "bhature.html",
    "rajma chawal": "rajmachawal.html",
    "saag": "saag.html",
    "samosa": "samosa.html",

    // --- South Indian ---
    "south indian": "south_indian.html",
    "idli": "idli.html",
    "dosa": "dosa.html",
    "uttapam": "uttapam.html",
    "pongal": "pongal.html",
    "vada": "vada.html",
    "appam": "appam.html",

    // --- Italian ---
    "italian": "italian.html",
    "pasta": "pasta.html",
    "pizza": "pizza.html",
    "lasagna": "lasagna.html",
    "bruschetta": "bruschetta.html",
    "spaghetti": "spaghetti.html",
    "gnocchi": "gnocchi.html",

    // --- Mexican ---
    "mexican": "mexican.html",
    "taco": "taco.html",
    "quesadillas": "Quesadillas.html",
    "nachos": "nachos.html",
    "rellenos": "rellenos.html",
    "sopes": "sopes.html",
    "guacamole": "Guacamole.html",
    "street corn": "street_corn.html",

    // --- Drinks ---
    "drinks": "drinks.html",
    "chai": "chai.html",
    "adrak chai": "adrak_chai.html",
    "mocktails": "mocktails.html",
    "shakes": "shakes.html",
    "coffees": "coffees.html",
    "juices": "juices.html",

    // --- Desserts ---
    "dessert": "dessert.html",
    "desserts": "dessert.html",
    "gulab jamun": "gulabjamun.html",
    "rasgulla": "rasgulla.html",
    "favorites": "favorites.html"
  };

  function doSearch() {
    const q = normalize(input.value);
    if (!q) return;

    // 1️⃣ Exact match
    if (searchMap[q]) {
      window.location.href = searchMap[q];
      return;
    }

    // 2️⃣ Partial match
    const key = Object.keys(searchMap).find(k => k.includes(q));
    if (key) {
      window.location.href = searchMap[key];
      return;
    }

    // 3️⃣ No match
    alert('No matching dish or category found!');
  }

  searchBtn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  // 🎤 Voice search setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('result', (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join(' ');
      input.value = transcript;
      doSearch();
    });

    recognition.addEventListener('end', () => voiceBtn?.classList.remove('listening'));
    recognition.addEventListener('error', () => voiceBtn?.classList.remove('listening'));

    voiceBtn?.addEventListener('click', () => {
      recognition.start();
      voiceBtn?.classList.add('listening');
    });
  } else {
    voiceBtn?.addEventListener('click', () => {
      alert('Voice search not supported in this browser.');
    });
  }
})();
