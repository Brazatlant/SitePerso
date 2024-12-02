    // Configuration de Particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
    
    // Fonction pour relier les particules les plus proches au pointeur de souris
    const particles = [];
    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        // Mettre à jour les particules proches du pointeur
        const closeParticles = particles.filter(p => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            return Math.sqrt(dx * dx + dy * dy) < 100; // Rayon de 100 pixels
        });
    
        // Dessiner les lignes entre les particules proches
        closeParticles.forEach(p => {
            const line = document.createElement("div");
            line.style.position = "absolute";
            line.style.width = "1px";
            line.style.height = "1px";
            line.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            line.style.transformOrigin = "0 0";
            const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
            const length = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
            line.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${angle}rad)`;
            line.style.width = `${length}px`;
            document.body.appendChild(line);
        });
    });
    
    // Ajouter des particules à la liste
    document.querySelectorAll(".particles").forEach(p => {
        particles.push({
            x: p.offsetLeft + p.offsetWidth / 2,
            y: p.offsetTop + p.offsetHeight / 2
        });
    });