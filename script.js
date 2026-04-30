const app = {
    user: { name: "", coins: 0, ava: "ava1.jpg" },
    savedDrawings: [],
    currentCat: 'animals', currentIndex: 0,
    quizStep: 0, quizList: [],
    selectedMatch: null, timer: null, brushColor: "black",
    bubbles: [], 

    data: {
        animals: [{n:"Баран", i:"baran.jpg"}, {n:"Білка", i:"bilka.jpg"}, {n:"Пес", i:"dog.jpg"}, {n:"Їжак", i:"ijak.jpg"}, {n:"Індик", i:"induk.jpg"}, {n:"Жаба", i:"jaba.jpg"}, {n:"Качка", i:"kachka.jpg"}, {n:"Кіт", i:"kit.jpg"}, {n:"Курка", i:"koko.jpg"}, {n:"Кролик", i:"kroluk.jpg"}, {n:"Миша", i:"mous.jpg"}, {n:"Порося", i:"pig.jpg"}, {n:"Півень", i:"piven.jpg"}, {n:"Ведмідь", i:"vedmid.jpg"}, {n:"Вовк", i:"vovk.jpg"}, {n:"Змія", i:"zmia.jpg"}],
        nature: [{n:"Ліс", i:"lis.jpg"}, {n:"Дерево", i:"derevo.jpg"}, {n:"Гори", i:"goru.jpg"}, {n:"Град", i:"grad.jpg"}, {n:"Гроза", i:"groza.jpg"}, {n:"Хмара", i:"hmara.jpg"}, {n:"Холодно", i:"holodno.jpg"}, {n:"Жарко", i:"hot.jpg"}, {n:"Квітка", i:"kvitka.jpg"}, {n:"Місяць", i:"moon.jpg"}, {n:"Вогонь", i:"ogon.jpg"}, {n:"Озеро", i:"ozero.jpg"}, {n:"Дощ", i:"rein.jpg"}, {n:"Річка", i:"richka.jpg"}, {n:"Сніг", i:"snig.jpg"}, {n:"Сонце", i:"sonze.jpg"}, {n:"Бурульки", i:"sosulki.jpg"}, {n:"Зірка", i:"star.jpg"}, {n:"Ураган", i:"uragan.jpg"}, {n:"Вітер", i:"viter.jpg"}, {n:"Водоспад", i:"vodopad.jpg"}],
        sweets: [{n:"Млинці", i:"blinchuku.jpg"}, {n:"Чупа-чупс", i:"chupachups.jpg"}, {n:"Желе", i:"jele.jpg"}, {n:"Кекс", i:"keks.jpg"}, {n:"Круасан", i:"kryasan.jpg"}, {n:"Морозиво", i:"morozuvo.jpg"}, {n:"Печиво", i:"pechuvo.jpg"}, {n:"Пончик", i:"ponchuk.jpg"}, {n:"Попкорн", i:"popcorn.jpg"}, {n:"Пиріг", i:"purig.jpg"}, {n:"Рулет", i:"rylet.jpg"}, {n:"Шоколадка", i:"shokoladka.jpg"}, {n:"Торт", i:"tort.jpg"}, {n:"Вафлі", i:"vafli.jpg"}, {n:"Цукерка", i:"zykerka.jpg"}],
        professions: [{n:"Балерина", i:"baleruna.jpg"}, {n:"Будівельник", i:"bydivelnuk.jpg"}, {n:"Лікар", i:"doctor.jpg"}, {n:"Двірник", i:"dvornik.jpg"}, {n:"Фермер", i:"fermer.jpg"}, {n:"Художник", i:"hydojnuk.jpg"}, {n:"Космонавт", i:"kosmonavt.jpg"}, {n:"Моряк", i:"morak.jpg"}, {n:"Офіціант", i:"ofiziant.jpg"}, {n:"Перукар", i:"perykar.jpg"}, {n:"Пілот", i:"pilot.jpg"}, {n:"Пожежник", i:"pojejnuk.jpg"}, {n:"Поліцейський", i:"policiant.jpg"}, {n:"Повар", i:"povar.jpg"}, {n:"Прибиральниця", i:"pribiralnica.jpg"}, {n:"Продавець", i:"prodavec.jpg"}, {n:"Сантехнік", i:"santechnik.jpg"}, {n:"Співак", i:"spivak.jpg"}, {n:"Стюардеса", i:"stuardesa.jpg"}, {n:"Вчитель", i:"vchutel.jpg"}, {n:"Ветеринар", i:"veterunar.jpg"}, {n:"Військовий", i:"viskovu.jpg"}, {n:"Юрист", i:"yrust.jpg"}],
        clothes: [{n:"Капелюх", i:"het.jpg"}, {n:"Кофта", i:"kafta.jpg"}, {n:"Колготи", i:"kolgotu.jpg"}, {n:"Комбінезон", i:"kombez.jpg"}, {n:"Куртка", i:"kyrtka.jpg"}, {n:"Майка", i:"maika.jpg"}, {n:"Шкарпетки", i:"noska.jpg"}, {n:"Пальто", i:"palto.jpg"}, {n:"Пояс", i:"pasok.jpg"}, {n:"Піжама", i:"pigama.jpg"}, {n:"Плащ", i:"plashch.jpg"}, {n:"Сукня", i:"platta.jpg"}, {n:"Рукавиці", i:"rykavuci.jpg"}, {n:"Шорти", i:"shortu.jpg"}, {n:"Штани", i:"shtanu.jpg"}, {n:"Сорочка", i:"sorochka.jpg"}, {n:"Спідниця", i:"spidnuca.jpg"}],
        furniture: [{n:"Двері", i:"door.jpg"}, {n:"Диван", i:"duvan.jpg"}, {n:"Дзеркало", i:"dzerkalo.jpg"}, {n:"Холодильник", i:"holodulnuk.jpg"}, {n:"Лампа", i:"lampa.jpg"}, {n:"Ліжко", i:"lijko.jpg"}, {n:"Крісло", i:"krislo.jpg"}, {n:"Шафа", i:"safa.jpg"}, {n:"Стілець", i:"stilet.jpg"}, {n:"Робочий стіл", i:"stilrobochu.jpg"}, {n:"Тумбочка", i:"tumbochka.jpg"}, {n:"Вікно", i:"vikno.jpg"}]
    },

    init() {
        const saved = localStorage.getItem('child_world_save');
        if(saved) {
            const p = JSON.parse(saved);
            this.user = p.user; this.savedDrawings = p.drawings || [];
            this.updateHeader(); this.showScreen('menuScreen');
        } else {
            this.showScreen('regScreen');
        }
        const grid = document.getElementById('avaPicker');
        for(let i=1; i<=8; i++) {
            const img = document.createElement('img'); img.src = `images/ava${i}.jpg`;
            img.className = 'ava-img' + (this.user.ava === `ava${i}.jpg` ? ' active' : '');
            img.onclick = () => {
                document.querySelectorAll('.ava-img').forEach(el=>el.classList.remove('active'));
                img.classList.add('active'); this.user.ava = `ava${i}.jpg`;
            };
            grid.appendChild(img);
        }
        this.renderCats();
    },

    register() {
        const n = document.getElementById('userName').value.trim();
        if(n) { this.user.name = n; this.save(); this.updateHeader(); this.showScreen('menuScreen'); }
        else { this.showError(); }
    },

    resetProfile() {
        if(confirm("Видалити прогрес та монети?")) { localStorage.clear(); location.reload(); }
    },

    save() { localStorage.setItem('child_world_save', JSON.stringify({user:this.user, drawings:this.savedDrawings})); },

    updateHeader() {
        document.getElementById('playerTitle').innerText = this.user.name;
        document.getElementById('userAva').src = `images/${this.user.ava}`;
        document.getElementById('coins').innerText = this.user.coins;
    },

    showError() {
        const pop = document.getElementById('errorPopup'); pop.classList.add('show');
        setTimeout(() => pop.classList.remove('show'), 1500);
    },

    showScreen(id) {
        if(this.timer) clearInterval(this.timer);
        document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
        const sc = document.getElementById(id); if(sc) sc.style.display = 'flex';
        ['paintTools','mathArea','gameCanvas'].forEach(el => {
            const d = document.getElementById(el);
            if(d) d.style.display = 'none';
        });
    },

    renderCats() {
        const cats = [
            { id: 'animals', n: 'Тварини', img: 'tvarunu.jpg' },
            { id: 'sweets', n: 'Солодощі', img: 'solodoshci.jpg' },
            { id: 'nature', n: 'Природа', img: 'pogoda.jpg' },
            { id: 'professions', n: 'Професії', img: 'profesii.jpg' },
            { id: 'clothes', n: 'Одяг', img: 'odiag.jpg' },
            { id: 'furniture', n: 'Меблі', img: 'mebli.jpg' }
        ];
        const g = document.getElementById('categoryGrid'); g.innerHTML = "";
        cats.forEach(c => {
            const b = document.createElement('button'); b.className = 'cat-btn';
            b.onclick = () => this.startLearn(c.id);
            b.innerHTML = `<img src="images/${c.img}"><span>${c.n}</span>`;
            g.appendChild(b);
        });
    },

    addCoins(v) { this.user.coins += v; document.getElementById('coins').innerText = this.user.coins; this.save(); },

    startLearn(id) { this.currentCat = id; this.currentIndex = 0; this.showScreen('learnScreen'); this.updateLearn(); },
    updateLearn() {
        const item = this.data[this.currentCat][this.currentIndex];
        document.getElementById('learnContent').innerHTML = `
            <img src="images/${item.i}" class="learn-img">
            <h1>${item.n}</h1>
        `;
    },
    nextCard() {
        if(this.currentIndex < this.data[this.currentCat].length - 1) { this.currentIndex++; this.updateLearn(); }
        else { this.startQuiz(); }
    },
    prevCard() { if(this.currentIndex > 0) { this.currentIndex--; this.updateLearn(); } },

    startQuiz() {
        this.quizList = [...this.data[this.currentCat]].sort(() => Math.random() - 0.5);
        this.quizStep = 0; this.showScreen('quizScreen'); this.renderQuiz();
    },
    renderQuiz() {
        if(this.quizStep >= 5) { alert("Чудово! +10💰"); this.addCoins(10); this.showScreen('menuScreen'); return; }
        const correct = this.quizList[this.quizStep];
        document.getElementById('quizQuestion').innerText = `Де тут "${correct.n}"?`;
        let opts = [correct, ...this.data[this.currentCat].filter(x => x !== correct).sort(()=>0.5-Math.random()).slice(0,3)].sort(()=>0.5-Math.random());
        const g = document.getElementById('quizOptions'); g.innerHTML = "";
        opts.forEach(o => {
            const img = document.createElement('img'); img.src = "images/" + o.i; img.className = "quiz-img-item";
            img.onclick = () => { if(o === correct) { this.quizStep++; this.addCoins(1); this.renderQuiz(); } else { this.showError(); } };
            g.appendChild(img);
        });
    },

    startMatchGame() {
    this.showScreen('matchScreen');
    const items = [...this.data[this.currentCat]].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const words = [...items].sort(() => 0.5 - Math.random());
    const imgs = [...items].sort(() => 0.5 - Math.random());
    
    const wBox = document.getElementById('matchWords');
    const iBox = document.getElementById('matchImages');
    wBox.innerHTML = ""; 
    iBox.innerHTML = "";
    
    words.forEach(w => {
        const d = document.createElement('div'); 
        d.className = "btn play-btn"; 
        d.innerText = w.n; 
        const cid = w.i.split('.')[0]; 
        d.id = "w-" + cid;
        d.onclick = () => { 
            this.selectedMatch = w; 
            document.querySelectorAll('#matchWords .btn').forEach(b => b.classList.remove('word-selected')); 
            d.classList.add('word-selected'); 
        };
        wBox.appendChild(d);
    });

    imgs.forEach(im => {
        const i = document.createElement('img'); 
        i.src = "images/" + im.i; 
        i.className = "match-img-item";
        const cid = im.i.split('.')[0]; 
        i.id = "i-" + cid;
        i.onclick = () => {
            if (this.selectedMatch && this.selectedMatch.i === im.i) {
                document.getElementById("w-" + cid).style.visibility = "hidden"; 
                i.style.visibility = "hidden"; 
                this.addCoins(2);
            } else if (this.selectedMatch) { 
                this.showError(); 
            }
            this.selectedMatch = null; 
            document.querySelectorAll('#matchWords .btn').forEach(b => b.classList.remove('word-selected'));
        };
        iBox.appendChild(i);
    });
    },

    startSnake() {
        this.showScreen('canvasScreen'); const cvs = document.getElementById('gameCanvas'); cvs.style.display = 'block';
        const ctx = cvs.getContext('2d'); cvs.width = 300; cvs.height = 300;
        let snake = [{x:150, y:150}], angle = 0, turn = 0.1, food = {x:200, y:200}, score = 0;
        cvs.onclick = () => turn = -turn;
        this.timer = setInterval(() => {
            angle += turn;
            let head = { x: snake[0].x + Math.cos(angle)*5, y: snake[0].y + Math.sin(angle)*5 };
            if(head.x<0) head.x=300; if(head.x>300) head.x=0; if(head.y<0) head.y=300; if(head.y>300) head.y=0;
            snake.unshift(head);
            if(Math.hypot(head.x-food.x, head.y-food.y) < 15) { score++; this.addCoins(1); food = {x: 20+Math.random()*260, y: 20+Math.random()*260}; }
            else if(snake.length > 20) snake.pop();
            ctx.fillStyle = "white"; ctx.fillRect(0,0,300,300);
            ctx.fillStyle = "red"; ctx.beginPath(); ctx.arc(food.x, food.y, 8, 0, 7); ctx.fill();
            ctx.fillStyle = "lime"; snake.forEach((p,i) => { ctx.beginPath(); ctx.arc(p.x, p.y, i===0?10:7, 0, 7); ctx.fill(); });
            document.getElementById('gameStat').innerText = "Очки: " + score;
        }, 30);
    },

    startBubbles() {
        this.showScreen('canvasScreen'); const cvs = document.getElementById('gameCanvas'); cvs.style.display = 'block';
        const ctx = cvs.getContext('2d'); cvs.width = 300; cvs.height = 400;
        let score = 0; this.bubbles = [];
        this.timer = setInterval(() => {
            ctx.clearRect(0,0,300, 400);
            if(Math.random()<0.05) this.bubbles.push({x:Math.random()*300, y:450, r:25, c:`hsl(${Math.random()*360},70%,50%)`, s:2+Math.random()*3});
            this.bubbles.forEach((b,i) => { b.y -= b.s; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7); ctx.fillStyle = b.c; ctx.fill(); if(b.y < -50) this.bubbles.splice(i,1); });
            document.getElementById('gameStat').innerText = "Очки: " + score;
        }, 30);
        cvs.onmousedown = (e) => {
            const r = cvs.getBoundingClientRect(); const mx = (e.clientX - r.left) * (300/r.width), my = (e.clientY - r.top) * (400/r.height);
            this.bubbles.forEach((b,i) => { if(Math.hypot(mx-b.x, my-b.y) < b.r) { this.bubbles.splice(i,1); score++; this.addCoins(1); } });
        };
    },

    startMath() { this.showScreen('canvasScreen'); document.getElementById('mathArea').style.display='block'; this.nextMath(); },
    nextMath() {
        const a=Math.floor(Math.random()*10), b=Math.floor(Math.random()*a), op=Math.random()>0.5?'+':'-', res=op==='+'?a+b:a-b;
        document.getElementById('mathProblem').innerText=`${a}${op}${b}=?`;
        const g=document.getElementById('mathOptions'); g.innerHTML="";
        [res, res+1, res-1, 10].filter((v,i,ar)=>ar.indexOf(v)===i && v>=0).sort(()=>0.5-Math.random()).forEach(v=>{
            const bt=document.createElement('button'); bt.className="btn play-btn"; bt.innerText=v;
            bt.onclick=()=>{ if(v===res){ this.addCoins(1); this.nextMath(); } else { this.showError(); } }; 
            g.appendChild(bt);
        });
    },

    startDraw() {
        this.showScreen('canvasScreen'); const cvs = document.getElementById('gameCanvas'); cvs.style.display = 'block';
        document.getElementById('paintTools').style.display = 'block';
        const ctx = cvs.getContext('2d'); cvs.width = 300; cvs.height = 450; ctx.lineWidth = 8; ctx.lineCap = 'round';
        const colors = ['red','blue','green','yellow','purple','black','brown','pink'];
        const cRow = document.getElementById('colorsRow'); cRow.innerHTML = "";
        colors.forEach(c => {
            const d = document.createElement('div'); d.className = 'color-btn'; d.style.background = c;
            d.onclick = () => this.brushColor = c; cRow.appendChild(d);
        });
        let draw = false;
        const move = (e) => {
            if(!draw) return; const r = cvs.getBoundingClientRect();
            const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - r.left) * (300/r.width);
            const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - r.top) * (450/r.height);
            ctx.strokeStyle = this.brushColor; ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
        };
        cvs.onmousedown = (e) => { draw = true; move(e); }; cvs.onmousemove = move; cvs.onmouseup = () => { draw = false; ctx.beginPath(); };
        cvs.ontouchstart = (e) => { draw = true; move(e); }; cvs.ontouchmove = (e) => { e.preventDefault(); move(e); };
        this.clearCanvas = () => ctx.clearRect(0,0,300, 450);
    },

    saveDrawing() { this.savedDrawings.push(document.getElementById('gameCanvas').toDataURL()); this.save(); alert("Збережено!"); },
    showGallery() {
        this.showScreen('galleryScreen');
        const g = document.getElementById('galleryGrid');
        g.innerHTML = "";
    
        this.savedDrawings.forEach((d, index) => {
            const wrap = document.createElement('div');
            wrap.className = 'gallery-item';
        
            wrap.innerHTML = `
                <img src="${d}">
                <button class="del-draw-btn" onclick="app.deleteDrawing(${index})">✕</button>
            `;
            g.appendChild(wrap);
        });
    },

// Універсальна функція для виклику підтвердження
askAction(text, action) {
    const box = document.getElementById('customConfirm');
    document.getElementById('confirmText').innerText = text;
    box.style.display = 'flex';

    document.getElementById('confirmYes').onclick = () => {
        action();
        box.style.display = 'none';
    };
    document.getElementById('confirmNo').onclick = () => {
        box.style.display = 'none';
    };
},

resetProfile() {
    this.askAction("Видалити профіль та всі монети?", () => {
        localStorage.clear();
        location.reload();
    });
},

deleteDrawing(index) {
    this.askAction("Видалити цей малюнок?", () => {
        this.savedDrawings.splice(index, 1);
        this.save();
        this.showGallery();
    });
},
};
app.init();