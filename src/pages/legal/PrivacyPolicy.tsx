import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-earth-light py-24">
            <div className="max-w-4xl mx-auto px-6 bg-white rounded-3xl shadow-xl p-12">
                <h1 className="text-4xl font-black text-earth-dark mb-8">Política de Privacidad</h1>

                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        En <strong>Gravel Empordà 360º</strong>, valoramos su privacidad y estamos comprometidos con la protección de sus datos personales. Esta política explica cómo recopilamos y tratamos sus datos de acuerdo con el Reglamento General de Protección de Datos (RGPD).
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">1. Datos que recopilamos</h2>
                    <p>
                        Recopilamos información necesaria para la gestión de su reserva, incluyendo:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Datos de contacto (nombre, email, teléfono).</li>
                        <li>Información técnica (preferencias de bicicleta, nivel de experiencia).</li>
                        <li>Información de salud (alergias, condiciones médicas) necesaria para su seguridad durante las rutas.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">2. Finalidad del tratamiento</h2>
                    <p>
                        Sus datos se utilizan exclusivamente para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Gestionar y confirmar su reserva.</li>
                        <li>Personalizar su experiencia y garantizar su seguridad en las rutas.</li>
                        <li>Cumplir con las obligaciones legales y de seguros.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">3. Sus derechos</h2>
                    <p>
                        Usted tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos en cualquier momento enviando un correo a <a href="mailto:info@gravelemporda360.com" className="text-earth-brown font-bold">info@gravelemporda360.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
