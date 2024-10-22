// funzione personaggio random
function randomEnemy(enemies) {
    const r = Math.floor(Math.random() * enemies.length)
    return enemies[r]
}

// funzione difesa
function calculateDamageTaken(attacker, target) {
    // danno base in base alla forza dell'attacker
    const baseDamage = attacker.strength
    // inizializziamo riduzione del danno
    let damageReduction;
    // percentuale riduzione danno
    if (target.defence >= 1 && target.defence <= 5) {
        damageReduction = 0;
    } else if (target.defence >= 6 && target.defence <= 10) {
        damageReduction = 0.2
    } else if (target.defence >= 11 && target.defence <= 15) {
        damageReduction = 0.5; 
    }

    // danno finale
    const damageTaken = baseDamage * (1 - damageReduction)
    // ritorna valore da 0 in su
    return Math.max(damageTaken, 0);
}

function calculateDamage(attacker) {
    const baseDamage = attacker.strength
    // calcolo critico
    let damageCrit;
    if(baseDamage >=1 && baseDamage <=5) {
        damageCrit = Math.random() * 0.1;
    } else if (baseDamage >= 6 && baseDamage <= 10) {
        damageCrit = Math.random() * 0.3
    } else if (baseDamage >= 11 && baseDamage <= 15) {
        damageCrit = Math.random() * 0.5
    }
    const totDamage = baseDamage + damageCrit;

    if(damageCrit > 0) {
        return console.log('Danno totale: '+totDamage+'. Danno base: ' + baseDamage + '. Critico: ' + damageCrit)
    } else {
        return console.log('No critico! '+totDamage+'. Danno base: ' + baseDamage + '. Critico: ' + damageCrit)
    }
}

export {randomEnemy, calculateDamageTaken, calculateDamage}