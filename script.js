// ==========================================
// LÓGICA DE NAVEGACIÓN (PESTAÑAS)
// ==========================================
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Quitar la clase "active" de todos los botones
        navButtons.forEach(btn => btn.classList.remove('active'));
        // 2. Ocultar todas las secciones
        tabContents.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('active');
        });

        // 3. Activar el botón clickeado
        button.classList.add('active');
        // 4. Mostrar la sección correspondiente
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active'); // Esto dispara la animación CSS
    });
});

// ==========================================
// BASE DE DATOS Y LÓGICA DE LA API
// ==========================================
const moodData = {
    feliz: [
        { titulo: "Rosa Pastel", artista: "Belanova", lyrics: "No, no quiero ser tu princesa..." },
        { titulo: "Tacones Rojos", artista: "Sebastián Yatra", lyrics: "Hay un rayo de luz que entró por mi ventana..." },
        { titulo: "Ojitos Lindos", artista: "Bad Bunny", lyrics: "Y solo mírame con esos ojitos lindos..." },
        { titulo: "Vivir Mi Vida", artista: "Marc Anthony", lyrics: "Voy a reír, voy a bailar..." },
        { titulo: "Malas Decisiones", artista: "Kenia Os", lyrics: "Hoy me puse linda para verte..." },
        { titulo: "Bailando", artista: "Enrique Iglesias", lyrics: "Yo quiero estar contigo, vivir contigo..." },
        { titulo: "Despacito", artista: "Luis Fonsi", lyrics: "Pasito a pasito, suave suavecito..." },
        { titulo: "Pegao", artista: "Camilo", lyrics: "Pegao, como en la iglesia..." }
    ],
    contento: [
        { titulo: "Me Rehúso", artista: "Danny Ocean", lyrics: "Dime cómo le explico a mi destino..." },
        { titulo: "Limón y Sal", artista: "Julieta Venegas", lyrics: "Yo te quiero con limón y sal..." },
        { titulo: "A Sky Full of Stars", artista: "Coldplay", lyrics: "'Cause you're a sky, 'cause you're a sky full of stars..." },
        { titulo: "Rayando El Sol", artista: "Maná", lyrics: "Rayando el sol, desesperación..." },
        { titulo: "I Gotta Feeling", artista: "Black Eyed Peas", lyrics: "I gotta feeling that tonight's gonna be a good night..." },
        { titulo: "Volví a Nacer", artista: "Carlos Vives", lyrics: "Por tu amor yo renací..." },
        { titulo: "La Bicicleta", artista: "Shakira", lyrics: "Lleva, llévame en tu bicicleta..." },
        { titulo: "Robarte un Beso", artista: "Carlos Vives", lyrics: "Déjame robarte un beso que me llegue hasta el alma..." }
    ],
    alegre: [
        { titulo: "La Camisa Negra", artista: "Juanes", lyrics: "Tengo la camisa negra, hoy mi amor está de luto..." },
        { titulo: "Andar Conmigo", artista: "Julieta Venegas", lyrics: "Hay tanto que quiero contarte..." },
        { titulo: "Madre Tierra (Oye)", artista: "Chayanne", lyrics: "Oye, abre tus ojos, mira hacia arriba..." },
        { titulo: "La Vida Es Un Carnaval", artista: "Celia Cruz", lyrics: "Ay, no hay que llorar, que la vida es un carnaval..." },
        { titulo: "Vente Pa' Ca", artista: "Ricky Martin", lyrics: "Si tú te atreves, por mí te llevas..." },
        { titulo: "Mi Niña Bonita", artista: "Chino y Nacho", lyrics: "Lo que siento por ti es ternura y pasión..." },
        { titulo: "Te Felicito", artista: "Shakira", lyrics: "Te felicito, qué bien actúas..." },
        { titulo: "Calma", artista: "Pedro Capó", lyrics: "Vamos pa' la playa, pa' curarte el alma..." }
    ],
    triste: [
        { titulo: "Amorfoda", artista: "Bad Bunny", lyrics: "No quiero que más nadie me hable de amor..." },
        { titulo: "Cómo Te Atreves", artista: "Morat", lyrics: "¿Cómo te atreves a volver?..." },
        { titulo: "Ya No Somos Ni Seremos", artista: "Christian Nodal", lyrics: "Quise mi piel llenarla de tatuajes..." },
        { titulo: "Ocean Eyes", artista: "Billie Eilish", lyrics: "I've been watching you for some time..." },
        { titulo: "Culpable o No", artista: "Luis Miguel", lyrics: "Miénteme como siempre..." },
        { titulo: "Tusa", artista: "Karol G", lyrics: "Pero si le ponen la canción..." },
        { titulo: "El Triste", artista: "José José", lyrics: "Qué triste fue decirnos adiós..." },
        { titulo: "Sálvame", artista: "RBD", lyrics: "Sálvame del olvido, sálvame de la soledad..." }
    ],
    melancolico: [
        { titulo: "Jueves", artista: "La Oreja de Van Gogh", lyrics: "Si fuera más guapa y un poco más lista..." },
        { titulo: "Saturno", artista: "Pablo Alborán", lyrics: "Vuelves, en cada sueño que tengo..." },
        { titulo: "Rosas", artista: "La Oreja de Van Gogh", lyrics: "Por eso esperaba con la carita empapada..." },
        { titulo: "Lo Que Construimos", artista: "Natalia Lafourcade", lyrics: "Esta historia terminó, no existe..." },
        { titulo: "Recuérdame", artista: "Carlos Rivera", lyrics: "Recuérdame, aunque te diga adiós..." },
        { titulo: "La Canción", artista: "J Balvin", lyrics: "Pensaba que te había olvidao..." },
        { titulo: "Adiós Amor", artista: "Christian Nodal", lyrics: "Adiós amor, me voy de ti..." },
        { titulo: "Callaíta", artista: "Bad Bunny", lyrics: "Ella es callaíta..." }
    ],
    dedicar: [
        { titulo: "Eso y Más", artista: "Joan Sebastian", lyrics: "Cruzaré los montes, los ríos, los valles por irte a encontrar..." },
        { titulo: "Ocean", artista: "Karol G", lyrics: "Me siento grande por ti, y aunque lo intentara no podría sin ti..." },
        { titulo: "Mi Persona Favorita", artista: "Río Roma", lyrics: "Y ya eres mi persona favorita..." },
        { titulo: "Amor Completo", artista: "Mon Laferte", lyrics: "¿Cómo se puede sentir tantas cosas en tan poco tiempo?..." },
        { titulo: "Perfect", artista: "Ed Sheeran", lyrics: "I found a love for me..." },
        { titulo: "Tú", artista: "Carin Leon", lyrics: "Tú, el amor de mi vida..." },
        { titulo: "Disfruto", artista: "Carla Morrison", lyrics: "Me complace amarte, disfruto acariciarte..." },
        { titulo: "Prometes", artista: "Fonseca", lyrics: "Prometes que no habrá un mañana sin mí..." }
    ],
    estudiar: [
        { titulo: "Hasta la Raíz", artista: "Natalia Lafourcade", lyrics: "Aunque yo me oculte tras la montaña..." },
        { titulo: "Lofi Beats", artista: "Lofi Girl", lyrics: "(Instrumental relajante para concentración)" },
        { titulo: "Claro de Luna", artista: "Beethoven", lyrics: "(Piano clásico)" },
        { titulo: "Ojos Color Sol", artista: "Calle 13", lyrics: "Hoy el sol se escondió y no quiso salir..." },
        { titulo: "Cornfield Chase", artista: "Hans Zimmer", lyrics: "(Banda sonora inmersiva)" },
        { titulo: "Clair de Lune", artista: "Debussy", lyrics: "(Melodía de piano suave)" },
        { titulo: "River Flows in You", artista: "Yiruma", lyrics: "(Piano contemporáneo)" },
        { titulo: "Gymnopédie No.1", artista: "Erik Satie", lyrics: "(Clásica para relajar)" }
    ],
    entrenar: [
        { titulo: "Mi Gente", artista: "J Balvin", lyrics: "Toda mi gente se mueve..." },
        { titulo: "PRC", artista: "Peso Pluma", lyrics: "Me levanto, un baño y luego me pongo a forjar..." },
        { titulo: "Safaera", artista: "Bad Bunny", lyrics: "Diablo, qué safaera..." },
        { titulo: "Eye of the Tiger", artista: "Survivor", lyrics: "It's the eye of the tiger..." },
        { titulo: "Danza Kuduro", artista: "Don Omar", lyrics: "La mano arriba, cintura sola..." },
        { titulo: "Rompe", artista: "Daddy Yankee", lyrics: "Rompe, rompe, rompe, bien guilla'o..." },
        { titulo: "Bizcochito", artista: "Rosalía", lyrics: "Yo no soy ni voy a ser tu bizcochito..." },
        { titulo: "Tití Me Preguntó", artista: "Bad Bunny", lyrics: "Tití me preguntó si tengo muchas novias..." }
    ],
    amigos: [
        { titulo: "Tití Me Preguntó", artista: "Bad Bunny", lyrics: "Tití me preguntó si tengo muchas novias..." },
        { titulo: "Despechá", artista: "Rosalía", lyrics: "Baby, no me llames, que yo estoy ocupá..." },
        { titulo: "La Bebé Remix", artista: "Yng Lvcas", lyrics: "Quiere que le ponga música para que baile..." },
        { titulo: "17 Años", artista: "Los Ángeles Azules", lyrics: "Amigo sabes acabo de conocer..." },
        { titulo: "Provenza", artista: "Karol G", lyrics: "Baby, ¿qué más? Hace rato que no sé na' de ti..." },
        { titulo: "Un Verano Sin Ti", artista: "Bad Bunny", lyrics: "No sé qué pasó, otro verano sin ti..." },
        { titulo: "Me Porto Bonito", artista: "Bad Bunny", lyrics: "Tú no eres bebecita, tú eres bebesota..." },
        { titulo: "Ojitos Lindos", artista: "Bad Bunny", lyrics: "Y solo mírame con esos ojitos lindos..." }
    ],
    familia: [
        { titulo: "La Chona", artista: "Los Tucanes De Tijuana", lyrics: "Y arriba yo, mi apá y la Chona..." },
        { titulo: "El Niágara en Bicicleta", artista: "Juan Luis Guerra", lyrics: "No me digan que los médicos se fueron..." },
        { titulo: "Querida", artista: "Juan Gabriel", lyrics: "Querida, cada momento de mi vida..." },
        { titulo: "Color Esperanza", artista: "Diego Torres", lyrics: "Saber que se puede, querer que se pueda..." },
        { titulo: "Baila Esta Cumbia", artista: "Selena", lyrics: "Baila, baila esta cumbia..." },
        { titulo: "Hermoso Cariño", artista: "Vicente Fernández", lyrics: "Hermoso cariño, hermoso cariño..." },
        { titulo: "Cielito Lindo", artista: "Mariachi", lyrics: "Ay, ay, ay, ay, canta y no llores..." },
        { titulo: "Caminos de Michoacán", artista: "Federico Villa", lyrics: "Caminos de Michoacán y pueblos que voy pasando..." }
    ],
    fiesta: [
        { titulo: "Ella Baila Sola", artista: "Eslabon Armado", lyrics: "Compa, ¿qué le parece esa morra?..." },
        { titulo: "Gasolina", artista: "Daddy Yankee", lyrics: "A ella le gusta la gasolina..." },
        { titulo: "Pepas", artista: "Farruko", lyrics: "Pepa y agua pa' la seca..." },
        { titulo: "Dile", artista: "Don Omar", lyrics: "Cuéntale, que te conocí bailando..." },
        { titulo: "Suavemente", artista: "Elvis Crespo", lyrics: "Suavemente, bésame..." },
        { titulo: "Me Porto Bonito", artista: "Bad Bunny", lyrics: "Tú no eres bebecita, tú eres bebesota..." },
        { titulo: "Provenza", artista: "Karol G", lyrics: "Baby, ¿qué más? Hace rato que no sé na' de ti..." },
        { titulo: "Mi Gente", artista: "J Balvin", lyrics: "Toda mi gente se mueve..." }
    ]
};

