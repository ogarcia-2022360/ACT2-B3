"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const calculos_1 = require("./calculos");
function pregunta(prompt) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(prompt, (respuesta) => {
            rl.close();
            resolve(respuesta);
        });
    });
}
function convertirANumeros(texto) {
    let textoLimpio = texto.replace(/;/g, ",").replace(/ /g, ",");
    let pedazos = textoLimpio.split(",");
    let resultado = [];
    for (let i = 0; i < pedazos.length; i++) {
        const elemento = pedazos[i];
        // Verificación de seguridad para evitar errores de TypeScript
        if (elemento !== undefined) {
            let valor = Number(elemento);
            if (elemento.trim() !== "" && !Number.isNaN(valor)) {
                resultado.push(valor);
            }
        }
    }
    return resultado;
}
async function main() {
    console.log("--- Calculadora de Ventas ---");
    console.log("1. Usar ejemplos");
    console.log("2. Ingresar mis propios números");
    const opcion = await pregunta("Elige 1 o 2: ");
    let misMontos = [];
    if (opcion === "1") {
        console.log("a) 12.5, 30, 7.99");
        console.log("b) 100, 45.5, 9.5");
        const tipoEjemplo = await pregunta("Elige a o b: ");
        misMontos = tipoEjemplo === "b" ? [100, 45.5, 9.5, 0.99] : [12.5, 30, 7.99];
    }
    else {
        const entrada = await pregunta("Ingresa los números separados por coma: ");
        misMontos = convertirANumeros(entrada);
    }
    const tasaTexto = await pregunta("Ingresa el porcentaje de IVA (ej: 12): ");
    let tasa = Number(tasaTexto);
    if (Number.isNaN(tasa))
        tasa = 12;
    const subtotal = (0, calculos_1.calcularSubtotal)(misMontos);
    const iva = (0, calculos_1.calcularIva)(subtotal, tasa / 100);
    const total = (0, calculos_1.calcularTotal)(subtotal, iva);
    console.log("\n--- RESULTADOS ---");
    console.log("Subtotal: " + subtotal.toFixed(2));
    console.log("IVA (" + tasa + "%): " + iva.toFixed(2));
    console.log("Total: " + total.toFixed(2));
}
main();
//# sourceMappingURL=principal.js.map