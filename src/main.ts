type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

type nationalites = 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese';

type Actress = Person & {
  most_famous_movies: string | string | string;
  awards: string;
  nationality: nationalites;
}

function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    "death_year" in data && 
    typeof data.death_year === "number" &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "most_famous_movies" in data &&
    typeof data.most_famous_movies === "string" &&
    "awards" in data &&
    typeof data.awards === "string" &&
    "nationality" in data &&
    typeof data.nationality === "string"
  ) {
    return true;
  }
  return false;
}

async function getActress(id: number) {
  try {
    const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:${id}`);
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
    };
    const data: unknown = await res.json();
    if (!isActress(data)) {
      throw new Error('Formato dati non valido!')
    }
    const Actress: object | null = {
      id: data.id,
      name: data.name,
      birth_year: data.birth_year,
      death_year: data.death_year,
      biography: data.biography,
      image: data.image,
      most_famous_movies: data.most_famous_movies,
      awards: data.awards,
      nationality: data.nationality,
    }
    return Actress
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return null;
  }
}