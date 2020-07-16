const {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    MouseConstraint,
    Mouse
} = Matter; //destrukturyzacja z Matter.js
const width = 800;
const height = 600;
const engine = Engine.create(); //stworzenie nowego engine
const { world } = engine; //wyciągnięcie właściwości world z obiektu engine
const render = Render.create({
    //tworzymy nowy render i mówimy mu żeby sie renderował w body
    element: document.body, //where to show
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render); //odpal render który stworzyliśmy wcześniej
Runner.run(Runner.create(), engine); //runner koordynuje render z enginem

World.add(
    world,
    MouseConstraint.create(engine, {
        /*dodaje do mojej zmiennej world, obiekt
                   MouseConstraint, ktory wykorzystuje engine, a w opcjach tworzy nową mysz, ktora sie renderuje*/
        mouse: Mouse.create(render.canvas)
    })
);

//Walls

const walls = [
    Bodies.rectangle(400, 0, 800, 20, { isStatic: true }),
    Bodies.rectangle(800, 300, 20, 600, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 20, { isStatic: true }),
    Bodies.rectangle(0, 300, 20, 600, { isStatic: true })
];

World.add(world, walls); //dodanie do stworzonego "swiata" naszego shape'a, lub array shapeów

//Random shapes
for (let i = 0; i < 10; i++) {
    let randomX = Math.floor(Math.random() * width) + 1;
    let randomY = Math.floor(Math.random() * height) + 1;

    if (Math.random() > 0.5) {
        World.add(world, Bodies.rectangle(randomX, randomY, 40, 40));
    } else {
        World.add(
            world,
            Bodies.circle(randomX, randomY, 4, 0, {
                render: {
                    fillStyle: "lightblue"
                }
            })
        );
    }
}