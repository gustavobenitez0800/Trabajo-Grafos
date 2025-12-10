// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add interactive node animations
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.2)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
        });
    });

    // Parallax effect for gradient orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.gradient-orb');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Initialize Cytoscape.js Interactive Graph
    const cy = cytoscape({
        container: document.getElementById('cy'),
        
        elements: [
            // Nodes (personas en la red social)
            { data: { id: 'Ana', label: 'Ana' } },
            { data: { id: 'Bruno', label: 'Bruno' } },
            { data: { id: 'Carlos', label: 'Carlos' } },
            { data: { id: 'Diana', label: 'Diana' } },
            { data: { id: 'Elena', label: 'Elena' } },
            { data: { id: 'Franco', label: 'Franco' } },
            { data: { id: 'Gina', label: 'Gina' } },
            
            // Edges (amistades)
            { data: { source: 'Ana', target: 'Bruno' } },
            { data: { source: 'Ana', target: 'Carlos' } },
            { data: { source: 'Bruno', target: 'Diana' } },
            { data: { source: 'Carlos', target: 'Diana' } },
            { data: { source: 'Carlos', target: 'Elena' } },
            { data: { source: 'Diana', target: 'Franco' } },
            { data: { source: 'Elena', target: 'Franco' } },
            { data: { source: 'Elena', target: 'Gina' } },
            { data: { source: 'Franco', target: 'Gina' } }
        ],
        
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#6366f1',
                    'label': 'data(label)',
                    'color': '#fff',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'font-size': '14px',
                    'font-weight': 'bold',
                    'width': '60px',
                    'height': '60px',
                    'border-width': '3px',
                    'border-color': '#8b5cf6',
                    'text-outline-width': '2px',
                    'text-outline-color': '#1e293b'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#8b5cf6',
                    'target-arrow-color': '#8b5cf6',
                    'curve-style': 'bezier',
                    'opacity': 0.6
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'background-color': '#ec4899',
                    'border-color': '#f472b6',
                    'border-width': '4px'
                }
            }
        ],
        
        layout: {
            name: 'cose',
            animate: true,
            animationDuration: 1000,
            nodeRepulsion: 8000,
            idealEdgeLength: 100,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            randomize: false
        }
    });

    // Add interactivity
    cy.on('tap', 'node', function(evt){
        const node = evt.target;
        console.log('Nodo seleccionado:', node.data('label'));
    });
});
