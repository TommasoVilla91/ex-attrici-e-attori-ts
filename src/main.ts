type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

type nationality = 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese';

type Actress = Person & {
  most_famous_movies: [string | string | string];
  awards: string;
  nationality: nationality;
};

type Actor = Person & {
  known_for: [string | string | string];
  awards: [string] | [string, string];
  nationality: nationality & ['Scottish', 'New Zealand', 'Hong Kong', 'German', 'Canadian', 'Irish'];
}

function isActress(data: unknown): data is Actress {
  const nationalityList: string[] = ['American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese'];

  if (
    data &&
    typeof data === "object" && data !== null &&
    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    "death_year" in data && typeof data.death_year === "number" &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(m => typeof m === "string") &&
    "awards" in data && typeof data.awards === "string" &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    nationalityList.includes(data.nationality)
  ) {
    return true;
  };
  return false;
};

function isActor(data: unknown): data is Actor {
  const nationalityList: string[] = ['American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese', 'Scottish', 'New Zealand', 'Hong Kong', 'German', 'Canadian', 'Irish'];

  if (
    data &&
    typeof data === "object" && data !== null &&
    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    "death_year" in data && typeof data.death_year === "number" &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "known_for" in data &&
    Array.isArray(data.known_for) &&
    data.known_for.length === 3 &&
    data.known_for.every(m => typeof m === "string") &&
    "awards" in data && 
    Array.isArray(data.awards) &&
    data.awards.length <= 2 &&
    data.awards.every(m => typeof m === "string") &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    nationalityList.includes(data.nationality)
  ) {
    return true;
  };
  return false;
};

async function getActress(id: number): Promise<Actress | null> {
  try {
    const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:${id}`);
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
    };
    const data: unknown = await res.json();
    if (!isActress(data)) {
      throw new Error('Formato dati non valido!');
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Impossibile recuperare l'attrice", error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return null;
  };
};

async function getActor(id: number): Promise<Actor | null> {
  try {
    const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actors/:${id}`);
    if(!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
    };
    const data: unknown = res.json();
    if(!isActor(data)) {
      throw new Error('Formato dati non valido!');
    };
    return data;
  } catch (error) {
    if(error instanceof Error) {
      console.error("Impossibile recuperare l'attore", error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return null;
  };
};

async function getAllActresses(): Promise<Actress[]> {
  try {
    const res = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/actresses");
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
    }
    const data: unknown = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('Formato dati non valido!');
    } else {
      const validActresses: Actress[] = data.filter(a => isActress(a));
      return validActresses;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Impossibile recuperare le attrici", error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return [];
  };
};

async function getAllActors(): Promise<Actor[]> {
  try {
    const res = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/actors");
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
    };
    const data: unknown = res.json();
    if(!Array.isArray(data)) {
      throw new Error('Formato dati non valido!');
    };
    const validActors: Actor[] = data.filter(a => isActor(a));
    return validActors;
  } catch (error) {
    if(error instanceof Error) {
      console.error("Impossibile recuperare gli attori", error.message);
    } else {
      console.error('Errore sconosciuto');
    };
    return [];
  };
};

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id));
    return await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Impossibile recuperare le attrici", error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return [];
  };
};

async function getActors(ids: number[]): Promise<(Actor | null)[]> {
  try {
    const promises = ids.map(id => getActor(id));
    return await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Impossibile recuperare le attrici", error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    return [];
  };
};

function generateId(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createActress(data: Omit<Actress, "id">): Actress {
  return {
    id: generateId(1, 100),
    ...data
  };
};

function createActor(data: Omit<Actor, "id">): Actor {
  return {
    id: generateId(1, 100),
    ...data
  };
};

type EditableActress = Omit<Actress, "id" | "name">;
type EditableActor = Omit<Actor, "id" | "name">;

function updateActress(actress: Actress, updates: Partial<EditableActress>): Actress {
  return {...actress, ...updates};
};

function updateActor(actor: Actor, updates: Partial<EditableActor>): Actor {
  return {...actor, ...updates};
};

