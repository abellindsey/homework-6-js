var hero_PermittedNames = ['JonnSeana', 'Batman', 'MagnusGinger', 'Abel', 'Priest', 'Tanker', 'Rasta', 'Ratt', 'Don'];
var monster_PermittedNames = ['Abbadon', 'Lucifer', 'Siggilit', 'Deputat', 'Gaishnik', 'Voenkom', 'Andropov', 'Chekhov'];

function Character(options) {
  this.name = options.name
  this.typeOfClass = options.typeOfClass
  this.life = options.life;
  this.damage = options.damage;
  this.maxLife = options.life;
  this.potion = Math.random() >= 0.5;
  this.counter = 2;
}

Character.prototype.getName = function () {
  return this.name;
}
Character.prototype.typeOfClass = function () {
  return this.typeOfClass;
}
Character.prototype.getLife = function () {
  return this.life;
}
Character.prototype.setLife = function (dmg) {
  this.life -= dmg;
}
Character.prototype.getDamage = function () {
  return this.damage;
}
Character.prototype.attack = function (obj) {
  obj.setLife(this.getDamage());
}
Character.prototype.isAlive = function () {
  return this.life > 0;
}
Character.prototype.potion = function () {
  return this.potion;
}
Character.prototype.shouldUseSkill = function () {
  return (this.life < this.maxLife / 2 && this.counter > 0);
}
Character.prototype.updateLife = function () {
  this.life = this.maxLife;
}

function Hero() {
  Character.apply(this, arguments);
}

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.setLife = function (dmg) {
  if (this.shouldUseSkill()) {
    this.counter--;
    console.log('Using cheats - ignore damage')
  } else {
    this.life -= dmg;
  }
}
Hero.prototype.getDamage = function () {
  if (this.shouldUseSkill() && this.potion) {
    return this.damage * 2;
  }
  return this.damage;
}



function Monster() {
  Character.apply(this, arguments);
}
Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.getDamage = function () {
  if (this.shouldUseSkill()) {
    this.counter--;
    console.log('Using cheats  - double damage')
    return this.damage * 2;
  }
  return this.damage;
}

Monster.prototype.setLife = function (dmg) {
  if (this.shouldUseSkill() && this.potion) {} else {
    this.life -= dmg;
  }
}

function Warrior_Class() {
  Hero.apply(this, arguments);
  this.typeOfClass = 'Warrior',
    this.life =  Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 20
}
Warrior_Class.prototype = Object.create(Hero.prototype);
Warrior_Class.prototype.constructor = Warrior_Class;

function Thief_Class() {
  Hero.apply(this, arguments);
  this.typeOfClass = 'Thief',
    this.life = Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 40
}
Thief_Class.prototype = Object.create(Hero.prototype);
Thief_Class.prototype.constructor = Thief_Class;

function Wizard_Class() {
  Hero.apply(this, arguments);
  this.typeOfClass = 'Wizard',
    this.life = Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 50
}
Wizard_Class.prototype = Object.create(Hero.prototype);
Wizard_Class.prototype.constructor = Wizard_Class;


function HeroFactory() {};
HeroFactory.prototype.createHero = function (options) {
  var hero;
  switch (options.typeOfClass) {
    case 'Warrior':
      hero = new Warrior_Class(options);
      break;
    case 'Thief':
      hero = new Thief_Class(options);
      break;
    case 'Wizard':
      hero = new Wizard_Class(options);
      break;
  }
  return hero;
};
let newHero = new HeroFactory();
let participant1 = newHero.createHero({
  name: 'JonnSeana',
  typeOfClass: 'Warrior',
});
let participant2 = newHero.createHero({
  name: 'Batman',
  typeOfClass: 'Thief',
})
let participant3 = newHero.createHero({
  name: 'MagnusGinger',
  typeOfClass: 'Warrior',
});
let participant4 = newHero.createHero({
  name: 'Abbadon',
  typeOfClass: 'Wizard',
});


function Vampire_Class() {
  Monster.apply(this, arguments);
  this.typeOfClass = 'Vampire',
    this.life =  Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 50
}
Vampire_Class.prototype = Object.create(Monster.prototype);
Vampire_Class.prototype.constructor = Vampire_Class;

