import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: "es", flag: "🇪🇸", name: "Español" },
        { code: "ca", flag: "🇪🇦", name: "Català" }, // Bandera de Cataluña aproximada
        { code: "en", flag: "🇬🇧", name: "English" },
        { code: "fr", flag: "🇫🇷", name: "Français" },
    ];

    return (
        <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-earth-brown/80 text-black px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-earth-green text-sm font-medium"
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                </option>
            ))}
        </select>
    );
}