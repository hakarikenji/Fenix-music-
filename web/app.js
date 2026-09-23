/* Fenix Music — shared app core: settings store + i18n (6 UI languages) + helpers.
   Loaded by every page BEFORE its page script. Exposes window.FenixApp. */
(function () {
  "use strict";

  var STORE_KEY = "fenix-music-settings";

  // ---------- default settings (English base) ----------
  var DEFAULTS = {
    uiLanguage: "en",        // UI language
    lyricsLanguage: "English", // default lyrics language (English is the base)
    genre: "phonk",
    mood: "dark aggressive",
    bpm: 140,
    energy: 3,               // 1..5 (Very low → Maximum)
    vocal: "with-vocals",    // with-vocals | instrumental-only
    duration: 20,
    autoChatTranslate: false, // radio DJ replies in the UI language
    reduceMotion: false,
    history: []               // generated tracks [{prompt, seconds, at, url, bpm, energy, vocal, genre, mood, topic, duration}]
  };

  // ---------- UI translations (English is the base) ----------
  var UI = {
    en: {
      tagline: "Phonk & songs studio — Fenix family · by Hakari",
      connecting: "Connecting…",
      serverOffline: "Server offline",
      navStudio: "Studio", navSound: "Sound", navSettings: "Settings",
      tabLyrics: "✍️ Lyrics", tabChat: "💬 Radio DJ",
      lyricsTitle: "✍️ Original Song Lyrics",
      lyricsSub: "Phonk, rap, any genre — full structure (Intro/Verse/Chorus/Bridge/Outro)",
      genre: "Genre", mood: "Mood", lyricsLang: "Lyrics language",
      vocal: "Vocal style", vocalInstr: "Instrumental only", vocalWith: "With vocals",
      vocalNote: "Instrumental: lyrics become structure labels only",
      creationSetup: "🎛️ Creation setup",
      tempo: "Tempo (BPM)", energy: "Energy",
      e1: "Very low", e2: "Low", e3: "Medium", e4: "High", e5: "Maximum",
      topic: "Idea / Topic",
      topicPh: "e.g. the night, speed, a city under rain, a rise from zero story…",
      writeLyrics: "Write lyrics 🔥", copy: "Copy", copied: "Copied ✓",
      chatTitle: "💬 Fenix Radio DJ",
      chatSub: "Helps you pick the style and mood, and understands your taste",
      chatPh: "Type your message…", send: "Send",
      chatHello: "Hey! I'm the Fenix Music DJ 🎙️ Tell me what you hear in your head — dark phonk? a sad song? Let's start!",
      lyricsReady: "Lyrics ready 🔥 (brain: ",
      soundTitle: "🎧 Real Sound Generation (MusicGen on GPU)",
      soundSub: "Write the beat description or auto-generate it, then hit generate — you get a ready WAV",
      bpm: "BPM", durationSecs: "Duration: {n} seconds",
      beatPrompt: "Audio prompt",
      beatPh: "e.g. dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ Build audio prompt", generate: "🎵 Generate music",
      promptBox: "Audio prompt — editable",
      promptBoxNote: "Nothing built yet — tap “Build audio prompt”, or leave empty and generation will build one from your settings",
      backupPrompt: "Auto prompt from settings",
      emptyPrompt: "Build the audio prompt first (or let generation build one from your settings)",
      promptReady: "Prompt ready ⚡ (brain: ",
      seedNew: "new seed", variation: "🎲 Variation",
      shuffle: "🎲", variating: "Re-generating with a new seed…",
      variationDone: "New variation added to your library 🎲",
      instrLyrics: "Instrumental selected — lyrics output structure labels only (no sung words).",
      seedNote: "Random seed isn't supported by the free generator — re-roll may sound similar",
      sVocal: "Default vocal style", sEnergy: "Default energy",
      genreCustom: "Custom genre", structureLbl: "Song structure (in order)",
      customLyrics: "Custom lyrics (optional — overrides AI lyrics)",
      customLyricsPh: "[Verse]\nwrite your own lines here…",
      vocalMale: "Male vocals", vocalFemale: "Female vocals", vocalChoir: "Choir", vocalRap: "Rap flow",
      usingCustom: "Using your custom lyrics.",
      variationHint: "Generate a track first — variation re-uses its settings with a new seed.",
      noSavedSettings: "No saved settings for this track",
      generatingGPU: "Generating audio… this needs a GPU worker or HF token on the server.",
      trackAdded: "Track generated — added to your library.",
      promptReview: "Audio prompt ready — review it, then generate.",
      buildingPrompt: "Building the audio prompt…",
      brainTag: "Brain: ",
      generating: "Generating… first time may take minutes (loading the model on GPU)",
      yourTrack: "🎶 Your new track", genIn: "Generated in {n}s",
      trackReady: "Your track is ready 🎧", downloadWav: "⬇️ Download WAV",
      historyTitle: "🕘 Generated tracks", historySub: "Stored on this device",
      noHistory: "Nothing here yet — generate your first beat!",
      restore: "Restore", settingsTitle: "⚙️ Settings",
      settingsSub: "App preferences — saved on this device",
      sUiLang: "App language", sUiLangD: "Interface language for the whole app",
      sLyricsLang: "Default lyrics language", sLyricsLangD: "Pre-selected in the studio",
      sGenre: "Default genre", sMood: "Default mood",
      sBpm: "Default BPM", sDuration: "Default duration (seconds)",
      sTranslate: "DJ replies in app language", sTranslateD: "Radio DJ always answers in the UI language",
      sMotion: "Reduce motion", sMotionD: "Disable spinner and UI animations",
      reset: "Reset to defaults", resetDone: "Settings reset ✓", saved: "Saved ✓",
      multi: "multilingual",
      brainsBusy: "All brains are busy right now — try again in a few minutes",
      chatNoReply: "The brain didn't reply — try again"
    },
    ar: {
      tagline: "استوديو الفونك والأغاني — من عائلة Fenix · by Hakari",
      connecting: "جاري الاتصال…", serverOffline: "الخادم غير متصل",
      navStudio: "الاستوديو", navSound: "الصوت", navSettings: "الإعدادات",
      tabLyrics: "✍️ كلمات", tabChat: "💬 مذيع راديو",
      lyricsTitle: "✍️ كلمات أغنية أصلية",
      lyricsSub: "فونك، راب، أي نوع — بنية كاملة Intro/Verse/Chorus/Bridge/Outro",
      genre: "النوع", mood: "المزاج", lyricsLang: "لغة الكلمات",
      vocal: "أسلوب الغناء", vocalInstr: "موسيقى فقط (بدون كلمات)", vocalWith: "مع غناء",
      vocalNote: "بدون غناء: تصير الكلمات وسوم بنية فقط",
      creationSetup: "🎛️ إعدادات الإنشاء",
      tempo: "الإيقاع (BPM)", energy: "الطاقة",
      e1: "منخفضة جداً", e2: "منخفضة", e3: "متوسطة", e4: "عالية", e5: "قصوى",
      topic: "الفكرة / الموضوع",
      topicPh: "مثال: الليل، السرعة، مدينة تحت المطر، قصة صعود من الصفر…",
      writeLyrics: "اكتب الكلمات 🔥", copy: "نسخ", copied: "تم النسخ ✓",
      chatTitle: "💬 مذيع راديو Fenix",
      chatSub: "يساعدك تختار النمط والمزاج، ويفهم ذوقك الموسيقي",
      chatPh: "اكتب رسالتك…", send: "إرسال",
      chatHello: "أهلين! أنا مذيع Fenix Music 🎙️ قل لي وش تسمع في بالك — فونك غامق؟ أغنية حزينة؟ نبدأ؟",
      lyricsReady: "الكلمات جاهزة 🔥 (العقل: ",
      soundTitle: "🎧 توليد الصوت الحقيقي (MusicGen على GPU)",
      soundSub: "اكتب وصف البيت، أو ولّده تلقائياً من إعداداتك، ثم اضغط توليد — يرجع لك WAV جاهز",
      bpm: "BPM", durationSecs: "المدة: {n} ثانية",
      beatPrompt: "برومبت الصوت",
      beatPh: "مثال: dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ ابنِ برومبت الصوت", generate: "🎵 توليد الموسيقى",
      promptBox: "برومبت الصوت — قابل للتعديل",
      promptBoxNote: "لا يوجد برومبت بعد — اضغط «ابنِ برومبت الصوت»، أو اتركه فارغاً وسيتكوّن تلقائياً من إعداداتك عند التوليد",
      backupPrompt: "برومبت تلقائي من الإعدادات",
      emptyPrompt: "ابنِ برومبت الصوت أولاً (أو خلّ التوليد يكوّنه من إعداداتك)",
      promptReady: "البرومبت جاهز ⚡ (العقل: ",
      seedNew: "seed جديد", variation: "🎲 نسخة أخرى",
      shuffle: "🎲", variating: "إعادة توليد بـ seed جديد…",
      variationDone: "انضاف نسخة جديدة للمكتبة 🎲",
      instrLyrics: "اختار «بدون غناء» — راح تطلع الكلمات وسوم بنية فقط (بدون كلمات مغنّاة).",
      seedNote: "seed العشوائي غير مدعوم في المولّد المجاني — ممكن النسخة تشبه السابقة",
      sVocal: "أسلوب الغناء الافتراضي", sEnergy: "الطاقة الافتراضية",
      genreCustom: "نوع مخصص", structureLbl: "بنية الأغنية (بالترتيب)",
      customLyrics: "كلماتك الخاصة (اختياري — تُلغي كلمات الذكاء)",
      customLyricsPh: "[Verse]\nاكتب أسطرك هنا…",
      vocalMale: "غناء رجالي", vocalFemale: "غناء نسائي", vocalChoir: "كورال", vocalRap: "فلو راب",
      usingCustom: "نستخدم كلماتك الخاصة.",
      variationHint: "ولّد تراك أولاً — النسخة الأخرى تعيد نفس الإعدادات بـ seed جديد.",
      noSavedSettings: "ما فيه إعدادات محفوظة لهذا التراك",
      generatingGPU: "جاري توليد الصوت… يحتاج GPU worker أو HF token على الخادم.",
      trackAdded: "تم توليد التراك — انضاف لمكتبتك.",
      promptReview: "برومبت الصوت جاهز — راجعه ثم ولّد.",
      buildingPrompt: "جاري بناء برومبت الصوت…",
      brainTag: "العقل: ",
      generating: "جاري التوليد… أول مرة ممكن تاخذ دقايق (تحميل النموذج على GPU)",
      yourTrack: "🎶 مسارك الجديد", genIn: "توليد في {n} ثانية",
      trackReady: "مسارك جاهز 🎧", downloadWav: "⬇️ تحميل WAV",
      historyTitle: "🕘 المسارات المولّدة", historySub: "محفوظة على هذا الجهاز",
      noHistory: "لا شيء هنا بعد — ولّد أول بيت لك!",
      restore: "استرجاع", settingsTitle: "⚙️ إعدادات التطبيق",
      settingsSub: "تفضيلاتك — تُحفظ على هذا الجهاز",
      sUiLang: "لغة التطبيق", sUiLangD: "لغة الواجهة في كل الصفحات",
      sLyricsLang: "لغة الكلمات الافتراضية", sLyricsLangD: "المختارة مسبقاً في الاستوديو",
      sGenre: "النوع الافتراضي", sMood: "المزاج الافتراضي",
      sBpm: "BPM الافتراضي", sDuration: "المدة الافتراضية (ثوانٍ)",
      sTranslate: "ردود المذيع بلغة التطبيق", sTranslateD: "مذيع الراديو يجاوب دائماً بلغة الواجهة",
      sMotion: "تقليل الحركة", sMotionD: "تعطيل الأنيميشن والمؤشر الدوار",
      reset: "إرجاع الإعدادات الافتراضية", resetDone: "تم الإرجاع ✓", saved: "تم الحفظ ✓",
      multi: "متعدد اللغات",
      brainsBusy: "كل العقول مشغولة الآن — جرّب بعد دقائق",
      chatNoReply: "العقل ما رد — جرّب مرة ثانية"
    },
    fr: {
      tagline: "Studio phonk & chansons — famille Fenix · par Hakari",
      connecting: "Connexion…", serverOffline: "Serveur hors ligne",
      navStudio: "Studio", navSound: "Son", navSettings: "Réglages",
      tabLyrics: "✍️ Paroles", tabChat: "💬 DJ Radio",
      lyricsTitle: "✍️ Paroles originales",
      lyricsSub: "Phonk, rap, tout style — structure complète Intro/Couplet/Refrain/Pont/Outro",
      genre: "Genre", mood: "Ambiance", lyricsLang: "Langue des paroles",
      vocal: "Style vocal", vocalInstr: "Instrumental seulement", vocalWith: "Avec voix",
      vocalNote: "Instrumental : les paroles ne sont que des repères de structure",
      creationSetup: "🎛️ Réglage de création",
      tempo: "Tempo (BPM)", energy: "Énergie",
      e1: "Très basse", e2: "Basse", e3: "Moyenne", e4: "Haute", e5: "Maximum",
      topic: "Idée / Sujet",
      topicPh: "ex. la nuit, la vitesse, une ville sous la pluie…",
      writeLyrics: "Écrire les paroles 🔥", copy: "Copier", copied: "Copié ✓",
      chatTitle: "💬 DJ Radio Fenix",
      chatSub: "Il t'aide à choisir le style et l'ambiance, et comprend tes goûts",
      chatPh: "Ton message…", send: "Envoyer",
      chatHello: "Salut ! Je suis le DJ Fenix Music 🎙️ Dis-moi ce que tu entends dans ta tête — phonk sombre ? chanson triste ? On commence ?",
      lyricsReady: "Paroles prêtes 🔥 (cerveau : ",
      soundTitle: "🎧 Génération sonore réelle (MusicGen sur GPU)",
      soundSub: "Écris la description du beat ou génère-la auto, puis lance — WAV prêt",
      bpm: "BPM", durationSecs: "Durée : {n} secondes",
      beatPrompt: "Prompt audio",
      beatPh: "ex. dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ Construire le prompt", generate: "🎵 Générer la musique",
      promptBox: "Prompt audio — modifiable",
      promptBoxNote: "Rien pour l'instant — appuie sur « Construire le prompt », ou laisse vide et la génération en créera un depuis tes réglages",
      backupPrompt: "Prompt auto depuis les réglages",
      emptyPrompt: "Construis d'abord le prompt audio (ou laisse la génération le créer)",
      promptReady: "Prompt prêt ⚡ (cerveau : ",
      seedNew: "nouveau seed", variation: "🎲 Variation",
      shuffle: "🎲",      variating: "Nouvelle génération avec un nouveau seed…",
      variationDone: "Nouvelle variation ajoutée à ta bibliothèque 🎲",
      instrLyrics: "Instrumental sélectionné — sortie structure seule (sans paroles chantées).",
      seedNote: "Seed aléatoire non pris en charge par le générateur gratuit — le résultat peut ressembler",
      sVocal: "Style vocal par défaut", sEnergy: "Énergie par défaut",
      genreCustom: "Genre personnalisé", structureLbl: "Structure du morceau (dans l'ordre)",
      customLyrics: "Paroles personnalisées (optionnel — remplace les paroles IA)",
      customLyricsPh: "[Couplet]\nécris tes lignes ici…",
      vocalMale: "Voix masculine", vocalFemale: "Voix féminine", vocalChoir: "Chœur", vocalRap: "Flow rap",
      usingCustom: "Tes paroles personnalisées sont utilisées.",
      variationHint: "Génère d'abord un morceau — la variation réutilise ses réglages avec un nouveau seed.",
      noSavedSettings: "Aucun réglage enregistré pour ce morceau",
      generatingGPU: "Génération audio… nécessite un worker GPU ou un token HF sur le serveur.",
      trackAdded: "Morceau généré — ajouté à ta bibliothèque.",
      promptReview: "Prompt audio prêt — vérifie-le, puis génère.",
      buildingPrompt: "Construction du prompt audio…",
      brainTag: "Cerveau : ",
      generating: "Génération… la première fois peut prendre des minutes",
      yourTrack: "🎶 Ton nouveau morceau", genIn: "Généré en {n}s",
      trackReady: "Ton morceau est prêt 🎧", downloadWav: "⬇️ Télécharger WAV",
      historyTitle: "🕘 Morceaux générés", historySub: "Stockés sur cet appareil",
      noHistory: "Rien ici — génère ton premier beat !",
      restore: "Restaurer", settingsTitle: "⚙️ Réglages",
      settingsSub: "Préférences — sauvegardées sur cet appareil",
      sUiLang: "Langue de l'app", sUiLangD: "Langue de toute l'interface",
      sLyricsLang: "Langue des paroles par défaut", sLyricsLangD: "Présélectionnée au studio",
      sGenre: "Genre par défaut", sMood: "Ambiance par défaut",
      sBpm: "BPM par défaut", sDuration: "Durée par défaut (secondes)",
      sTranslate: "DJ répond dans la langue de l'app", sTranslateD: "Le DJ radio répond toujours dans la langue de l'UI",
      sMotion: "Réduire les animations", sMotionD: "Désactiver spinner et animations",
      reset: "Réinitialiser", resetDone: "Réinitialisé ✓", saved: "Enregistré ✓",
      multi: "multilingue",
      brainsBusy: "Tous les cerveaux sont occupés — réessaie dans quelques minutes",
      chatNoReply: "Le cerveau n'a pas répondu — réessaie"
    },
    es: {
      tagline: "Estudio de phonk y canciones — familia Fenix · por Hakari",
      connecting: "Conectando…", serverOffline: "Servidor sin conexión",
      navStudio: "Estudio", navSound: "Sonido", navSettings: "Ajustes",
      tabLyrics: "✍️ Letras", tabChat: "💬 DJ Radio",
      lyricsTitle: "✍️ Letras originales",
      lyricsSub: "Phonk, rap, cualquier género — estructura completa Intro/Verse/Chorus/Bridge/Outro",
      genre: "Género", mood: "Ánimo", lyricsLang: "Idioma de la letra",
      vocal: "Estilo vocal", vocalInstr: "Solo instrumental", vocalWith: "Con voz",
      vocalNote: "Instrumental: la letra será solo etiquetas de estructura",
      creationSetup: "🎛️ Ajustes de creación",
      tempo: "Tempo (BPM)", energy: "Energía",
      e1: "Muy baja", e2: "Baja", e3: "Media", e4: "Alta", e5: "Máxima",
      topic: "Idea / Tema",
      topicPh: "ej. la noche, la velocidad, una ciudad bajo la lluvia…",
      writeLyrics: "Escribir letra 🔥", copy: "Copiar", copied: "Copiado ✓",
      chatTitle: "💬 DJ Radio Fenix",
      chatSub: "Te ayuda a elegir estilo y ánimo, y entiende tu gusto",
      chatPh: "Escribe tu mensaje…", send: "Enviar",
      chatHello: "¡Hola! Soy el DJ de Fenix Music 🎙️ Dime qué escuchas en tu cabeza — ¿phonk oscuro? ¿una canción triste? ¿Empezamos?",
      lyricsReady: "Letra lista 🔥 (cerebro: ",
      soundTitle: "🎧 Generación de sonido real (MusicGen en GPU)",
      soundSub: "Escribe la descripción del beat o genérala automática, y dale a generar — WAV listo",
      bpm: "BPM", durationSecs: "Duración: {n} segundos",
      beatPrompt: "Prompt de audio",
      beatPh: "ej. dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ Crear prompt", generate: "🎵 Generar música",
      promptBox: "Prompt de audio — editable",
      promptBoxNote: "Nada todavía — pulsa «Crear prompt», o déjalo vacío y la generación creará uno desde tus ajustes",
      backupPrompt: "Prompt automático desde ajustes",
      emptyPrompt: "Crea primero el prompt de audio (o deja que la generación lo cree)",
      promptReady: "Prompt listo ⚡ (cerebro: ",
      seedNew: "nueva seed", variation: "🎲 Variación",
      shuffle: "🎲", variating: "Regenerando con nueva seed…",
      variationDone: "Nueva variación añadida a tu biblioteca 🎲",
      instrLyrics: "Instrumental seleccionado — salida solo etiquetas de estructura (sin letra cantada).",
      seedNote: "Seed aleatoria no soportada por el generador gratuito — puede sonar parecido",
      sVocal: "Estilo vocal por defecto", sEnergy: "Energía por defecto",
      genreCustom: "Género personalizado", structureLbl: "Estructura de la canción (en orden)",
      customLyrics: "Letra personalizada (opcional — reemplaza la letra IA)",
      customLyricsPh: "[Verse]\nescribe tus versos aquí…",
      vocalMale: "Voz masculina", vocalFemale: "Voz femenina", vocalChoir: "Coro", vocalRap: "Flow rap",
      usingCustom: "Usando tu letra personalizada.",
      variationHint: "Genera primero una pista — la variación reutiliza sus ajustes con nueva seed.",
      noSavedSettings: "Sin ajustes guardados para esta pista",
      generatingGPU: "Generando audio… necesita un worker GPU o token HF en el servidor.",
      trackAdded: "Pista generada — añadida a tu biblioteca.",
      promptReview: "Prompt de audio listo — revísalo y genera.",
      buildingPrompt: "Creando el prompt de audio…",
      brainTag: "Cerebro: ",
      generating: "Generando… la primera vez puede tardar minutos",
      yourTrack: "🎶 Tu nueva pista", genIn: "Generado en {n}s",
      trackReady: "Tu pista está lista 🎧", downloadWav: "⬇️ Descargar WAV",
      historyTitle: "🕘 Pistas generadas", historySub: "Guardadas en este dispositivo",
      noHistory: "Nada aquí — ¡genera tu primer beat!",
      restore: "Restaurar", settingsTitle: "⚙️ Ajustes",
      settingsSub: "Preferencias — guardadas en este dispositivo",
      sUiLang: "Idioma de la app", sUiLangD: "Idioma de toda la interfaz",
      sLyricsLang: "Idioma de letra por defecto", sLyricsLangD: "Preseleccionado en el estudio",
      sGenre: "Género por defecto", sMood: "Ánimo por defecto",
      sBpm: "BPM por defecto", sDuration: "Duración por defecto (segundos)",
      sTranslate: "DJ responde en el idioma de la app", sTranslateD: "El DJ radio siempre responde en el idioma de la UI",
      sMotion: "Reducir animaciones", sMotionD: "Desactivar spinner y animaciones",
      reset: "Restablecer valores", resetDone: "Restablecido ✓", saved: "Guardado ✓",
      multi: "multilingüe",
      brainsBusy: "Todos los cerebros están ocupados — inténtalo en unos minutos",
      chatNoReply: "El cerebro no respondió — inténtalo de nuevo"
    },
    ja: {
      tagline: "フォンク&ソング・スタジオ — Fenix ファミリー · by Hakari",
      connecting: "接続中…", serverOffline: "サーバーに接続できません",
      navStudio: "スタジオ", navSound: "サウンド", navSettings: "設定",
      tabLyrics: "✍️ 歌詞", tabChat: "💬 ラジオDJ",
      lyricsTitle: "✍️ オリジナル歌詞",
      lyricsSub: "フォンク、ラップ、どんなジャンルでも — Intro/Verse/Chorus/Bridge/Outro の完全構成",
      genre: "ジャンル", mood: "ムード", lyricsLang: "歌詞の言語",
      vocal: "ボーカルスタイル", vocalInstr: "インストゥルメンタルのみ", vocalWith: "ボーカルあり",
      vocalNote: "インストゥルメンタル：歌詞は構成ラベルのみになります",
      creationSetup: "🎛️ 作成設定",
      tempo: "テンポ (BPM)", energy: "エネルギー",
      e1: "非常に低い", e2: "低い", e3: "中程度", e4: "高い", e5: "最大",
      topic: "アイデア / テーマ",
      topicPh: "例：夜、スピード、雨の街、成り上がりの物語…",
      writeLyrics: "歌詞を書く 🔥", copy: "コピー", copied: "コピーしました ✓",
      chatTitle: "💬 Fenix ラジオDJ",
      chatSub: "スタイルやムード選びをサポート、あなたの音楽の好みを理解します",
      chatPh: "メッセージを入力…", send: "送信",
      chatHello: "やあ！Fenix Music のDJだ 🎙️ 頭の中で聴いてるものを教えて — ダークなフォンク？切ない曲？始めよう！",
      lyricsReady: "歌詞完成 🔥 (ブレイン: ",
      soundTitle: "🎧 本格サウンド生成 (GPU上のMusicGen)",
      soundSub: "ビートの説明を書くか自動生成して、生成ボタンを押すだけ — WAVが完成",
      bpm: "BPM", durationSecs: "長さ：{n}秒",
      beatPrompt: "オーディオプロンプト",
      beatPh: "例：dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ プロンプトを作成", generate: "🎵 音楽を生成",
      promptBox: "オーディオプロンプト — 編集可能",
      promptBoxNote: "まだありません —「プロンプトを作成」を押すか、空のままでも生成時に設定から自動作成されます",
      backupPrompt: "設定から自動プロンプト",
      emptyPrompt: "まずオーディオプロンプトを作成してね（生成時に自動作成もできるよ）",
      promptReady: "プロンプト完成 ⚡ (ブレイン: ",
      seedNew: "新しいシード", variation: "🎲 バリエーション",
      shuffle: "🎲", variating: "新しいシードで再生成中…",
      variationDone: "新しいバリエーションをライブラリに追加したよ 🎲",
      instrLyrics: "インストゥルメンタル選択中 — 出力は構成ラベルのみ（歌詞なし）になります。",
      seedNote: "無料ジェネレーターはランダムシード未対応 — 似た音になる可能性があります",
      sVocal: "デフォルトのボーカルスタイル", sEnergy: "デフォルトのエネルギー",
      genreCustom: "カスタムジャンル", structureLbl: "曲の構成（順番）",
      customLyrics: "自分の歌詞（任意 — AI歌詞を上書き）",
      customLyricsPh: "[Verse]\nここに自分の歌詞を書く…",
      vocalMale: "男性ボーカル", vocalFemale: "女性ボーカル", vocalChoir: "コーラス", vocalRap: "ラップフロー",
      usingCustom: "自分の歌詞を使用します。",
      variationHint: "まずトラックを生成して — バリエーションは同じ設定で新しいシードで作ります。",
      noSavedSettings: "このトラックの保存された設定はありません",
      generatingGPU: "音声を生成中…サーバーにGPUワーカーかHFトークンが必要です。",
      trackAdded: "トラックを生成 — ライブラリに追加しました。",
      promptReview: "オーディオプロンプト完成 — 確認してから生成してね。",
      buildingPrompt: "オーディオプロンプトを作成中…",
      brainTag: "ブレイン: ",
      generating: "生成中…初回は数分かかることがあります",
      yourTrack: "🎶 新しいトラック", genIn: "{n}秒で生成",
      trackReady: "トラック完成 🎧", downloadWav: "⬇️ WAVをダウンロード",
      historyTitle: "🕘 生成したトラック", historySub: "この端末に保存",
      noHistory: "まだ何もない — 最初のビートを生成しよう！",
      restore: "復元", settingsTitle: "⚙️ 設定",
      settingsSub: "アプリの設定 — この端末に保存されます",
      sUiLang: "アプリの言語", sUiLangD: "アプリ全体の表示言語",
      sLyricsLang: "歌詞のデフォルト言語", sLyricsLangD: "スタジオで最初から選択",
      sGenre: "デフォルトのジャンル", sMood: "デフォルトのムード",
      sBpm: "デフォルトBPM", sDuration: "デフォルトの長さ（秒）",
      sTranslate: "DJはアプリの言語で返信", sTranslateD: "ラジオDJは常にUI言語で答えます",
      sMotion: "アニメーションを減らす", sMotionD: "スピナーとアニメーションを無効化",
      reset: "デフォルトに戻す", resetDone: "リセットしました ✓", saved: "保存しました ✓",
      multi: "多言語",
      brainsBusy: "すべてのブレインが混み合っています — 数分後に再試行してください",
      chatNoReply: "ブレインから応答がありません — もう一度お試しください"
    },
    ru: {
      tagline: "Студия фонка и песен — семья Fenix · от Hakari",
      connecting: "Подключение…", serverOffline: "Сервер недоступен",
      navStudio: "Студия", navSound: "Звук", navSettings: "Настройки",
      tabLyrics: "✍️ Тексты", tabChat: "💬 Радио-диджей",
      lyricsTitle: "✍️ Оригинальные тексты",
      lyricsSub: "Фонк, рэп, любой жанр — полная структура Intro/Verse/Chorus/Bridge/Outro",
      genre: "Жанр", mood: "Настроение", lyricsLang: "Язык текста",
      vocal: "Вокальный стиль", vocalInstr: "Только инструментал", vocalWith: "С вокалом",
      vocalNote: "Инструментал: текст станет только метками структуры",
      creationSetup: "🎛️ Настройка создания",
      tempo: "Темп (BPM)", energy: "Энергия",
      e1: "Очень низкая", e2: "Низкая", e3: "Средняя", e4: "Высокая", e5: "Максимум",
      topic: "Идея / Тема",
      topicPh: "напр. ночь, скорость, город под дождём, путь из нуля…",
      writeLyrics: "Написать текст 🔥", copy: "Копировать", copied: "Скопировано ✓",
      chatTitle: "💬 Радио-диджей Fenix",
      chatSub: "Помогает выбрать стиль и настроение, понимает ваш вкус",
      chatPh: "Ваше сообщение…", send: "Отправить",
      chatHello: "Привет! Я диджей Fenix Music 🎙️ Скажи, что звучит у тебя в голове — мрачный фонк? Грустная песня? Начнём?",
      lyricsReady: "Текст готов 🔥 (мозг: ",
      soundTitle: "🎧 Генерация звука (MusicGen на GPU)",
      soundSub: "Напиши описание бита или сгенерируй автоматически, затем жми — готовый WAV",
      bpm: "BPM", durationSecs: "Длительность: {n} сек",
      beatPrompt: "Аудио-промпт",
      beatPh: "напр. dark aggressive drift phonk, heavy 808 bass, cowbell melody…",
      autoPrompt: "⚡ Собрать промпт", generate: "🎵 Сгенерировать музыку",
      promptBox: "Аудио-промпт — редактируемый",
      promptBoxNote: "Пока пусто — нажми «Собрать промпт», или оставь пустым: при генерации он соберётся из твоих настроек",
      backupPrompt: "Авто-промпт из настроек",
      emptyPrompt: "Сначала собери аудио-промпт (или дай генерации собрать его из настроек)",
      promptReady: "Промпт готов ⚡ (мозг: ",
      seedNew: "новый seed", variation: "🎲 Вариация",
      shuffle: "🎲", variating: "Регенерация с новым seed…",
      variationDone: "Новая вариация добавлена в библиотеку 🎲",
      instrLyrics: "Выбран инструментал — на выходе только метки структуры (без текста).",
      seedNote: "Случайный seed не поддерживается бесплатным генератором — результат может быть похожим",
      sVocal: "Вокальный стиль по умолчанию", sEnergy: "Энергия по умолчанию",
      genreCustom: "Свой жанр", structureLbl: "Структура песни (по порядку)",
      customLyrics: "Свой текст (необязательно — заменяет текст ИИ)",
      customLyricsPh: "[Verse]\nнапиши свои строки здесь…",
      vocalMale: "Мужской вокал", vocalFemale: "Женский вокал", vocalChoir: "Хор", vocalRap: "Рэп-флоу",
      usingCustom: "Используем ваш текст.",
      variationHint: "Сначала сгенерируйте трек — вариация повторит его настройки с новым seed.",
      noSavedSettings: "Нет сохранённых настроек для этого трека",
      generatingGPU: "Генерация аудио… нужен GPU-воркер или HF-токен на сервере.",
      trackAdded: "Трек сгенерирован — добавлен в библиотеку.",
      promptReview: "Аудио-промпт готов — проверьте и генерируйте.",
      buildingPrompt: "Собираю аудио-промпт…",
      brainTag: "Мозг: ",
      generating: "Генерация… в первый раз может занять минуты",
      yourTrack: "🎶 Твой новый трек", genIn: "Сгенерировано за {n}с",
      trackReady: "Трек готов 🎧", downloadWav: "⬇️ Скачать WAV",
      historyTitle: "🕘 Сгенерированные треки", historySub: "Хранятся на этом устройстве",
      noHistory: "Пока пусто — сгенерируй свой первый бит!",
      restore: "Восстановить", settingsTitle: "⚙️ Настройки",
      settingsSub: "Предпочтения — сохраняются на этом устройстве",
      sUiLang: "Язык приложения", sUiLangD: "Язык интерфейса всего приложения",
      sLyricsLang: "Язык текста по умолчанию", sLyricsLangD: "Предвыбран в студии",
      sGenre: "Жанр по умолчанию", sMood: "Настроение по умолчанию",
      sBpm: "BPM по умолчанию", sDuration: "Длительность по умолчанию (сек)",
      sTranslate: "DJ отвечает на языке приложения", sTranslateD: "Радио-диджей всегда отвечает на языке интерфейса",
      sMotion: "Уменьшить анимацию", sMotionD: "Отключить спиннер и анимации",
      reset: "Сбросить настройки", resetDone: "Сброшено ✓", saved: "Сохранено ✓",
      multi: "многоязычный",
      brainsBusy: "Все мозги сейчас заняты — попробуйте через пару минут",
      chatNoReply: "Мозг не ответил — попробуйте ещё раз"
    }
  };

  var LANGS = [
    { code: "en", native: "English" },
    { code: "ar", native: "العربية" },
    { code: "fr", native: "Français" },
    { code: "es", native: "Español" },
    { code: "ja", native: "日本語" },
    { code: "ru", native: "Русский" }
  ];

  var LYRIC_LANGS = [
    "English", "Arabic", "French", "Spanish", "Japanese", "Russian",
    "Multilingual mix (EN base + hooks)"
  ];

  // ---------- store ----------
  var settings = load();

  // Fenix-ai upgrade: migrate old vocal values to the Fenix-ai style list.
  var VOCAL_MIGRATION = { "with-vocals": "male vocals", "instrumental-only": "instrumental only" };
  if (VOCAL_MIGRATION[settings.vocal]) settings.vocal = VOCAL_MIGRATION[settings.vocal];

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) { s = {}; }
    var out = {};
    for (var k in DEFAULTS) {
      out[k] = (s[k] !== undefined && s[k] !== null) ? s[k] : DEFAULTS[k];
    }
    if (!Array.isArray(out.history)) out.history = [];
    return out;
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(settings)); } catch (e) { /* private mode */ }
  }

  function applyOverrides() {
    var dir = settings.uiLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", settings.uiLanguage);
    if (settings.reduceMotion) document.documentElement.setAttribute("data-reduce-motion", "1");
    else document.documentElement.removeAttribute("data-reduce-motion");
  }

  function t(key, vars) {
    var pack = UI[settings.uiLanguage] || UI.en;
    var str = pack[key] !== undefined ? pack[key] : UI.en[key];
    if (str === undefined) return key;
    if (vars) {
      for (var v in vars) str = str.replace("{" + v + "}", vars[v]);
    }
    return str;
  }

  // Translate every element carrying data-i18n / data-i18n-ph / data-i18n-html.
  function applyTranslations(root) {
    applyOverrides();
    var scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-page]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-page") === PAGE);
    });
  }

  // Which page is calling (parsed from location once).
  var PAGE = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "").replace(/^\//, "") || "index";
  if (PAGE === "index") { /* studio is the root page */ }

  // Reduce-motion CSS.
  var styleEl = document.createElement("style");
  styleEl.textContent = '[data-reduce-motion="1"] *{animation:none!important;transition:none!important}';
  document.head.appendChild(styleEl);

  // ---------- shared API helpers ----------
  function toast(text, isErr) {
    var tEl = document.getElementById("toast");
    if (!tEl) return;
    tEl.textContent = text;
    tEl.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(tEl._h);
    tEl._h = setTimeout(function () { tEl.className = "toast"; }, 3200);
  }

  function api(path, body) {
    return fetch(API + path, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) {
          // Honest errors: surface the per-brain detail the server collected.
          var msg = j.error || ("HTTP " + r.status);
          if (j.detail) {
            var d = Array.isArray(j.detail) ? j.detail.join(" · ") : String(j.detail);
            if (d) msg += " — " + d;
          }
          throw new Error(msg);
        }
        return j;
      });
    });
  }

  var API = window.FENIX_SERVER || "";

  // Track history (settings.history): add + cap at 12.
  function addTrack(rec) {
    settings.history.unshift(rec);
    if (settings.history.length > 12) settings.history.length = 12;
    save();
  }

  window.FenixApp = {
    DEFAULTS: DEFAULTS,
    LANGS: LANGS,
    LYRIC_LANGS: LYRIC_LANGS,
    PAGE: PAGE,
    API: API,
    settings: settings,
    save: save,
    t: t,
    api: api,
    toast: toast,
    addTrack: addTrack,
    applyTranslations: applyTranslations,
    uiPack: function (code) { return UI[code] || UI.en; }
  };

  // Apply immediately on load (before page script runs its own init).
  applyOverrides();
})();
