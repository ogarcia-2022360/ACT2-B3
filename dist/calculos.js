"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularSubtotal = calcularSubtotal;
exports.calcularIva = calcularIva;
exports.calcularTotal = calcularTotal;
// Suma los montos y devuelve el subtotal
function calcularSubtotal(montos) {
    return montos.reduce((s, v) => s + v, 0);
}
// Calcula el IVA a partir del subtotal y una tasa (decimal)
function calcularIva(subtotal, tasa = 0.12) {
    return subtotal * tasa;
}
// Devuelve subtotal + iva 
function calcularTotal(subtotal, iva) {
    return subtotal + iva;
}
//# sourceMappingURL=calculos.js.map