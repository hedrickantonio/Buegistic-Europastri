const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type LoadPayload = {
  load_id: string;
  matricula?: string;
  nombre?: string;
  dni?: string;
  carrier_name?: string;
};

export async function createLoad(payload: LoadPayload) {
  const res = await fetch(`${API_URL}/api/loads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function getLoads() {
  const res = await fetch(`${API_URL}/api/loads`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
