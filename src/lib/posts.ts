import capaMundial2026 from "@/assets/blog/capa-mundial-2026.png.asset.json";
import capaPaoDeAcucar from "@/assets/blog/pao-de-acucar-rio.png.asset.json";
import capaCadernoPassaros from "@/assets/blog/caderno-passaros.png.asset.json";
import capaLanternas from "@/assets/blog/lanternas-japonesas.png.asset.json";
import capaViajarObservarDesenhar from "@/assets/blog/viajar-observar-desenhar.png.asset.json";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover?: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "em-breve-1",
    title: "Sketches - Mundial FIFA 2026",
    excerpt:
      "Um espaço reservado para a primeira reflexão — sobre o gesto inicial da aquarela, a escolha do papel e a luz que orienta o traço.\nA jornada da seleção porteña a partir dos meus traços e registros urbanos. ",
    category: "AQUARELA",
    date: "Em breve",
    readingTime: "5 min",
    cover: capaMundial2026.url,
    body: "A jornada da seleção porteña a partir dos meus traços e registros urbanos.\n\nCada partida vira uma página: as mesas na calçada, as camisas listradas, as bandeirinhas balançando e o barulho que atravessa o quarteirão. Desenhar durante um mundial é registrar menos o jogo e mais o que ele provoca nas ruas.\n\nO caderno acompanha tudo: pincel, um pouco de água e a paciência de esperar a cena acontecer.",
  },
  {
    slug: "em-breve-2",
    title: "O Rio de Janeiro e suas paisagens urbanas",
    excerpt:
      "Aqui caberão notas sobre urban sketching: cadernos, ferramentas e a prática de desenhar a cidade em movimento.",
    category: "URBAN SKETCH",
    date: "Em breve",
    readingTime: "4 min",
    cover: capaPaoDeAcucar.url,
    body: "Desenhar o Rio é aceitar que a paisagem não fica quieta.\n\nA luz muda a cada meia hora, o mar muda de cor, e o Pão de Açúcar aparece e desaparece atrás das árvores conforme você caminha. O desenho feito ali é um recorte de tempo, não de lugar.\n\nCaderno aberto, aquarela em pastilhas e a vontade de ficar mais um pouco: é isso que sobra depois que a página seca.",
  },
  {
    slug: "em-breve-3",
    title: "A arte de criar um caderno de desenho para outro artista",
    excerpt:
      "Espaço para o processo de encadernação artesanal — costura, capa em couro e a anatomia de um caderno feito à mão.",
    category: "ENCADERNAÇÃO",
    date: "Em breve",
    readingTime: "6 min",
    cover: capaCadernoPassaros.url,
    body: "Fazer um caderno para outro artista é um exercício de escuta.\n\nQue papel ele usa? Aquarela pesada ou traço seco? O caderno abre totalmente na mesa? Cabe na mochila? Cada resposta muda a costura, a gramatura e o formato.\n\nDepois vem a parte silenciosa: dobrar os cadernos, furar, costurar ponto a ponto, montar a capa. E entregar sabendo que as páginas em branco vão virar outra coisa completamente.",
  },
  {
    slug: "em-breve-4",
    title: "Quadras e Super Quadras",
    excerpt:
      "Reservado para ensaios em filme 35mm: silêncios, becos e a paciência do analógico.",
    category: "FOTOGRAFIA",
    date: "Em breve",
    readingTime: "3 min",
    cover: capaLanternas.url,
    body: "Brasília tem um ritmo próprio: blocos, pilotis, árvores altas e um céu que ocupa metade do enquadramento.\n\nFotografar as super quadras em filme 35mm é aceitar a lentidão — poucas fotos, muita espera pela luz certa. O analógico obriga a olhar antes de apertar o botão.\n\nO que aparece depois da revelação quase nunca é a arquitetura sozinha: é a vida que passa por dentro dela.",
  },
  {
    slug: "viajar-observar-desenhar",
    title: "Viajar, observar e desenhar",
    excerpt:
      "O perfil de viajante do artista é imergir na cidade. Ser observador do tempo e espaço sem pressa ou roteiro pré-estabelecido. Tudo encanta. Tudo é arte.",
    category: "URBAN SKETCHER",
    date: "Em breve",
    readingTime: "5 min",
    cover: capaViajarObservarDesenhar.url,
    body: "Depois que entrei para a comunidade Urban Sketcher em 2018, enfim, eu encontrei o meu perfil de viajante.\n\nO que eu gosto, ao viajar, é de imergir no cotidiano da cidade a qual viajo. É ser uma observadora do tempo das pessoas que ali vivem e sobrevivem. É descobrir os lados bons e ruins. Ouvir os barulhos da cidade. Sentir como o tempo passa naquele espaço.\n\nE claro, registrar um pouco disso com meus desenhos.\n\nÉ um roteiro sem roteiro.\nSem pressa.\nApenas material de arte na mochila e disposição para estar presente no local.\n\nAo fazer isso, as minhas lembranças não tem nada a ver com os roteiros turísticos ou instagramáveis da maioria das pessoas.\n\nE nessas imersões, eu acabo percebendo as mudanças arquitetônicas nos lugares da qual visito com uma certa frequência e da qual tenha registrado anteriormente.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
