import React from 'react';

export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-earth-light py-24">
            <div className="max-w-4xl mx-auto px-6 bg-white rounded-3xl shadow-xl p-12">
                <h1 className="text-4xl font-black text-earth-dark mb-8">Términos y Condiciones</h1>

                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        Bienvenido a <strong>Gravel Empordà 360º</strong>. Al contratar nuestros servicios, usted acepta los siguientes términos y condiciones.
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">1. Política de Pagos</h2>
                    <p>
                        Para garantizar una gestión ágil y segura de las rutas, aplicamos la siguiente política de pagos:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Depósito de Reserva:</strong> Se requiere el pago de un <strong>20% del total</strong> en el momento de realizar la reserva.</li>
                        <li><strong>Pago Final:</strong> El 80% restante debe abonarse al menos <strong>30 días antes</strong> del inicio de la ruta contratada.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">2. Contrato y Documentación</h2>
                    <p>
                        Una vez confirmado el pago inicial, el sistema generará un contrato que deberá ser rellenado con datos técnicos y de salud adicionales. Este documento es esencial para la validez de la reserva y debe ser firmado digitalmente.
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">3. Seguro y Responsabilidad</h2>
                    <p>
                        Todos los participantes deben contar con la documentación requerida. Gravel Empordà 360º actúa de acuerdo con las normativas vigentes para garantizar una experiencia segura.
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">4. Condiciones de Trabajo</h2>
                    <p>
                        Nos reservamos el derecho de modificar rutas o servicios por causas de fuerza mayor o seguridad de los participantes (climatología, etc.).
                    </p>
                </div>
            </div>
        </div>
    );
}
