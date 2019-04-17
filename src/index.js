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
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
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
    /*
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }

  fireSpell(target) {
    /*
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
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
