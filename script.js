const gameData = {
    "1": {
        "text": "It's a sunny Saturday morning, and you and your friends are planning a fun day out. Where do you decide to start your adventure?",
        "image": "smaller_images/sunny_morning.png",
        "choices": {
            "Go to a cozy café": [2, ["Neuron", "Astrocyte"]],
            "Head to the art exhibit at the de Young Museum": [3, ["Microglia", "Oligodendrocyte"]],
            "Go for a hike in the mountains": [4, ["Neuron", "Microglia"]],
            "Visit the amusement park for thrills": [5, ["Astrocyte", "Oligodendrocyte"]]
        }
    },
    "2": {
        "text": "At the café, you find a mysterious book titled 'The Secrets of the Universe'. What do you do?",
        "image": "smaller_images/cafe_book.png",
        "choices": {
            "Read it immediately": [6, ["Neuron"]],
            "Share it with your friends for a group reading": [6, ["Astrocyte"]],
            "Keep it for later and enjoy the moment": [6, ["Oligodendrocyte"]],
            "Investigate the book's origins": [6, ["Microglia"]]
        }
    },
    "3": {
        "text": "At the de Young Museum, a painting suddenly comes to life! How do you react?",
        "image": "smaller_images/museum_painting.png",
        "choices": {
            "Jump into the painting for an adventure": [7, ["Neuron"]],
            "Discuss the painting's history with your friends": [7, ["Astrocyte"]],
            "Analyze the painting's technique": [7, ["Oligodendrocyte"]],
            "Protect others from any possible danger": [7, ["Microglia"]]
        }
    },
    "4": {
        "text": "While hiking in the mountains, you discover a hidden cave. What do you do next?",
        "image": "smaller_images/mountain_cave.png",
        "choices": {
            "Explore the cave immediately": [8, ["Neuron"]],
            "Set up a safe camp before entering": [8, ["Astrocyte"]],
            "Examine the cave entrance for clues": [8, ["Oligodendrocyte"]],
            "Guard the entrance while others explore": [8, ["Microglia"]]
        }
    },
    "5": {
        "text": "At the amusement park, you find a secret ride that promises the 'Adventure of a Lifetime'. Do you...",
        "image": "smaller_images/amusement_park.png",
        "choices": {
            "Ride it immediately for the thrill": [9, ["Neuron"]],
            "Invite everyone to ride together": [9, ["Astrocyte"]],
            "Inspect the ride for safety": [9, ["Oligodendrocyte"]],
            "Stand guard while friends go first": [9, ["Microglia"]]
        }
    },
    "6": {
        "text": "The book reveals a hidden map that leads to an ancient treasure. Do you...",
        "image": "smaller_images/hidden_map.png",
        "choices": {
            "Follow the map to find the treasure": [10, ["Neuron"]],
            "Share the map with everyone and plan a group trip": [10, ["Astrocyte"]],
            "Study the map for hidden messages": [10, ["Oligodendrocyte"]],
            "Ensure the map is authentic and safe": [10, ["Microglia"]]
        }
    },
    "7": {
        "text": "Inside the painting, you find a magical world. What is your first move?",
        "image": "smaller_images/magical_world.png",
        "choices": {
            "Explore the landscape for hidden secrets": [10, ["Neuron"]],
            "Gather everyone to enjoy the scenery": [10, ["Astrocyte"]],
            "Analyze the magical properties": [10, ["Oligodendrocyte"]],
            "Guard the entrance to ensure safety": [10, ["Microglia"]]
        }
    },
    "8": {
        "text": "The cave contains ancient artifacts. What do you do?",
        "image": "smaller_images/ancient_artifacts.png",
        "choices": {
            "Examine the artifacts for clues": [10, ["Neuron"]],
            "Share findings with your friends": [10, ["Astrocyte"]],
            "Document the discovery meticulously": [10, ["Oligodendrocyte"]],
            "Protect the site from disturbance": [10, ["Microglia"]]
        }
    },
    "9": {
        "text": "The secret ride takes you to a futuristic city. What's your first stop?",
        "image": "smaller_images/futuristic_city.png",
        "choices": {
            "Explore the city for new technology": [10, ["Neuron"]],
            "Find a spot to relax and enjoy with friends": [10, ["Astrocyte"]],
            "Study the city's architecture": [10, ["Oligodendrocyte"]],
            "Ensure everyone's safety during exploration": [10, ["Microglia"]]
        }
    },
    "10": {
        "text": "After a day full of adventures, you reflect on your experiences. What's your takeaway?",
        "image": "smaller_images/reflection.png",
        "choices": {
            "Seek more adventures and challenges": [0, ["Neuron"]],
            "Value the friendships and memories made": [0, ["Astrocyte"]],
            "Cherish the knowledge and insights gained": [0, ["Oligodendrocyte"]],
            "Be thankful for safety and protection": [0, ["Microglia"]]
        }
    }
};

const personalities = {
    "Neuron": 0,
    "Astrocyte": 0,
    "Microglia": 0,
    "Oligodendrocyte": 0
};

let currentState = 1;

function renderState(state) {
    const storyText = document.getElementById('story-text');
    const storyImage = document.getElementById('story-image');
    const choicesContainer = document.getElementById('choices');

    const img = new Image();
    img.src = gameData[state].image;

    img.onload = () => {
        storyImage.src = img.src;
        storyText.textContent = gameData[state].text;
        choicesContainer.innerHTML = '';

        for (const [choice, info] of Object.entries(gameData[state].choices)) {
            const button = document.createElement('button');
            button.textContent = choice;
            button.className = 'choice-button';
            let nextState = info[0];
            button.onclick = () => changeState(nextState, info[1]);
            choicesContainer.appendChild(button);
        }
    };
}

function changeState(newState, selectedPersonalities) {
    selectedPersonalities.forEach(personality => {
        personalities[personality]++;
    });

    currentState = newState;

    if (currentState === 0) {
        revealMostSelectedBrainCell();
    } else {
        renderState(currentState);
    }
}

function revealMostSelectedBrainCell() {
    let maxCount = 0;
    let maxCell = '';

    for (const [cell, count] of Object.entries(personalities)) {
        if (count > maxCount) {
            maxCount = count;
            maxCell = cell;
        }
    }

    const storyImage = document.getElementById('story-image');
    const text = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const cellImagePath = `smaller_images/id_cards/${maxCell}.png`;

    // Preload the image
    const img = new Image();
    img.src = cellImagePath;
    img.className = 'responsive-image';

    // Create the share button
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share the game with Friends';
    shareButton.className = 'choice-button';

    // Once the image is loaded, update the DOM
    img.onload = () => {
        storyImage.style.display = 'none';
        choicesContainer.style.display = 'none';

        text.textContent = "Drumroll... here is your Brain Cell ID! Don't lose it! (Right click or hold the image to save)";
        text.appendChild(img);

        // Share button functionality
        shareButton.onclick = () => {
            const shareMessage = `Check out my Brain Cell ID! You can create yours at [insert game link here]`;
            navigator.clipboard.writeText(shareMessage).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy link. Please try again.');
            });
        };

        text.appendChild(shareButton);
    };
}

function startGame() {
    document.querySelector('.title').style.display = 'none';
    document.getElementById('homescreen').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    renderState(currentState);
}

window.onload = () => {
    renderState(currentState);
}
