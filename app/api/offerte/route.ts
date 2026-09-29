import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { formulier, site } from "@/lib/data";

/* Mailverzending via Strato-SMTP (instellingen in .env.local: SMTP_USER,
   SMTP_PASS, optioneel SMTP_HOST/SMTP_PORT/MAIL_FROM). De site draait op
   een eigen VPS met volwaardige Node.js-runtime, dus een rechtstreekse
   SMTP-verbinding (nodemailer) werkt hier prima. Versturen via Strato
   zorgt er bovendien voor dat SPF/DMARC van het domein kloppen. */

type Aanvraag = {
  naam?: string;
  email?: string;
  telefoon?: string;
  typeKlus?: string;
  bericht?: string;
  _honey?: string;
};

function escapeHtml(waarde: string): string {
  return waarde
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Mailclients laden geen externe CSS en negeren flex/grid — daarom
   hier bewust een tabel-layout met inline styles (max. compatibel,
   ook in Outlook). Kleuren volgen de monochrome huisstijl. */
function bouwHtmlMail({
  naam,
  email,
  telefoon,
  typeKlus,
  bericht,
}: Required<Omit<Aanvraag, "_honey">>) {
  const rij = (label: string, waarde: string) => `
    <tr>
      <td style="padding:10px 0;border-top:1px solid #e6e3dd;width:130px;vertical-align:top;
                  font-size:13px;font-weight:600;color:#565c66;">${label}</td>
      <td style="padding:10px 0;border-top:1px solid #e6e3dd;vertical-align:top;
                  font-size:14px;color:#1a1a1a;">${waarde}</td>
    </tr>`;

  return `<!doctype html>
<html lang="nl">
  <body style="margin:0;padding:0;background-color:#f6f5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f5f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e3dd;">

            <!-- Header met logo -->
            <tr>
              <td style="padding:28px 32px 20px;text-align:center;border-bottom:1px solid #e6e3dd;">
                <img src="${site.url}/icon.png" width="40" height="40" alt="Bouw MAN"
                     style="display:block;margin:0 auto 12px;border-radius:8px;" />
                <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:.15em;
                          text-transform:uppercase;color:#565c66;">Nieuwe offerteaanvraag</p>
              </td>
            </tr>

            <!-- Type klus als opvallende badge -->
            <tr>
              <td style="padding:24px 32px 8px;">
                <span style="display:inline-block;background-color:#1a1a1a;color:#ffffff;
                             font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;">
                  ${escapeHtml(typeKlus)}
                </span>
              </td>
            </tr>

            <!-- Gegevens -->
            <tr>
              <td style="padding:8px 32px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rij("Naam", escapeHtml(naam))}
                  ${rij("E-mailadres", `<a href="mailto:${escapeHtml(email)}" style="color:#1a1a1a;">${escapeHtml(email)}</a>`)}
                  ${rij("Telefoon", telefoon ? `<a href="tel:${escapeHtml(telefoon)}" style="color:#1a1a1a;">${escapeHtml(telefoon)}</a>` : "—")}
                </table>
              </td>
            </tr>

            <!-- Bericht -->
            <tr>
              <td style="padding:20px 32px 32px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#565c66;">Bericht</p>
                <div style="background-color:#f6f5f2;border-radius:12px;padding:16px;
                            font-size:14px;line-height:1.6;color:#1a1a1a;white-space:pre-line;">${
                              bericht ? escapeHtml(bericht) : "—"
                            }</div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 32px 28px;border-top:1px solid #e6e3dd;">
                <p style="margin:0;font-size:12px;color:#565c66;">
                  Verzonden via het offerteformulier op
                  <a href="${site.url}" style="color:#565c66;">${site.url.replace("https://", "")}</a>.
                  Antwoorden op deze e-mail gaat rechtstreeks naar de klant.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let data: Aanvraag;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ fout: "Ongeldige aanvraag." }, { status: 400 });
  }

  // Honeypot: ingevuld = bot. Doe alsof het gelukt is.
  if (data._honey) {
    return NextResponse.json({ ok: true });
  }

  const naam = (data.naam ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const telefoon = (data.telefoon ?? "").trim().slice(0, 50);
  const typeKlus = (data.typeKlus ?? "").trim().slice(0, 100);
  const bericht = (data.bericht ?? "").trim().slice(0, 5000);

  if (
    naam.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
    !typeKlus
  ) {
    return NextResponse.json(
      { fout: "Vul naam, e-mailadres en type klus in." },
      { status: 400 },
    );
  }

  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, MAIL_FROM } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("offerte: SMTP_USER of SMTP_PASS ontbreekt in .env.local");
    return NextResponse.json(
      { fout: "Mailverzending is nog niet geconfigureerd." },
      { status: 503 },
    );
  }

  /* Strato: smtp.strato.com, poort 465 (SSL/TLS), inloggen met het
     volledige e-mailadres. Afzender moet het eigen adres zijn, anders
     weigert Strato de mail; het adres van de klant staat in replyTo. */
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.strato.com",
    port: Number(SMTP_PORT) || 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: MAIL_FROM || `"Bouw MAN website" <${SMTP_USER}>`,
      to: [...formulier.ontvangers],
      replyTo: email,
      subject: `Nieuwe aanvraag via de website — ${typeKlus}`,
      text: [
        `Naam:          ${naam}`,
        `E-mailadres:   ${email}`,
        `Telefoon:      ${telefoon || "—"}`,
        `Type klus:     ${typeKlus}`,
        ``,
        `Bericht:`,
        bericht || "—",
      ].join("\n"),
      html: bouwHtmlMail({ naam, email, telefoon, typeKlus, bericht }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("offerte: verzenden mislukt", err);
    return NextResponse.json(
      { fout: "Verzenden is niet gelukt." },
      { status: 502 },
    );
  }
}
