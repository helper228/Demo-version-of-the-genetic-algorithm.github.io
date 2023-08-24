class Bage {
    constructor(word, x, y, lineOfSight, hp) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.lineOfSight = lineOfSight //[-1, 0, +1];
        this.hp = hp //10
        this.mind = 100
        this.food = 100
        this.look = 100
    }
    returnWord() {
        return this.word;
    }
    get_random(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

    createBage() {
        let border = true
        while (border) {
            this.x = Math.floor(Math.random() * (0 - 20) + 20)
            this.y = Math.floor(Math.random() * (0 - 20) + 20)
            if (this.word[this.y][this.x].style.backgroundColor != 'green' || this.word[this.y][this.x].style.backgroundColor != 'red') {
                border = false
                this.word[this.y][this.x].style.backgroundColor = 'red';
            }
        }


    }
    viewBage() {
        let view = new Array;
        const view_index = this.lineOfSight;
        for (let x_step = 0; x_step <= view_index.length - 1; x_step++) {
            let x_index = this.x + view_index[x_step];
            for (let y_step = 0; y_step <= view_index.length - 1; y_step++) {
                let y_index = this.y + view_index[y_step];
                if (view_index[x_step] != 0 || view_index[y_step] != 0) {
                    if ((x_index >= 0 && x_index <= 20) && (y_index >= 0 && y_index <= 20)) {
                        view.push(this.word[y_index][x_index]);
                    }
                }
            }
        }
        return (view)
    }
    moveBage() {
        if (this.hp > 0) {
            this.word[this.y][this.x].style.backgroundColor = 'white'// убрать место где был жук
            let border = true
            let step = 0;
            let x_temp = this.x + this.get_random(this.lineOfSight)
            let y_temp = this.y + this.get_random(this.lineOfSight)

            while (border) {//Проверить можно ли ему пойти в сторону куда он хочет
                // console.log(y_temp, x_temp, this.y, this.x)
                let x_index = this.get_random(this.lineOfSight)
                let y_index = this.get_random(this.lineOfSight)
                // console.log(y_temp,':y_temp', x_temp,':x_temp', this.y,': this.y', this.x,':this.x', x_index,':x_index', y_index,':y_index')
                step += 1
                x_temp = this.x + x_index
                y_temp = this.y + y_index

                if ((x_temp >= 0 && x_temp <= 20) && (y_temp >= 0 && y_temp <= 20)) {// если он не выходит за границы и там нет другого жука
                    // console.log(y_temp, x_temp, this.y, this.x)
                    if (this.word[y_temp][x_temp].style.backgroundColor != 'red') {
                        border = false
                    }

                }
                if (step == 10) {// защита, что бы он не думал вечно
                    // console.log(step)
                    border = false
                    x_temp = 0
                    y_temp = 0
                }
            }

            if (typeof (x_temp) == "number" && typeof (y_temp) == "number") {// проверка, смогли найти жук место если нет то будет null
                this.x = x_temp
                this.y = y_temp
                try {
                    this.word[this.y][this.x].style.backgroundColor == 'red'
                }
                catch (e) {
                    console.log(this.x, this.y)
                    console.log(x_temp, y_temp)
                }
            }



            if (this.word[this.y][this.x].style.backgroundColor == 'green' && this.food > 30 && this.look > 30) {
                this.hp += 10
            }
            this.word[this.y][this.x].style.backgroundColor = 'red'
            this.hp -= 1;
        }
        else {

            this.word[this.y][this.x].style.backgroundColor = 'white'
        }

    }
    Dead() {
        this.word[this.y][this.x].style.backgroundColor = 'white'
    }

}

