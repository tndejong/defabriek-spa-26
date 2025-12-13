# De Fabriek - Skatepark Website

Een moderne, professionele website voor De Fabriek skatepark in Utrecht. Gebouwd met React, TypeScript, Tailwind CSS en shadcn/ui componenten.

## 🚀 Kenmerken

- **Single Page Application (SPA)** met vloeiende sectie navigatie
- **Meertalig** ondersteuning (Nederlands, Engels, Duits)
- **Moderne glazen UI** met professionele styling
- **Volledig responsive** design
- **Toegankelijke componenten** met shadcn/ui
- **Vloeiende animaties** met Framer Motion
- **Lokale development** met DDEV

## 🛠️ Technologieën

- **Frontend Framework**: React 18 met TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS met shadcn/ui componenten
- **Animaties**: Framer Motion
- **Icons**: Lucide React
- **Development**: DDEV voor lokale containerized development

## 📁 Project Structuur

```
src/
├── components/
│   ├── ui/                    # shadcn/ui componenten
│   ├── sections/             # Pagina secties
│   ├── Navigation.tsx        # Hoofdnavigatie
│   ├── Hero.tsx             # Hero sectie
│   └── Footer.tsx           # Footer
├── lib/
│   └── utils.ts             # Utility functies
└── App.tsx                  # Hoofd applicatie
```

## 🚀 Aan de slag

### Vereisten

- Docker & Docker Compose (voor DDEV)
- Node.js 18+ (voor development buiten DDEV)
- DDEV (https://ddev.com/get-started/)

### Lokale Development met DDEV

1. **DDEV starten**:
   ```bash
   cd /path/to/de-fabriek-26
   ddev start
   ```

2. **Dependencies installeren**:
   ```bash
   ddev npm install
   ```

3. **Development server starten**:
   ```bash
   ddev npm run dev
   ```

4. **Website openen**:
   - DDEV geeft automatisch de URL weer (meestal `https://de-fabriek-26.ddev.site`)
   - Of gebruik: `ddev describe` voor alle URLs

### Alternatieve Development (zonder DDEV)

1. **Dependencies installeren**:
   ```bash
   npm install
   ```

2. **Development server starten**:
   ```bash
   npm run dev
   ```

3. **Website openen**:
   - Open `http://localhost:5173` in je browser

## 📦 Build voor Productie

```bash
# Met DDEV
ddev npm run build

# Of zonder DDEV
npm run build
```

De gebuilde bestanden staan in de `dist/` map.

## 🎨 Design Systeem

### Kleuren
- **Primary**: Blauwe tinten voor branding
- **Secondary**: Neutrale grijstinten voor balans
- **Accent**: Rode accenten voor belangrijke elementen

### Typography
- **Font Family**: Inter (professioneel en modern)
- **Heading**: 4xl-8xl voor hiërarchie
- **Body**: Basis grootte met goede leesbaarheid

### Componenten
- **shadcn/ui**: Voor consistente, toegankelijke UI componenten
- **Glass Effect**: Subtiele transparantie voor moderne look
- **Hover Effecten**: Vloeiende animaties voor interactiviteit

## 🌐 Meertalige Ondersteuning

De website ondersteunt drie talen:
- **Nederlands (nl)**: Standaard taal
- **English (en)**: Voor internationale bezoekers
- **Deutsch (de)**: Voor Duitse bezoekers

Taal wisselen via de navigatiebalk rechtsboven.

## 📱 Responsive Design

- **Mobile First**: Geoptimaliseerd voor mobiele apparaten
- **Tablet**: Aangepaste layouts voor tablets
- **Desktop**: Volledige ervaring op grote schermen

## 🧪 Testing

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📄 Pagina Secties

1. **Hero** - Aantrekkelijke introductie met call-to-action
2. **Park** - Informatie over het skatepark en faciliteiten
3. **Kosten** - Prijzen en lidmaatschapsopties
4. **Open** - Openingstijden en locatie informatie
5. **Verhaal** - Geschiedenis en verhaal van De Fabriek
6. **Lessen** - Skateboard lessen voor alle niveaus
7. **Team** - Ons team en instructeurs
8. **Contact** - Contact formulier en informatie

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je wijzigingen (`git commit -m 'Add amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is eigendom van De Fabriek skatepark.

## 📞 Contact

**De Fabriek Skatepark**
- Email: info@defabriek.org
- Telefoon: +31 (0) 123 456 789
- Locatie: Utrecht, Nederland

---

*Gebouwd met ❤️ voor de Utrechtse skate community*

