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
        } else { this.showScreen('regScreen'); }
        const grid = document.getElementById('avaPicker'); grid.innerHTML = "";
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
            const d = document.getElementById(el); if(d) d.style.display = 'none';
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

    // --- ІГРИ ---

startMole() {
        this.showScreen('canvasScreen');
        const cvs = document.getElementById('gameCanvas');
        cvs.style.display = 'block';
        const ctx = cvs.getContext('2d');
        cvs.width = 300;
        cvs.height = 400;

        let score = 0;
        let objects = []; // Тут будуть і кроти, і бомби
        let gameActive = true;
        let totalSpawned = 0;
        const maxObjects = 20; // Скільки всього об'єктів з'явиться за гру

        const avatarImg = new Image();
        avatarImg.src = `images/${this.user.ava}`;

        // Створення нового об'єкта (або кріт, або бомба)
        const spawnObject = () => {
            if (totalSpawned >= maxObjects) return;
            
            const isBomb = Math.random() < 0.3; // 30% шансу, що випаде бомба
            objects.push({
                x: 50 + Math.random() * 200,
                y: 50 + Math.random() * 300,
                size: 0,        // Починаємо з нульового розміру для анімації
                maxSize: 70,
                type: isBomb ? 'bomb' : 'mole',
                state: 'growing', // growing, waiting, shrinking, hit
                timer: 0,
                lifeTime: 1000 + Math.random() * 1000 // скільки часу він висить
            });
            totalSpawned++;
        };

        this.timer = setInterval(() => {
            if (!gameActive) return;

            ctx.clearRect(0, 0, 300, 400);

            // Шанс на появу нового об'єкта
            if (Math.random() < 0.03 && objects.length < 3) spawnObject();

            for (let i = objects.length - 1; i >= 0; i--) {
                let obj = objects[i];

                // --- ЛОГІКА АНІМАЦІЇ ---
                if (obj.state === 'growing') {
                    obj.size += 5;
                    if (obj.size >= obj.maxSize) obj.state = 'waiting';
                } else if (obj.state === 'waiting') {
                    obj.timer += 30;
                    if (obj.timer >= obj.lifeTime) obj.state = 'shrinking';
                } else if (obj.state === 'shrinking') {
                    obj.size -= 5;
                    if (obj.size <= 0) objects.splice(i, 1);
                } else if (obj.state === 'hit') {
                    obj.size += 10; // Ефект «вибуху» при попаданні
                    ctx.globalAlpha = 0.5;
                    if (obj.size > 120) objects.splice(i, 1);
                }

                // --- МАЛЮВАННЯ ---
                ctx.save();
                ctx.translate(obj.x, obj.y);
                
                if (obj.state === 'hit') {
                    ctx.font = "50px Arial";
                    ctx.fillText(obj.type === 'mole' ? "✨" : "💥", -25, 25);
                } else {
                    if (obj.type === 'mole') {
                        // Малюємо аватарку
                        ctx.beginPath();
                        ctx.arc(0, 0, obj.size / 2, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(avatarImg, -obj.size / 2, -obj.size / 2, obj.size, obj.size);
                    } else {
                        // Малюємо бомбу
                        ctx.font = `${obj.size}px Arial`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText("💣", 0, 0);
                    }
                }
                ctx.restore();
                ctx.globalAlpha = 1.0;
            }

            document.getElementById('gameStat').innerText = `Рахунок: ${score} | Лишилось: ${maxObjects - totalSpawned}`;

            // Перевірка кінця гри
            if (totalSpawned >= maxObjects && objects.length === 0) {
                gameActive = false;
                clearInterval(this.timer);
                setTimeout(() => {
                    alert(`Гру закінчено! Ти зібрав ${score} монет! 💰`);
                    this.addCoins(score);
                    this.showScreen('playMenuScreen');
                }, 500);
            }
        }, 30);

        // Обробка кліків
        cvs.onmousedown = (e) => {
            if (!gameActive) return;
            const r = cvs.getBoundingClientRect();
            const mx = (e.clientX - r.left) * (300 / r.width);
            const my = (e.clientY - r.top) * (400 / r.height);

            for (let obj of objects) {
                if (obj.state !== 'hit' && Math.hypot(mx - obj.x, my - obj.y) < 40) {
                    if (obj.type === 'mole') {
                        score += 2; // За кріта +2
                        obj.state = 'hit';
                    } else {
                        score = Math.max(0, score - 5); // За бомбу -5
                        obj.state = 'hit';
                        this.showError(); // Візуальний ефект помилки з твого коду
                    }
                    break;
                }
            }
        };
    },

startMaze() {
        this.showScreen('canvasScreen');
        const cvs = document.getElementById('gameCanvas');
        cvs.style.display = 'block';
        const ctx = cvs.getContext('2d');
        cvs.width = 300;
        cvs.height = 300;

        let px = 25, py = 25; // Початкова позиція
        const radius = 12;

        // ГЕНЕРАТОР ВИПАДКОВИХ СТІН (Кожного разу нові!)
        const walls = [];
        const rows = [60, 120, 180, 240]; // Рівні поверхів лабіринту
        
        rows.forEach(y => {
            // Робимо випадкову дірку в стіні, щоб можна було пройти
            const holeX = Math.random() * 240; 
            const holeWidth = 50;
            
            // Стіна зліва від дірки
            if (holeX > 0) walls.push({x: 0, y: y, w: holeX, h: 15});
            // Стіна справа від дірки
            if (holeX + holeWidth < 300) walls.push({x: holeX + holeWidth, y: y, w: 300 - (holeX + holeWidth), h: 15});
        });

        // Додамо пару вертикальних перешкод для складності
        for(let i=0; i<2; i++) {
            walls.push({
                x: 50 + Math.random() * 200,
                y: 20 + Math.random() * 200,
                w: 15,
                h: 50
            });
        }

        const isHit = (nx, ny) => {
            // Межі екрану
            if (nx < radius || nx > 300 - radius || ny < radius || ny > 300 - radius) return true;
            // Перевірка стін
            for (let w of walls) {
                if (nx + radius > w.x && nx - radius < w.x + w.w &&
                    ny + radius > w.y && ny - radius < w.y + w.h) {
                    return true;
                }
            }
            return false;
        };

        const move = (e) => {
            const r = cvs.getBoundingClientRect();
            const targetX = ((e.clientX || (e.touches && e.touches[0].clientX)) - r.left) * (300 / r.width);
            const targetY = ((e.clientY || (e.touches && e.touches[0].clientY)) - r.top) * (300 / r.height);

            // Тільки якщо шлях вільний, оновлюємо позицію
            if (!isHit(targetX, targetY)) {
                px = targetX;
                py = targetY;
            } else {
                // Ковзання вздовж стін
                if (!isHit(targetX, py)) px = targetX;
                else if (!isHit(px, targetY)) py = targetY;
            }

            if (px > 260 && py > 260) {
                clearInterval(this.timer);
                alert("🎁 Перемога! Тримай монети!");
                this.addCoins(15);
                this.showScreen('playMenuScreen');
            }
        };

        cvs.onmousemove = move;
        cvs.ontouchmove = (e) => { e.preventDefault(); move(e); };

        this.timer = setInterval(() => {
            ctx.fillStyle = "#f1f2f6";
            ctx.fillRect(0, 0, 300, 300);

            // Малюємо стіни
            ctx.fillStyle = "#2f3542";
            walls.forEach(w => {
                ctx.beginPath();
                ctx.roundRect(w.x, w.y, w.w, w.h, 5);
                ctx.fill();
            });

            // Фініш
            ctx.font = "30px Arial";
            ctx.fillText("🎁", 260, 290);

            // Гравець
            ctx.fillStyle = "#ff6b6b";
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, 7);
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();

            document.getElementById('gameStat').innerText = "Знайди прохід!";
        }, 30);
    },

    extraRound: 0,
    startFindExtra() {
        if(this.extraRound === 0) this.extraRound = 1;
        if(this.extraRound > 10) { 
            alert("Круто! 10 завдань пройдено! +20💰"); 
            this.addCoins(20); this.extraRound = 0; 
            this.showScreen('playMenuScreen'); return; 
        }

        this.showScreen('quizScreen');
        const allKeys = Object.keys(this.data);
        const mainCatKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        const extraCatKey = allKeys.filter(k => k !== mainCatKey)[Math.floor(Math.random() * (allKeys.length - 1))];

        const extraItem = this.data[extraCatKey][Math.floor(Math.random() * this.data[extraCatKey].length)];
        const mainItems = [...this.data[mainCatKey]].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        document.getElementById('quizQuestion').innerText = `Завдання ${this.extraRound}/10: Хто зайвий?`;
        let opts = [extraItem, ...mainItems].sort(() => 0.5 - Math.random());
        const g = document.getElementById('quizOptions'); g.innerHTML = "";
        opts.forEach(o => {
            const img = document.createElement('img'); img.src = "images/" + o.i; img.className = "quiz-img-item";
            img.onclick = () => {
                if(o === extraItem) { this.extraRound++; this.startFindExtra(); }
                else { this.showError(); }
            };
            g.appendChild(img);
        });
    },

    startTanks() {
        this.showScreen('canvasScreen'); const cvs = document.getElementById('gameCanvas'); cvs.style.display = 'block';
        const ctx = cvs.getContext('2d'); cvs.width = 300; cvs.height = 400;
        let playerX = 150, bullets = [], enemies = [], score = 0;
        cvs.onmousedown = (e) => {
            const r = cvs.getBoundingClientRect(); playerX = (e.clientX - r.left) * (300/r.width);
            bullets.push({x: playerX, y: 350});
        };
        this.timer = setInterval(() => {
            ctx.fillStyle = "#1e272e"; ctx.fillRect(0,0,300,400);
            ctx.fillStyle = "#4ecdc4"; ctx.fillRect(playerX-20, 360, 40, 20);
            if(Math.random() < 0.04) enemies.push({x: Math.random()*280, y: -20});
            enemies.forEach((en, ei) => {
                en.y += 3; ctx.font = "24px Arial"; ctx.fillText("👾", en.x, en.y);
                if(en.y > 400) { clearInterval(this.timer); alert("Ой! Вороги прорвалися!"); this.showScreen('playMenuScreen'); }
            });
            bullets.forEach((b, bi) => {
                b.y -= 8; ctx.fillStyle = "yellow"; ctx.fillRect(b.x-2, b.y, 4, 12);
                enemies.forEach((en, ei) => {
                    if(Math.hypot(b.x - en.x, b.y - en.y) < 25) { enemies.splice(ei, 1); bullets.splice(bi, 1); score++; this.addCoins(1); }
                });
            });
            document.getElementById('gameStat').innerText = "Рахунок: " + score;
        }, 30);
    },

    startMath() {
        this.showScreen('canvasScreen'); document.getElementById('mathArea').style.display='block'; this.nextMath();
    },
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

    startSnake() {
        const eatSound = new Audio('images/zvuk.mp3');
        eatSound.preload = 'auto';
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
            else if(snake.length > 15) snake.pop();
            ctx.fillStyle = "white"; ctx.fillRect(0,0,300,300);
            ctx.fillStyle = "red"; ctx.beginPath(); ctx.arc(food.x, food.y, 8, 0, 7); ctx.fill();
            ctx.fillStyle = "#4ecdc4"; snake.forEach((p,i) => { ctx.beginPath(); ctx.arc(p.x, p.y, i===0?10:7, 0, 7); ctx.fill(); });
            document.getElementById('gameStat').innerText = "Очки: " + score;
        }, 30);
    },