class Food {
    constructor(word) {
        this.word = word;
    }
    growUp() {
        for (let i = 0; i < 7; i++) {
            let x = Math.floor(Math.random() * (0 - 20) + 20)
            let y = Math.floor(Math.random() * (0 - 20) + 20)


            let border = true

            while (border) {
                x = Math.floor(Math.random() * (0 - 20) + 20)
                y = Math.floor(Math.random() * (0 - 20) + 20)
                if (this.word[x][y].style.backgroundColor != 'green') {
                    border = false;
                }
            }
            this.word[y][x].style.backgroundColor = 'green';
        }
    }
}
class word {
    constructor(bage, food) {
        this.wordAll = this.word();
        this.bage = bage
        this.bages = new Array;
        this.food = food;
        this.foods = new Array;
    }
    returnBages() {
        return this.bages
    }
    word() {//Создает сетку и возврощает массив с адресами клеток
        let word = []
        for (let y_num = 0; y_num <= 20; y_num++) {
            let y = document.createElement('div')
            y.className = 'y'
            y.id = 'y' + String(y_num)
            document.body.append(y)
            word[y_num] = [];
            for (let x_num = 0; x_num <= 20; x_num++) {
                let x = document.createElement('div')
                x.className = 'x'

                x.id = 'x' + String(x_num) + ' y' + String(y_num)
                y.append(x)
                word[y_num][x_num] = x;
            }
        }
        return word
    }
    ginerateLineOfSight() {
        let listOut = new Array;
        let lineOfSightList = [-1, 0, +1]
        let lineOfSightCount = Math.floor(Math.random() * (1 - 10) + 10)
        for (let i = 0; i < lineOfSightCount; i++) {
            listOut.push(this.get_random(lineOfSightList))
        }
        return listOut
    }
    ginerateBage(count) {

        for (let i = 0; i < count; i++) {
            let x = Math.floor(Math.random() * (1 - 20) + 20)
            let y = Math.floor(Math.random() * (1 - 20) + 20)
            let LineOfSight = this.ginerateLineOfSight()
            let hp = Math.floor(Math.random() * (5 - 15) + 15)
            let OneBage = new this.bage(this.wordAll, x, y, LineOfSight, hp)

            OneBage.createBage()
            this.bages.push(OneBage)
        }


    }
    ginerateFood() {
        let OneFood = new this.food(this.wordAll)
        OneFood.growUp()

    }
    get_random(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

    LiveWord() {
        for (let i = 0; i < this.bages.length; i++) {
            setTimeout(this.bages[i].moveBage(), 1000)
        }
        let alive = new Array;
        for (let i = 0; i < this.bages.length; i++) {

            if (this.bages[i].hp > 0) {
                alive.push(this.bages[i])
            }

        }
        if (alive.length == 1) {
            // console.log('Я бал задесь')
            for (let i = 0; i < this.bages.length; i++) {
                // console.log('Я бал задесь')
                this.bages[i].Dead()
            }
            for (let z = 0; z < 4; z++) {
                this.bages[z] = alive[0]
            }
            this.bages[4] = wordAll.ginerateFood(1)

            this.bages = new Array;
        }

        else if (alive.length == 0) {
            wordAll.ginerateBage(5)
            wordAll.ginerateFood()
            return true
        }

    }
}

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
}

let wordAll = new word(Bage, Food)
wordAll.ginerateBage(5)
wordAll.ginerateFood()
wordAll.LiveWord()
// x = 0
// y = 0
// i = ((x >= 0 && x<=20) &&(y >= 0 && y<=20) );


// wordAll.LiveWord()

title = document.getElementsByClassName('title')[0]
// let x = 0
// for(let i = 0;i<10;i++){
//     setTimeout(wordAll.LiveWord(), 500)
//     console.log(i)
// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
live = 0
// Теперь можно ее использовать:
async function F() {
    let x = 1;
    console.log("Привет");

    for (let i = 0; i <= 1500; i++) {
        live+=1
        if(wordAll.LiveWord()){
            console.log(live)
            live = 0
            console.log('новое поколение')
            x+=1
            // title.innerHTML = String(x)+" "+String(wordAll.returnBages()[0].hp)+" "+String(wordAll.returnBages()[0].LineOfSight)
            console.log('Поколение ',x,wordAll.returnBages())
        }
        
            //Выводим значение i в консоль
        await sleep(250); //Ждем 1 секунду при каждом шаге цикла
    }

}
F();
//вызываем функцию F