// --- LÓGICA: Recomendador por Vibra ---
const moodSelector = document.getElementById('mood-selector');
const moodTable = document.getElementById('mood-table');
const moodTableBody = document.getElementById('mood-table-body');

moodSelector.addEventListener('change', async (e) => {
    const selectedMood = e.target.value;
    moodTableBody.innerHTML = ''; 

    if (selectedMood === "") {
        moodTable.classList.add('hidden');
        return;
    }

    moodTable.classList.remove('hidden');
    moodTableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #00ffff; padding: 20px;">Buscando tracks... ⏳</td></tr>`;

    const songsToFetch = moodData[selectedMood];

    const songPromises = songsToFetch.map(async (song) => {
        if (song.artista === "Lofi Girl") return { ...song, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" };

        const query = `${song.titulo} ${song.artista}`;
        const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const previewUrl = data.results.length > 0 ? data.results[0].previewUrl : null;
            return { ...song, previewUrl };
        } catch (error) {
            return { ...song, previewUrl: null };
        }
    });

    const allSongs = await Promise.all(songPromises);
    const songsWithAudio = allSongs.filter(song => song.previewUrl !== null).slice(0, 5);

    moodTableBody.innerHTML = '';
    
    songsWithAudio.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${song.titulo}</strong><br><small style="color: #a0a0b8;">${song.artista}</small></td>
            <td class="lyrics-text">"${song.lyrics}"</td>
            <td><audio controls src="${song.previewUrl}"></audio></td>
        `;
        moodTableBody.appendChild(row);
    });
});

// --- LÓGICA: Buscador de Artistas ---
const artistInput = document.getElementById('artist-input');
const searchBtn = document.getElementById('search-btn');
const artistResultsDiv = document.getElementById('artist-results');
const artistErrorDiv = document.getElementById('artist-error');
const loadingMsg = document.getElementById('loading-msg');

const artistNameDisplay = document.getElementById('artist-name-display');
const artistGenreDisplay = document.getElementById('artist-genre-display');
const artistTableBody = document.getElementById('artist-table-body');

searchBtn.addEventListener('click', () => {
    const searchTerm = artistInput.value.trim();
    if (searchTerm === "") return;

    artistResultsDiv.classList.add('hidden');
    artistErrorDiv.classList.add('hidden');
    loadingMsg.classList.remove('hidden');

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=5`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loadingMsg.classList.add('hidden');

            if (data.results && data.results.length > 0) {
                const artistInfo = data.results[0];
                
                artistNameDisplay.textContent = artistInfo.artistName;
                artistGenreDisplay.textContent = `Vibe: ${artistInfo.primaryGenreName}`;

                artistTableBody.innerHTML = '';
                data.results.forEach(song => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${song.trackName}</strong></td>
                        <td><audio controls src="${song.previewUrl}"></audio></td>
                    `;
                    artistTableBody.appendChild(row);
                });

                artistResultsDiv.classList.remove('hidden');
            } else {
                artistErrorDiv.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error("Error al buscar el artista:", error);
            loadingMsg.classList.add('hidden');
            artistErrorDiv.classList.remove('hidden');
            artistErrorDiv.textContent = "Error de conexión. Intenta de nuevo. 📡";
        });
});