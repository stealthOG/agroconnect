/* Sendbox tracking API — activates when SENDBOX_API_KEY is set */

export interface TrackingEvent {
  status:      string;
  description: string;
  location:    string;
  timestamp:   string;
}

export interface TrackingResult {
  carrier:       string;
  trackingCode:  string;
  status:        string;
  estimatedDate: string | null;
  events:        TrackingEvent[];
  devMode:       boolean;
}

const CARRIERS: Record<string, string> = {
  sendbox: 'Sendbox',
  gig:     'GIG Logistics',
  dhl:     'DHL Nigeria',
  kwik:    'Kwik Delivery',
  other:   'Other Carrier',
};

export function carrierLabel(carrier: string): string {
  return CARRIERS[carrier.toLowerCase()] ?? carrier;
}

export async function getTracking(
  carrier: string,
  trackingCode: string,
): Promise<TrackingResult> {
  const apiKey = process.env['SENDBOX_API_KEY'];

  if (apiKey && carrier.toLowerCase() === 'sendbox') {
    return fetchSendbox(trackingCode, apiKey);
  }

  /* Dev/unsupported carrier — return stored data stub */
  return {
    carrier:       carrierLabel(carrier),
    trackingCode,
    status:        'in_transit',
    estimatedDate: null,
    devMode:       true,
    events: [
      { status: 'picked_up',   description: 'Package picked up by carrier',  location: 'Origin Hub',    timestamp: new Date(Date.now() - 86_400_000 * 2).toISOString() },
      { status: 'in_transit',  description: 'In transit to delivery hub',    location: 'En Route',      timestamp: new Date(Date.now() - 86_400_000).toISOString()     },
    ],
  };
}

async function fetchSendbox(trackingCode: string, apiKey: string): Promise<TrackingResult> {
  const res = await fetch(`https://api.sendbox.co/tracking/${encodeURIComponent(trackingCode)}`, {
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error(`Sendbox API error: ${res.status}`);
  const json = await res.json() as Record<string, unknown>;

  const events: TrackingEvent[] = ((json['events'] as unknown[]) ?? []).map(e => {
    const ev = e as Record<string, unknown>;
    return {
      status:      String(ev['status']      ?? ''),
      description: String(ev['description'] ?? ''),
      location:    String(ev['location']    ?? ''),
      timestamp:   String(ev['timestamp']   ?? ''),
    };
  });

  return {
    carrier:       'Sendbox',
    trackingCode,
    status:        String(json['status'] ?? 'unknown'),
    estimatedDate: (json['estimated_delivery'] as string | null) ?? null,
    devMode:       false,
    events,
  };
}
