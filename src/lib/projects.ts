import img01 from "@/assets/aquarelauto/Image_20260514_00012.jpg.asset.json";
import img02 from "@/assets/aquarelauto/Image_20260514_0022.jpg.asset.json";
import img03 from "@/assets/aquarelauto/Image_20260514_0023.jpg.asset.json";
import img04 from "@/assets/aquarelauto/Image_20260514_0024.jpg.asset.json";
import img05 from "@/assets/aquarelauto/Image_20260514_0028.jpg.asset.json";
import img06 from "@/assets/aquarelauto/Image_20260514_0029.jpg.asset.json";
import img07 from "@/assets/aquarelauto/Image_20260514_0030.jpg.asset.json";
import img08 from "@/assets/aquarelauto/Image_20260514_0031.jpg.asset.json";
import img09 from "@/assets/aquarelauto/Image_20260522_0003.jpg.asset.json";
import img10 from "@/assets/aquarelauto/Image_20260522_0003.jpg.asset.json";
import us14 from "@/assets/urban-sketcher/us-14.png.asset.json";
import us15 from "@/assets/urban-sketcher/us-15-praca-civica-goiania.jpg.asset.json";
import us16 from "@/assets/urban-sketcher/us-16.png.asset.json";
import us17 from "@/assets/urban-sketcher/us-17.png.asset.json";
import us18 from "@/assets/urban-sketcher/us-18.png.asset.json";
import us19 from "@/assets/urban-sketcher/us-19.png.asset.json";
import us20 from "@/assets/urban-sketcher/us-20.png.asset.json";
import us21 from "@/assets/urban-sketcher/us-21.png.asset.json";
import us22 from "@/assets/urban-sketcher/us-22.png.asset.json";
import us23 from "@/assets/urban-sketcher/us-23-camara-curitiba.jpg.asset.json";

export type Work = {
  title: string;
  technique: string;
  dimensions: string;
  year: string;
  /** Caminho/URL da imagem da obra. Quando vazio, exibe placeholder numerado. */
  image?: string;
  /** Texto alternativo da imagem (acessibilidade). */
  imageAlt?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: string;
  year: string;
  works: Work[];
};

// Default placeholder for any unfilled slot
const placeholderWorks = (count: number, defaultYear: string): Work[] =>
  Array.from({ length: count }, (_, i) => ({
    title: `Sem título nº ${i + 1}`,
    technique: "Aquarela sobre papel de algodão",
    dimensions: "30 × 40 cm",
    year: defaultYear,
    image: "",
    imageAlt: "",
  }));


const aquarelautoWorks: Work[] = [
  {
    title: "Senna, Mclaren\u00a0McLaren MP4/6\u00a0",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "30 × 42 cm",
    year: "2026",
    image: img01.url,
    imageAlt: "Equipe celebrando vitória de Ayrton Senna com bandeira do Brasil sobre a McLaren Marlboro.",
  },
  {
    title: "Damon Hill, Hungria - Williams FW 15C 1993\u00a0",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "1993",
    image: img02.url,
    imageAlt: "Comissário acena bandeira quadriculada para carro de Damon Hill cruzando a linha de chegada em Hungaroring.",
  },
  {
    title: "Mario Andretti, Fuji",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "1976",
    image: img03.url,
    imageAlt: "Lotus preta de Mario Andretti contornando o circuito de Fuji em 1976.",
  },
  {
    title: "Juan Manuel Fangio, Silverstone",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "1954",
    image: img04.url,
    imageAlt: "Mercedes-Benz W196 prateada de Juan Manuel Fangio em Silverstone, 1954.",
  },
  {
    title: "Alessandro Zanardi,\u00a0Chip Ganassi Racing 1998",
    technique: "Aquarela sobre papel de algodão",
    dimensions: "21 × 30 cm",
    year: "2026",
    image: img05.url,
    imageAlt: "Ferrari de Fórmula 1 em vermelho e amarelo cercada por respingos de cor.",
  },
  {
    title: "Gil de Ferran , Peske Reynard 001 - 2001\u00a0",
    technique: "Aquarela e grafite sobre papel",
    dimensions: "21 × 30 cm",
    year: "1993",
    image: img06.url,
    imageAlt: "McLaren MP4/8 vista de frente, com vermelho Marlboro e detalhes a grafite.",
  },
  {
    title: "Trintignant, Ferrari 625",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "1955",
    image: img07.url,
    imageAlt: "Ferrari 625 vermelha de Maurice Trintignant nas curvas de pedra de Monte Carlo, 1955.",
  },
  {
    title: "Senna, Lotus 98T",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "1986",
    image: img08.url,
    imageAlt: "Lotus 98T preta e dourada de Ayrton Senna passando pela tribuna em 1986.",
  },
  {
    title: "Ferrari, era Schumacher",
    technique: "Aquarela sobre papel de algodão",
    dimensions: "30 × 42 cm",
    year: "2026",
    image: img09.url,
    imageAlt: "Ferrari vermelha de Fórmula 1 sobre traçado verde, com respingos azuis e vermelhos.",
  },
  {
    title: "Sem título nº 10",
    technique: "Aquarela sobre papel de algodão",
    dimensions: "30 × 40 cm",
    year: "2026",
  },
];