function Goblin_Class() {
  Monster.apply(this, arguments);
  this.typeOfClass = 'Goblin',
    this.life =  Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 35
}
Goblin_Class.prototype = Object.create(Monster.prototype);
Goblin_Class.prototype.constructor = Goblin_Class;

function Croud_Of_Orks_Class() {
  Monster.apply(this, arguments);
  this.typeOfClass = 'Croud_of_ork',
    this.life =  Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    this.maxLife = this.life,
    this.damage = 50
}
Croud_Of_Orks_Class.prototype = Object.create(Monster.prototype);
Croud_Of_Orks_Class.prototype.constructor = Croud_Of_Orks_Class;


function MonsterFactory() {};
MonsterFactory.prototype.createMonster = function (options) {
  let monster;
  switch (options.typeOfClass) {
    case 'Vampire':
      monster = new Vampire_Class(options)
      break;
    case 'Goblin':
      monster = new Goblin_Class(options)
      break;
    case 'Ork':
      monster = new Croud_Of_Orks_Class(options);
  }
  return monster;
};
let newMonster = new MonsterFactory();
let monster1 = newMonster.createMonster({
  name: 'Lucifer',
  typeOfClass: 'Goblin', 
})
let monster2 = newMonster.createMonster({
  name: 'Siggilit',
  typeOfClass: 'Ork',
})
let monster3 = newMonster.createMonster({
  name: 'Voenkom',
  typeOfClass: 'Vampire',
 
})

function Game(...players) {
  this.players = players;
  this.participants = [];
  this.hero_PermittedNames = hero_PermittedNames;
  this.monster_PermittedNames = monster_PermittedNames;
 }
Game.prototype.checkName = function (player) {
  if (player instanceof Hero && this.hero_PermittedNames.indexOf(player.name) != -1) {
    return true;
  } else if (player instanceof Monster && this.monster_PermittedNames.indexOf(player.name) != -1) {
    return true
  } else {
    return false;
  }
};
Game.prototype.registration = function (...players) {
  var list = [];
  for (let i = 0; i < this.players.length; i++) {
    if ( this.checkName(players[i])) {
      this.participants.push(players[i]);
      list.push(players[i].name)
    } 
  }
 
  console.log(list.join() + ' ' + 'take part in the tournament');
}
Game.prototype.Play = function () {
  while (this.participants.length > 1) {
    competitors = [];
    if (this.participants.length % 2 === 1) {
      competitors[0] = this.participants[this.participants.length - 1];
      this.participants.slice(-1, 1);
    }
    competitors = competitors.concat(this.roundPlay(this.participants))
    this.participants = competitors;
  }
  
  return competitors[0].name + ' is a winner of the tournament!'
}
Game.prototype.roundPlay = function (currentPlayers) {
  new_CurrentPalayers = []
  for (let i = 0; i < currentPlayers.length; i += 2) {
    if (i + 1 >= currentPlayers.length) {
      break;
    }
    player1 = currentPlayers[i]
    player2 = currentPlayers[i + 1]
    localWinner = this.Battle(player1, player2)
    console.log(player1.name + " vs " + player2.name )
    console.log( localWinner.name + " Wins " )
    new_CurrentPalayers.push(localWinner)
  }
  return new_CurrentPalayers;
}
Game.prototype.Battle = function (player1, player2) {
  while (player1.isAlive() && player2.isAlive()) {
    player1.attack(player2);
    console.log('Health ' + player1.name + ': ' + player1.getLife());
    player2.attack(player1);
    console.log('Health ' + player2.name + ': ' + player2.getLife());
  }
  if (!player1.isAlive()) {
    player2.updateLife();
    return player2;
  } else if (!player2.isAlive()) {
    player1.updateLife();
    return player1;

  }
}
let game = new Game(participant1, participant2, participant3, participant4, monster1, monster2, monster3);
game.registration(participant1, participant2, participant3, participant4, monster1, monster2, monster3)
console.log(game.Play())