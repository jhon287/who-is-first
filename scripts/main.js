function shuffle(myArray, randomLevel=1) {
    let shuffledArray = Array.from(myArray);

    for(let i = 0; i < randomLevel; i++) {
        shuffledArray = shuffle_array(shuffledArray);
    }

    return shuffledArray;
}

function shuffle_array(myArray) {
    let shuffledArray = Array.from(myArray);
    let i = shuffledArray.length;

    while (--i > 0) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledArray[j];
        shuffledArray[j] = shuffledArray[i];
        shuffledArray[i] = temp;
    }

    return shuffledArray;
}

function get_children() {
    let children = [];
    
    document.getElementsByName("item").forEach(element => {
        if(element !== null && element.value !== "") {
            children.push(element.value);
        }
    });

    return children;
}

function set_result() {
    let children_shuffled = [];
    let random_level = Math.max(1, Number.parseInt(document.getElementById("random_level").value, 10) || 1);

    if (children.length === 0) {
        children = get_children();
    }

    if (children.length < 2) { 
        return;
    }

    const maxAttempts = 50;
    let attempts = 0;

    do {
        children_shuffled = shuffle(children, random_level);
        attempts++;
    } while (attempts < maxAttempts && children_shuffled.every((v, idx) => v === children[idx]));

    let items = document.getElementById("items");
    
    items.innerHTML = "";

    let items_ul = document.createElement("ul");
    items_ul.classList.add("child-name");
    items.appendChild(items_ul);
    

    for(let i = 0; i < children_shuffled.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${i + 1}. ${children_shuffled[i]}`;

        if(i === 0) {
            li.classList.add("first-place");
        } else if(i === 1) {
            li.classList.add("second-place");
        } else if(i === 2) {
            li.classList.add("third-place");
        }

        items_ul.appendChild(li);
    }
}

function add_input_text_item(items_container, name="item") {
    let li = document.createElement("li");
    let input = document.createElement("input");

    input.name = name;
    input.type = "text";
    input.classList.add("child-name");

    li.appendChild(input);

    items_container.appendChild(li);
}

function generate_items() {
    let number_items = Math.max(2, Number.parseInt(document.getElementById("number_items").value, 10) || 2);
    let items = document.getElementById("items");
    let items_list = document.createElement("ul");
    
    items.innerHTML = "";

    for(let i = 0; i < number_items; i++) {
        add_input_text_item(items_list, "item");
    }

    items.appendChild(items_list);
}

function keydown_handler(event) {
    if (event.key === "Enter") {
        set_result();
    }
}

function main() {
    const el = window;
    el.addEventListener("keydown", keydown_handler);
    generate_items();
}

function reset() {
    generate_items();
    children = [];
}

let children = [];
main();
