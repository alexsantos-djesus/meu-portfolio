"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Weather = { temp: number; wind: number; time: string };
type Place = {
  name: string;
  country?: string;
  admin1?: string;
  lat: number;
  lon: number;
};

export default function WeatherDemo() {
  const [place, setPlace] = useState<Place>({
    name: "Salvador",
    lat: -12.97,
    lon: -38.51,
    country: "BR",
  });
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  // busca livre
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);

  // presets rápidos
  const presets: Place[] = [
    { name: "Salvador", lat: -12.97, lon: -38.51, country: "BR" },
    { name: "São Paulo", lat: -23.55, lon: -46.63, country: "BR" },
    { name: "Rio de Janeiro", lat: -22.91, lon: -43.17, country: "BR" },
  ];

  async function loadWeather(p: Place) {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,wind_speed_10m`;
      const res = await fetch(url);
      const json = await res.json();
      setData({
        temp: json?.current?.temperature_2m ?? 0,
        wind: json?.current?.wind_speed_10m ?? 0,
        time: json?.current?.time ?? "",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(place);
  }, [place]);

  async function searchPlaces(e?: React.FormEvent) {
    e?.preventDefault();
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=5&language=pt&format=json`;
      const r = await fetch(url);
      const j = await r.json();
      const out: Place[] = (j?.results ?? []).map((it: any) => ({
        name: it.name,
        country: it.country_code,
        admin1: it.admin1,
        lat: it.latitude,
        lon: it.longitude,
      }));
      setResults(out);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Busca por região */}
      <form onSubmit={searchPlaces} className="flex gap-2">
        <Input
          placeholder="Pesquisar cidade/região (ex.: Salvador, Lisboa)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type="submit" variant="outline" disabled={searching}>
          {searching ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {/* Resultados da busca */}
      {results.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2">
          {results.map((p) => (
            <li key={`${p.name}-${p.lat}-${p.lon}`}>
              <button
                onClick={() => {
                  setPlace(p);
                  setResults([]);
                  setQ("");
                }}
                className="w-full text-left text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-zinc-400">
                  {" "}
                  {p.admin1 ? `— ${p.admin1}` : ""}
                  {p.country ? `, ${p.country}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((c) => (
          <button
            key={c.name}
            onClick={() => setPlace(c)}
            className={`text-xs px-3 py-1 rounded-xl border transition ${
              c.name === place.name
                ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                : "border-white/10 text-zinc-300 hover:bg-white/5"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Painel */}
      <div className="glass rounded-2xl p-4">
        {loading && <p className="text-sm text-zinc-400">Carregando…</p>}
        {!loading && data && (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">{place.name}</div>
              <div className="text-sm text-zinc-400">
                {new Date(data.time).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-neon-cyan">
                {Math.round(data.temp)}°C
              </div>
              <div className="text-sm text-zinc-400">
                Vento {Math.round(data.wind)} km/h
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé fixo do card */}
      <div className="mt-auto pt-3">
        <a
          href="https://github.com/alexsantos-djesus/clima-e-tempo"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline">Ver repositório</Button>
        </a>
      </div>
    </div>
  );
}
