class Character {
  constructor(props) {
    this.name = props.name
    this.hp = props.hp
    this.initialHp = props.initialHp
    this.mp = props.mp
    this.initialMp = props.initialMp
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }

  showStatus() {
    const mainEl = document.getElementById('main');
    mainEl.innerHTML = `<p>キャラクター名: ${this.name} 体力: ${this.hp} 魔法力: ${this.mp}</p>`
  }

  attack(defender) {
    const mainEl = document.getElementById('main');
    if (this.hp <= 0) {
      mainEl.innerHTML = `<p>${this.name}は死んでいるので攻撃できません。</p>`
    }
    if (defender.hp <= 0) {
      mainEl.innerHTML = `<p>${defender.name}は死んでいるので攻撃できません。</p>`
    }
    const damage = calcAttackDamage(defender);
    if (defender.hp <= 0) {
      mainEl.innerHTML = `<p>${this.name}が${defender.name}に${damage}のダメージ。${defender.name}は死にました。</p>`
    } else {
      mainEl.innerHTML = `<p>${this.name}が${defender.name}に${damage}のダメージ。</p>`
    }
  }

  calcAttackDamage(defender) {
    let damage = this.offensePower - defender.defencePower;
    if (damage < 0) {
      damage = 1;
    }
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    const mainEl = document.getElementById('main');
    this.mp -= 3;
    target.hp += 15;
    mainEl.innerHTML = `<p>${this.name}の回復魔法。${target.name}の体力が15回復しました。</p>`
    if (this.hp <= 0) {
      mainEl.innerHTML = `<p>${this.name}は死んでいます。</p>`
    }
    if (target.hp <= 0) {
      mainEl.innerHTML = `<p>${target.name}は死んでいます。体力を回復できません。</p>`
    }
    if (this.mp < 3) {
      mainEl.innerHTML = `<p>${this.name}の魔法力が足りません。</p>`
    }
  }

  fireSpell(target) {
    const mainEl = document.getElementById('main');
    this.mp -= 2;
    target.hp -= 10;
    mainEl.innerHTML = `<p>${this.name}の攻撃魔法。${target.name}に10のダメージ。</p>`
    if (target.hp <= 0) {
      mainEl.innerHTML = `<p>${target.name}は死にました。</p>`
    }
    if (this.hp <= 0) {
      mainEl.innerHTML = `<p>${this.name}は死んでいます。</p>`
    }
    if (target.hp <= 0) {
      mainEl.innerHTML = `<p>${target.name}は死んでいます。攻撃できません。</p>`
    }
    if (this.mp < 2) {
      mainEl.innerHTML = `<p>${this.name}の魔法力が足りません。</p>`
    }
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}