const urbanSketcherWorks: Work[] = [
  {
    title: "Teatro Nacional Cláudio Santoro - Brasília",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "15 × 21 cm",
    year: "2025",
    image: us14.url,
    imageAlt: "Aquarela do Teatro Nacional Cláudio Santoro segurada em frente ao Eixo Monumental de Brasília.",
  },
  {
    title: "Praça Cívica, Goiânia\u00a0",
    technique: "Grafite sobre papel",
    dimensions: "21 × 30 cm",
    year: "2018",
    image: us15.url,
    imageAlt: "Caderno com esboço a grafite da Praça Cívica de Goiânia segurado diante da praça real, com o Palácio Pedro Ludovico ao fundo.",
  },
  {
    title: "Sobrados e prédios, Curitiba",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "2024",
    image: us16.url,
    imageAlt: "Caderno com aquarela de casas e prédios avermelhados em Curitiba, segurado diante da cena real.",
  },
  {
    title: "Casarão amarelo, esquina do centro, Curitiba",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "2024",
    image: us17.url,
    imageAlt: "Aquarela de casarão histórico amarelo em esquina movimentada, com o prédio real ao fundo.",
  },
  {
    title: "Praça do Relógio, Taguatinga/DF",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm",
    year: "2024",
    image: us18.url,
    imageAlt: "Caderno aberto com aquarela da torre do relógio de Taguatinga diante da praça real.",
  },
  {
    title: "Elevador Lacerda, Salvador",
    technique: "Aquarela sobre papel de algodão",
    dimensions: "15 × 21 cm",
    year: "2023",
    image: us19.url,
    imageAlt: "Aquarela da Baía de Todos-os-Santos e do Elevador Lacerda com o mar real ao fundo.",
  },
  {
    title: "Setor Hospitalar Sul, Brasília",
    technique: "Aquarela e nanquim sobre papel kraft",
    dimensions: "21 × 30 cm",
    year: "2025",
    image: us20.url,
    imageAlt: "Aquarela sobre papel kraft de edifícios do Setor Hospitalar Sul de Brasília.",
  },
  {
    title: "Senhor do Bonfim, Bahia",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "21 × 30 cm (dupla)",
    year: "2023",
    image: us21.url,
    imageAlt: "Aquarela em dupla página com multidão diante da Igreja do Senhor do Bonfim, em Salvador.",
  },
  {
    title: "Skate no Setor Bancário Sul, Brasília",
    technique: "Aquarela e nanquim sobre papel",
    dimensions: "15 × 21 cm",
    year: "2025",
    image: us22.url,
    imageAlt: "Caderno com aquarela de jovens andando de skate diante de edifício modernista em Brasília.",
  },
  {
    title: "Ateliê na rua\u00a0",
    technique: "Aquarela sobre papel",
    dimensions: "21 × 30 cm",
    year: "2024",
    image: us23.url,
    imageAlt: "Caderno de aquarela sobre calçada de pedras portuguesas, ao lado de estojo de tintas, com desenho de fachada rosa e carros.",
  },
];

export const projects: Project[] = [
  {
    slug: "aquarelauto",
    number: "01",
    title: "Aquarelauto",
    tagline: "Aquarela em movimento",
    description:
      "Série dedicada a registrar automóveis clássicos e contemporâneos em aquarela, explorando luz, reflexos e a memória afetiva sobre rodas.",
    longDescription:
      "Aquarelauto reúne estudos de carrocerias, faróis e reflexos pintados em aquarela sobre papel de algodão. Cada peça nasce da observação de encontros de colecionadores, garagens e ruas, transformando o objeto industrial em retrato afetivo.",
    status: "Em curso",
    year: "2025—",
    works: aquarelautoWorks,
  },
  {
    slug: "urban-sketcher",
    number: "02",
    title: "Urban Sketcher",
    tagline: "A cidade desenhada in loco",
    description:
      "Registros urbanos feitos a céu aberto: praças, ruas, fachadas e cenas cotidianas capturadas com caneta e aquarela direto no caderno.",
    longDescription:
      "Projeto contínuo de desenho urbano realizado em campo, com caneta nanquim e aquarela. Reúne arquitetura, pessoas e atmosferas de cidades brasileiras e estrangeiras, organizado por cadernos e encontros do Urban Sketchers.",
    status: "Contínuo",
    year: "2023—",
    works: urbanSketcherWorks,
  },
  {
    slug: "ad-astra",
    number: "03",
    title: "Ad Astra",
    tagline: "Em direção às estrelas",
    description:
      "Projeto pessoal que investiga o céu noturno, constelações e o imaginário cósmico através de aquarelas em fundos profundos.",
    longDescription:
      "Ad Astra explora a relação entre o gesto da aquarela e a vastidão do cosmos. As peças combinam técnicas de molhado-sobre-molhado, salpicos e veladuras para construir nebulosas, constelações e horizontes noturnos.",
    status: "Em desenvolvimento",
    year: "2026",
    works: placeholderWorks(10, "2026"),
  },
  {
    slug: "cronicas",
    number: "04",
    title: "Crônicas",
    tagline: "Pequenas histórias ilustradas",
    description:
      "Coletânea de cenas, personagens e instantes do dia a dia narrados em texto curto e ilustração — uma crônica visual semanal.",
    longDescription:
      "Crônicas é um diário ilustrado publicado semanalmente. Cada edição combina um texto breve com uma ilustração em aquarela ou nanquim, registrando observações sobre cidade, afetos, leituras e travessias cotidianas.",
    status: "Publicação semanal",
    year: "2025—",
    works: placeholderWorks(10, "2025"),
  },
  {
    slug: "caderno-de-viagem",
    number: "05",
    title: "Caderno de Viagem",
    tagline: "Registros de quem passa",
    description:
      "Cadernos artesanais preenchidos durante viagens, reunindo aquarelas, anotações, bilhetes e memórias dos lugares visitados.",
    longDescription:
      "Cada Caderno de Viagem é um objeto único, encadernado à mão, preenchido em rota com aquarelas, croquis, anotações e colagens. Os cadernos funcionam como mapa afetivo dos lugares visitados e das pessoas encontradas.",
    status: "Em curso",
    year: "2024—",
    works: placeholderWorks(10, "2024"),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