startBubbles() {
        const popSoundEffect = new Audio('24e2d7eac96d361.mp3');
        popSoundEffect.preload = 'auto';
        this.showScreen('canvasScreen');
        const cvs = document.getElementById('gameCanvas');
        cvs.style.display = 'block';
        const ctx = cvs.getContext('2d');
        cvs.width = 300;
        cvs.height = 400;

        let score = 0;
        this.bubbles = [];
        let particles = []; // Для ефекту вибуху
        const popSound = new Audio('24e2d7eac96d361.mp3');

        this.timer = setInterval(() => {
            ctx.clearRect(0, 0, 300, 400);

            // Поява нових кульок
            if (Math.random() < 0.06 && this.bubbles.length < 8) {
                this.bubbles.push({
                    x: Math.random() * 260 + 20,
                    y: 450,
                    r: 25 + Math.random() * 10,
                    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    speed: 2 + Math.random() * 3,
                    swing: Math.random() * 2, // погойдування
                    offset: Math.random() * 100
                });
            }

            // Малюємо і рухаємо кульки
            this.bubbles.forEach((b, i) => {
                b.y -= b.speed;
                b.x += Math.sin(b.y / 30 + b.offset) * b.swing; // плавне погойдування

                // Малюємо мотузочку
                ctx.beginPath();
                ctx.moveTo(b.x, b.y + b.r);
                ctx.lineTo(b.x, b.y + b.r + 20);
                ctx.strokeStyle = "#888";
                ctx.stroke();

                // Малюємо саму кульку (градієнт для об'єму)
                let grad = ctx.createRadialGradient(b.x - b.r/3, b.y - b.r/3, b.r/10, b.x, b.y, b.r);
                grad.addColorStop(0, "white");
                grad.addColorStop(0.2, b.color);
                grad.addColorStop(1, "black");

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                if (b.y < -50) this.bubbles.splice(i, 1);
            });

            // Ефект частинок (лопання)
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.05;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, 7);
                ctx.fill();
                if (p.alpha <= 0) particles.splice(i, 1);
            });
            ctx.globalAlpha = 1.0;

            document.getElementById('gameStat').innerText = "Рахунок: " + score;
        }, 30);

        cvs.onmousedown = (e) => {
            const r = cvs.getBoundingClientRect();
            const mx = (e.clientX - r.left) * (300 / r.width);
            const my = (e.clientY - r.top) * (400 / r.height);

            this.bubbles.forEach((b, i) => {
                if (Math.hypot(mx - b.x, my - b.y) < b.r) {
                    // Граємо звук
                    popSound.currentTime = 0;
                    popSound.play().catch(e => console.log("Увімкни взаємодію для звуку"));

                    // Створюємо частинки вибуху
                    for(let j=0; j<10; j++) {
                        particles.push({
                            x: b.x, y: b.y,
                            vx: (Math.random() - 0.5) * 10,
                            vy: (Math.random() - 0.5) * 10,
                            color: b.color,
                            alpha: 1
                        });
                    }

                    this.bubbles.splice(i, 1);
                    score++;
                    this.addCoins(1);
                }
            });
        };
    },


    // --- МАЛЮВАННЯ ТА ГАЛЕРЕЯ ---

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

    saveDrawing() { this.savedDrawings.push(document.getElementById('gameCanvas').toDataURL()); this.save(); alert("Малюнок збережено!"); },
    showGallery() {
        this.showScreen('galleryScreen'); const g = document.getElementById('galleryGrid'); g.innerHTML = "";
        this.savedDrawings.forEach((d, index) => {
            const wrap = document.createElement('div'); wrap.className = 'gallery-item';
            wrap.innerHTML = `<img src="${d}"><button class="del-draw-btn" onclick="app.deleteDrawing(${index})">✕</button>`;
            g.appendChild(wrap);
        });
    },

    startLearn(id) { this.currentCat = id; this.currentIndex = 0; this.showScreen('learnScreen'); this.updateLearn(); },
    updateLearn() {
        const item = this.data[this.currentCat][this.currentIndex];
        document.getElementById('learnContent').innerHTML = `<img src="images/${item.i}" class="learn-img"><h1>${item.n}</h1>`;
    },
    nextCard() { if(this.currentIndex < this.data[this.currentCat].length - 1) { this.currentIndex++; this.updateLearn(); } else { this.startQuiz(); } },
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

    askAction(text, action) {
        const box = document.getElementById('customConfirm'); document.getElementById('confirmText').innerText = text;
        box.style.display = 'flex';
        document.getElementById('confirmYes').onclick = () => { action(); box.style.display = 'none'; };
        document.getElementById('confirmNo').onclick = () => { box.style.display = 'none'; };
    },

    resetProfile() { this.askAction("Видалити профіль та монети?", () => { localStorage.clear(); location.reload(); }); },
    deleteDrawing(index) { this.askAction("Видалити цей малюнок?", () => { this.savedDrawings.splice(index, 1); this.save(); this.showGallery(); }); }
};
app.init();